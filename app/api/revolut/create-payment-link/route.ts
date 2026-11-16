import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

type BillingRow = {
  billing_reference: string;
  amount: number;
  currency: string;
  description: string;
  status: "creating" | "ready" | "needs_review";
  order_id: string | null;
  payment_url: string | null;
};

function authorized(request: NextRequest): boolean {
  const secret = process.env.SHORTCUTS_PAYMENT_API_SECRET;
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!secret || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

function reviewResponse() {
  return NextResponse.json(
    { error: "This billing reference is reserved but its Revolut result is not confirmed. Check Revolut and reconcile the order before retrying; no new order was created." },
    { status: 409 },
  );
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let input: unknown;
  try { input = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return NextResponse.json({ error: "Expected a JSON object" }, { status: 400 });
  }

  const body = input as Record<string, unknown>;
  const { amount, description, billing_reference: reference } = body;
  const currency = body.currency ?? "EUR";

  if (!Number.isSafeInteger(amount) || (amount as number) < 1 || (amount as number) > 1_000_000) {
    return NextResponse.json({ error: "amount must be an integer from 1 to 1000000 cents" }, { status: 400 });
  }
  if (currency !== "EUR") return NextResponse.json({ error: "Only EUR is supported" }, { status: 400 });
  if (typeof description !== "string" || description.trim().length < 5 || description.length > 255) {
    return NextResponse.json({ error: "description must contain 5–255 characters" }, { status: 400 });
  }
  if (typeof reference !== "string" || reference.trim().length < 8 || reference.length > 255) {
    return NextResponse.json({ error: "billing_reference must contain 8–255 characters" }, { status: 400 });
  }

  const normalizedReference = reference.trim();
  const normalizedDescription = description.trim();
  const apiKey = process.env.REVOLUT_MERCHANT_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Revolut Merchant API is not configured" }, { status: 503 });
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Billing database is not configured" }, { status: 503 });
  }

  // Unique primary key is the atomic concurrency gate: exactly one caller reserves
  // a billing reference before any external Revolut request is attempted.
  const { error: reservationError } = await supabaseAdmin.from("shortcut_payment_orders").insert({
    billing_reference: normalizedReference,
    amount,
    currency,
    description: normalizedDescription,
    status: "creating",
  });

  if (reservationError) {
    if (reservationError.code !== "23505") {
      console.error("Billing reservation failed", reservationError.code);
      return NextResponse.json({ error: "Unable to reserve billing reference; check Supabase migration" }, { status: 503 });
    }

    const { data, error } = await supabaseAdmin
      .from("shortcut_payment_orders")
      .select("billing_reference,amount,currency,description,status,order_id,payment_url")
      .eq("billing_reference", normalizedReference)
      .maybeSingle();
    if (error || !data) return NextResponse.json({ error: "Unable to read existing billing reference" }, { status: 503 });

    const existing = data as BillingRow;
    if (existing.amount !== amount || existing.currency !== currency || existing.description !== normalizedDescription) {
      return NextResponse.json({ error: "Billing reference already exists with different payment details" }, { status: 409 });
    }
    if (existing.status === "ready" && existing.payment_url && existing.order_id) {
      return NextResponse.json({
        order_id: existing.order_id,
        payment_url: existing.payment_url,
        amount: existing.amount,
        currency: existing.currency,
        description: existing.description,
        billing_reference: normalizedReference,
        duplicate: true,
        status: "pending",
      });
    }
    return reviewResponse();
  }

  // A failed or timed-out external request is NOT automatically retried:
  // Revolut might have created the order even if the response was lost.
  const markReview = async (orderId?: string) => {
    const { error } = await supabaseAdmin.from("shortcut_payment_orders")
      .update({ status: "needs_review", ...(orderId ? { order_id: orderId } : {}) })
      .eq("billing_reference", normalizedReference)
      .eq("status", "creating");
    if (error) console.error("Unable to mark billing reference for review", error.code);
  };

  try {
    const base = process.env.REVOLUT_MERCHANT_BASE_URL?.trim() || "https://merchant.revolut.com";
    const version = process.env.REVOLUT_MERCHANT_API_VERSION?.trim() || "2024-09-01";
    const response = await fetch(new URL("/api/orders", base), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Revolut-Api-Version": version,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ amount, currency, description: normalizedDescription }),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    const result = (await response.json().catch(() => ({}))) as {
      id?: string;
      checkout_url?: string;
      state?: string;
    };

    if (!response.ok || !result.id || !result.checkout_url) {
      await markReview(result.id);
      return NextResponse.json({
        error: "Revolut order result could not be confirmed; check Revolut before retrying",
        order_id: result.id ?? null,
      }, { status: 502 });
    }

    const { error: saveError } = await supabaseAdmin.from("shortcut_payment_orders")
      .update({ status: "ready", order_id: result.id, payment_url: result.checkout_url })
      .eq("billing_reference", normalizedReference)
      .eq("status", "creating");
    if (saveError) {
      console.error("Failed to persist Revolut order", saveError.code);
      await markReview(result.id);
      return NextResponse.json({
        error: "Revolut order created but could not be saved; check Revolut and database before retrying",
        order_id: result.id,
      }, { status: 503 });
    }

    return NextResponse.json({
      order_id: result.id,
      payment_url: result.checkout_url,
      amount,
      currency,
      description: normalizedDescription,
      billing_reference: normalizedReference,
      duplicate: false,
      status: result.state ?? "pending",
    });
  } catch {
    await markReview();
    return NextResponse.json({ error: "Revolut request outcome is uncertain; check Revolut before retrying" }, { status: 502 });
  }
}

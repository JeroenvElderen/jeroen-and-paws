import { NextResponse } from "next/server";

import { getRevolutWebhookOrderId, getRevolutWebhookReference, type RevolutWebhookPayload, verifyRevolutWebhookSignature } from "@/utils/revolut/webhook";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

type InvoiceWebhookMatchRow = {
  id: string;
  status: string | null;
  invoice_number: string;
  payment_reference: string | null;
};

const payableStatuses = ["sent", "pending", "overdue"];

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getEventName(payload: RevolutWebhookPayload) {
  return cleanString(payload.event || payload.type);
}

async function findInvoice(payload: RevolutWebhookPayload) {
  const orderId = getRevolutWebhookOrderId(payload);

  if (orderId) {
    const { data, error } = await supabaseAdmin
      .from("portal_invoices")
      .select("id,status,invoice_number,payment_reference")
      .eq("revolut_order_id", orderId)
      .maybeSingle();

    if (error) throw error;
    if (data) return { invoice: data as InvoiceWebhookMatchRow, matchType: "revolut_order_id" };
  }

  const reference = getRevolutWebhookReference(payload);
  if (!reference) return { invoice: null, matchType: null };

  const { data: invoiceData, error: invoiceError } = await supabaseAdmin
    .from("portal_invoices")
    .select("id,status,invoice_number,payment_reference")
    .eq("invoice_number", reference)
    .limit(1)
    .maybeSingle();

  if (invoiceError) throw invoiceError;
  if (invoiceData) return { invoice: invoiceData as InvoiceWebhookMatchRow, matchType: "reference" };

  const { data: referenceData, error: referenceError } = await supabaseAdmin
    .from("portal_invoices")
    .select("id,status,invoice_number,payment_reference")
    .eq("payment_reference", reference)
    .limit(1)
    .maybeSingle();

  if (referenceError) throw referenceError;

  return { invoice: (referenceData as InvoiceWebhookMatchRow | null) ?? null, matchType: referenceData ? "reference" : null };
}

export async function POST(request: Request) {
  const signingSecret = process.env.REVOLUT_WEBHOOK_SIGNING_SECRET?.trim();
  if (!signingSecret) return NextResponse.json({ error: "Revolut webhook signing secret is not configured." }, { status: 500 });

  const rawBody = await request.text();
  const isVerified = verifyRevolutWebhookSignature({
    rawBody,
    timestamp: request.headers.get("revolut-request-timestamp"),
    signatureHeader: request.headers.get("revolut-signature"),
    signingSecret,
  });

  if (!isVerified) return NextResponse.json({ error: "Invalid Revolut webhook signature." }, { status: 401 });

  const payload = (await Promise.resolve()
    .then(() => JSON.parse(rawBody || "null"))
    .catch(() => null)) as RevolutWebhookPayload | null;
  if (!payload || typeof payload !== "object") return NextResponse.json({ error: "Invalid Revolut webhook payload." }, { status: 400 });

  const event = getEventName(payload);
  if (event !== "ORDER_COMPLETED") return NextResponse.json({ received: true, ignored: true, event });

  try {
    const { invoice, matchType } = await findInvoice(payload);
    if (!invoice) return NextResponse.json({ received: true, matched: false, event });
    if (!payableStatuses.includes(invoice.status || "")) {
      return NextResponse.json({ received: true, matched: true, duplicate: invoice.status === "paid", invoiceId: invoice.id, event });
    }

    const paidOn = cleanString(payload.created_at) || cleanString(payload.updated_at) || new Date().toISOString();
    const transactionId = cleanString(payload.order_id) || getRevolutWebhookOrderId(payload) || null;
    const { error } = await supabaseAdmin
      .from("portal_invoices")
      .update({ status: "paid", paid_on: paidOn, revolut_transaction_id: transactionId, updated_at: new Date().toISOString() })
      .eq("id", invoice.id)
      .in("status", payableStatuses);

    if (error) throw error;

    return NextResponse.json({ received: true, matched: true, updated: true, invoiceId: invoice.id, matchType, event });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to process Revolut webhook.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

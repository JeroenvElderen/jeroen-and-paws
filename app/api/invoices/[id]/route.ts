import { NextResponse } from "next/server";

import { buildInvoicePaymentTitle } from "@/utils/invoice-payment";
import { createRevolutMerchantOrder } from "@/utils/revolut/merchant";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";
type SupabaseAuthUser = { email?: string; user?: { email?: string } };
type InvoiceStatus = "draft" | "sent" | "pending" | "paid" | "overdue" | "refunded";
type InvoiceLineItem = { description: string; quantity: number; unitAmountCents: number };
type InvoiceRow = {
  id: string; portal_client_id: string | null; invoice_number: string; client_name: string | null; client_email: string | null; client_address: string | null; dog_names: string[] | null; issued_on: string | null; due_on: string | null; service_period_start: string | null; service_period_end: string | null; line_items: InvoiceLineItem[] | null; amount_cents: number | null; currency: string | null; status: InvoiceStatus | null; paid_on: string | null; revolut_transaction_id: string | null; payment_reference: string | null; payment_title: string | null; payment_url: string | null; revolut_order_id: string | null; client_phone: string | null; service_name: string | null; duration_minutes: number | null; billing_days: number | null; notes: string | null;
};

function mapInvoice(row: InvoiceRow) {
  return { id: row.id, portalClientId: row.portal_client_id, number: row.invoice_number, client: row.client_name || "Unmatched client", email: row.client_email || "", address: row.client_address || "", dogs: row.dog_names?.join(", ") || "—", issuedOn: row.issued_on, dueOn: row.due_on, servicePeriodStart: row.service_period_start, servicePeriodEnd: row.service_period_end, lineItems: row.line_items ?? [], amountCents: row.amount_cents ?? 0, currency: row.currency || "EUR", status: row.status || "pending", paidOn: row.paid_on, revolutTransactionId: row.revolut_transaction_id, paymentReference: row.payment_reference, paymentTitle: row.payment_title, paymentUrl: row.payment_url, revolutOrderId: row.revolut_order_id, phone: row.client_phone || "", serviceName: row.service_name || "", durationMinutes: row.duration_minutes, billingDays: row.billing_days, notes: row.notes, isClientLinked: Boolean(row.portal_client_id) };
}
function cleanString(value: unknown) { return typeof value === "string" ? value.trim() : ""; }
function sanitizeLineItems(value: unknown): InvoiceLineItem[] { if (!Array.isArray(value)) return []; return value.flatMap((item) => { if (!item || typeof item !== "object") return []; const candidate = item as Record<string, unknown>; const description = cleanString(candidate.description); const quantity = Number(candidate.quantity ?? 1); const unitAmountCents = Number(candidate.unitAmountCents ?? candidate.unit_amount_cents ?? 0); if (!description || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitAmountCents) || unitAmountCents < 0) return []; return [{ description, quantity, unitAmountCents: Math.round(unitAmountCents) }]; }); }
function getInvoiceTotalCents(lineItems: InvoiceLineItem[], fallbackAmount: unknown) { const calculatedTotal = lineItems.reduce((sum, item) => sum + Math.round(item.quantity * item.unitAmountCents), 0); const fallback = Number(fallbackAmount ?? 0); return calculatedTotal || (Number.isFinite(fallback) ? Math.round(fallback) : 0); }
function getSafeDate(value: unknown) { const date = cleanString(value); return date || null; }
function getErrorMessage(error: unknown, fallback: string) { if (error instanceof Error && error.message) return error.message; if (error && typeof error === "object") { const candidate = error as { message?: unknown; details?: unknown; hint?: unknown; code?: unknown }; const parts = [candidate.message, candidate.details, candidate.hint, candidate.code].filter((value): value is string | number => typeof value === "string" || typeof value === "number").map(String).filter(Boolean); if (parts.length) return parts.join(" "); } return fallback; }
async function getVerifiedBackendAdminToken(request: Request) { const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, ""); const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, ""); const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; if (!accessToken || !supabaseUrl || !anonKey) return null; const response = await fetch(`${supabaseUrl}/auth/v1/user`, { cache: "no-store", headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` } }); if (!response.ok) return null; const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null; const email = payload?.email ?? payload?.user?.email; return email?.toLowerCase() === backendAdminEmail ? accessToken : null; }
async function loadInvoice(id: string) { const { data, error } = await supabaseAdmin.from("portal_invoices").select("*").eq("id", id).single(); if (error) throw error; return data as InvoiceRow; }

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);
  if (!adminAccessToken && !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ error: "Send invoice updates as JSON." }, { status: 400 });

  try {
    const existing = await loadInvoice(id);
    if (payload.action === "send") {
      const paymentTitle = existing.payment_title || buildInvoicePaymentTitle({ dogNames: existing.dog_names ?? [], serviceName: existing.service_name || "Service", durationMinutes: existing.duration_minutes, billingDays: existing.billing_days });
      const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/portal?invoice=${encodeURIComponent(existing.invoice_number)}` : null;
      const revolutOrder = await createRevolutMerchantOrder({ amountCents: existing.amount_cents ?? 0, currency: existing.currency || "EUR", description: paymentTitle, reference: existing.payment_reference || existing.invoice_number, customerEmail: existing.client_email, redirectUrl });
      const { data, error } = await supabaseAdmin.from("portal_invoices").update({ status: "sent", payment_title: paymentTitle, payment_url: revolutOrder.checkoutUrl, revolut_order_id: revolutOrder.orderId }).eq("id", id).select("*").single();
      if (error) throw error;
      return NextResponse.json({ invoice: mapInvoice(data as InvoiceRow), revolut: { status: "checkout_created", createsRevolutCheckout: true, orderId: revolutOrder.orderId, checkoutUrl: revolutOrder.checkoutUrl } });
    }

    const lineItems = sanitizeLineItems(payload.lineItems);
    const dogNames = Array.isArray(payload.dogNames) ? payload.dogNames.map(cleanString).filter(Boolean) : cleanString(payload.dogNames).split(",").map((name) => name.trim()).filter(Boolean);
    const serviceName = cleanString(payload.serviceName);
    const durationMinutes = Number(payload.durationMinutes || 0) || null;
    const billingDays = Number(payload.billingDays || 0) || null;
    const updates = { client_name: cleanString(payload.clientName), client_email: cleanString(payload.clientEmail).toLowerCase(), client_phone: cleanString(payload.clientPhone), client_address: cleanString(payload.clientAddress), dog_names: dogNames, issued_on: getSafeDate(payload.issuedOn), due_on: getSafeDate(payload.dueOn), line_items: lineItems, amount_cents: getInvoiceTotalCents(lineItems, payload.amountCents), currency: (cleanString(payload.currency) || "EUR").toUpperCase(), status: (cleanString(payload.status) || existing.status || "draft") as InvoiceStatus, payment_title: cleanString(payload.paymentTitle) || buildInvoicePaymentTitle({ dogNames, serviceName, durationMinutes, billingDays }), service_name: serviceName || null, duration_minutes: durationMinutes, billing_days: billingDays, notes: cleanString(payload.notes) || null };
    const { data, error } = await supabaseAdmin.from("portal_invoices").update(updates).eq("id", id).select("*").single();
    if (error) throw error;
    return NextResponse.json({ invoice: mapInvoice(data as InvoiceRow) });
  } catch (error) {
    console.error("Invoice update failed", { route: "/api/invoices/[id]", id, error });
    return NextResponse.json({ error: getErrorMessage(error, "Unable to update invoice.") }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);
  if (!adminAccessToken && !process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { error } = await supabaseAdmin.from("portal_invoices").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ ok: true });
}

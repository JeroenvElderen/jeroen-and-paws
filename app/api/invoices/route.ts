import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

type SupabaseAuthUser = {
  email?: string;
  user?: { email?: string };
};

type InvoiceStatus = "draft" | "sent" | "pending" | "paid" | "overdue" | "refunded";

type InvoiceRow = {
  id: string;
  portal_client_id: string | null;
  invoice_number: string;
  client_name: string | null;
  client_email: string | null;
  client_address: string | null;
  dog_names: string[] | null;
  issued_on: string | null;
  due_on: string | null;
  service_period_start: string | null;
  service_period_end: string | null;
  line_items: InvoiceLineItem[] | null;
  amount_cents: number | null;
  currency: string | null;
  status: InvoiceStatus | null;
  paid_on: string | null;
  revolut_transaction_id: string | null;
  payment_reference: string | null;
  notes: string | null;
};

type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitAmountCents: number;
};

type ClientMatchRow = {
  id: string;
  full_name: string | null;
  email: string | null;
};

function mapInvoice(row: InvoiceRow) {
  return {
    id: row.id,
    portalClientId: row.portal_client_id,
    number: row.invoice_number,
    client: row.client_name || "Unmatched client",
    email: row.client_email || "",
    address: row.client_address || "",
    dogs: row.dog_names?.join(", ") || "—",
    issuedOn: row.issued_on,
    dueOn: row.due_on,
    servicePeriodStart: row.service_period_start,
    servicePeriodEnd: row.service_period_end,
    lineItems: row.line_items ?? [],
    amountCents: row.amount_cents ?? 0,
    currency: row.currency || "EUR",
    status: row.status || "pending",
    paidOn: row.paid_on,
    revolutTransactionId: row.revolut_transaction_id,
    paymentReference: row.payment_reference,
    notes: row.notes,
    isClientLinked: Boolean(row.portal_client_id),
  };
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeLineItems(value: unknown): InvoiceLineItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const candidate = item as Record<string, unknown>;
    const description = cleanString(candidate.description);
    const quantity = Number(candidate.quantity ?? 1);
    const unitAmountCents = Number(candidate.unitAmountCents ?? candidate.unit_amount_cents ?? 0);

    if (!description || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(unitAmountCents) || unitAmountCents < 0) return [];

    return [{ description, quantity, unitAmountCents: Math.round(unitAmountCents) }];
  });
}

function getInvoiceTotalCents(lineItems: InvoiceLineItem[], fallbackAmount: unknown) {
  const calculatedTotal = lineItems.reduce((sum, item) => sum + Math.round(item.quantity * item.unitAmountCents), 0);
  const fallback = Number(fallbackAmount ?? 0);

  return calculatedTotal || (Number.isFinite(fallback) ? Math.round(fallback) : 0);
}

function getSafeDate(value: unknown) {
  const date = cleanString(value);
  return date || null;
}

function createInvoiceNumber() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const stamp = `${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(2, "0")}${String(now.getUTCSeconds()).padStart(2, "0")}`;

  return `INV-${year}-${stamp}`;
}

async function getVerifiedBackendAdminToken(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!accessToken || !supabaseUrl || !anonKey) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    cache: "no-store",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return null;

  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  const email = payload?.email ?? payload?.user?.email;

  return email?.toLowerCase() === backendAdminEmail ? accessToken : null;
}

async function findMatchingClient(clientEmail: string, clientName: string) {
  if (!clientEmail && !clientName) return null;

  let query = supabaseAdmin
    .from("portal_clients")
    .select("id,full_name,email")
    .limit(1);

  if (clientEmail) {
    query = query.ilike("email", clientEmail);
  } else {
    query = query.ilike("full_name", clientName);
  }

  const { data, error } = await query;
  if (error) throw error;

  return ((data ?? []) as ClientMatchRow[])[0] ?? null;
}

export async function GET(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);

  if (!adminAccessToken && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: rows, error } = await supabaseAdmin
      .from("portal_invoices")
      .select("*")
      .order("issued_on", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ invoices: ((rows ?? []) as InvoiceRow[]).map(mapInvoice), isFallback: false });
  } catch (error) {
    console.error("Invoice data fallback", { route: "/api/invoices", error });
    const message = error instanceof Error ? error.message : "Unable to load invoices from Supabase.";
    return NextResponse.json(
      {
        invoices: [],
        isFallback: true,
        error: "Unable to load invoices from Supabase.",
        details: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 502 },
    );
  }
}

export async function POST(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);

  if (!adminAccessToken && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!payload) return NextResponse.json({ error: "Send invoice data as JSON." }, { status: 400 });

    const clientName = cleanString(payload.clientName);
    const clientEmail = cleanString(payload.clientEmail).toLowerCase();
    const clientAddress = cleanString(payload.clientAddress);
    const dogNames = Array.isArray(payload.dogNames) ? payload.dogNames.map(cleanString).filter(Boolean) : cleanString(payload.dogNames).split(",").map((name) => name.trim()).filter(Boolean);
    const lineItems = sanitizeLineItems(payload.lineItems);
    const amountCents = getInvoiceTotalCents(lineItems, payload.amountCents);
    const currency = (cleanString(payload.currency) || "EUR").toUpperCase();
    const invoiceNumber = cleanString(payload.invoiceNumber) || createInvoiceNumber();
    const status = (cleanString(payload.status) || "pending") as InvoiceStatus;

    if (!clientName && !clientEmail) return NextResponse.json({ error: "Add at least a client name or email so the invoice can be matched later." }, { status: 400 });
    if (amountCents <= 0) return NextResponse.json({ error: "Invoice amount must be greater than zero." }, { status: 400 });
    if (!currency.match(/^[A-Z]{3}$/)) return NextResponse.json({ error: "Currency must be a 3-letter ISO code." }, { status: 400 });

    const matchedClient = await findMatchingClient(clientEmail, clientName);
    const paymentReference = cleanString(payload.paymentReference) || invoiceNumber;
    const { data: row, error } = await supabaseAdmin
      .from("portal_invoices")
      .insert({
        portal_client_id: matchedClient?.id ?? null,
        invoice_number: invoiceNumber,
        client_name: clientName || matchedClient?.full_name || null,
        client_email: clientEmail || matchedClient?.email || null,
        client_address: clientAddress || null,
        dog_names: dogNames,
        issued_on: getSafeDate(payload.issuedOn) ?? new Date().toISOString().slice(0, 10),
        due_on: getSafeDate(payload.dueOn),
        service_period_start: getSafeDate(payload.servicePeriodStart),
        service_period_end: getSafeDate(payload.servicePeriodEnd),
        line_items: lineItems,
        amount_cents: amountCents,
        currency,
        status,
        payment_reference: paymentReference,
        notes: cleanString(payload.notes) || null,
      })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({
      invoice: mapInvoice(row as InvoiceRow),
      clientMatched: Boolean(matchedClient),
      revolut: {
        status: "website_only_ready_for_reconciliation",
        createsRevolutInvoice: false,
        message: "Revolut Business does not expose an invoice-creation endpoint in the Business API used here. This invoice is saved on the website with a Revolut payment reference; use Sync Revolut after payment to match incoming transactions.",
      },
    }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create invoice.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
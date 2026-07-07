import { NextResponse } from "next/server";

import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

type SupabaseAuthUser = {
  email?: string;
  user?: { email?: string };
};

type InvoiceRow = {
  id: string;
  invoice_number: string;
  client_name: string | null;
  client_email: string | null;
  dog_names: string[] | null;
  issued_on: string | null;
  due_on: string | null;
  amount_cents: number | null;
  currency: string | null;
  status: "draft" | "sent" | "pending" | "paid" | "overdue" | "refunded" | null;
  paid_on: string | null;
  revolut_transaction_id: string | null;
  payment_reference: string | null;
};

function mapInvoice(row: InvoiceRow) {
  return {
    id: row.id,
    number: row.invoice_number,
    client: row.client_name || "Unknown client",
    email: row.client_email || "",
    dogs: row.dog_names?.join(", ") || "—",
    issuedOn: row.issued_on,
    dueOn: row.due_on,
    amountCents: row.amount_cents ?? 0,
    currency: row.currency || "EUR",
    status: row.status || "pending",
    paidOn: row.paid_on,
    revolutTransactionId: row.revolut_transaction_id,
    paymentReference: row.payment_reference,
  };
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

export async function GET(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);

  if (!adminAccessToken && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = (await supabaseRestFetch(
      "/rest/v1/portal_invoices?select=*&order=issued_on.desc,created_at.desc",
      { cache: "no-store" },
      adminAccessToken ?? undefined,
    )) as InvoiceRow[];

    return NextResponse.json({ invoices: rows.map(mapInvoice), isFallback: false });
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
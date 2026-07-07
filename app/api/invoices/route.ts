import { NextResponse } from "next/server";

import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

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

export async function GET() {
  try {
    const rows = (await supabaseRestFetch(
      "/rest/v1/portal_invoices?select=*&order=issued_on.desc,created_at.desc",
      { cache: "no-store" },
    )) as InvoiceRow[];

    return NextResponse.json({ invoices: rows.map(mapInvoice), isFallback: false });
  } catch (error) {
    console.error("Invoice data fallback", { route: "/api/invoices", error });
    return NextResponse.json({ invoices: [], isFallback: true });
  }
}
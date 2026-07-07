import { NextResponse } from "next/server";

import { revolutBusinessGet } from "@/utils/revolut-business";
import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

type SupabaseAuthUser = {
  email?: string;
  user?: { email?: string };
};

type RevolutTransaction = {
  id: string;
  state?: string;
  completed_at?: string;
  created_at?: string;
  reference?: string;
  request_id?: string;
  amount?: number;
  currency?: string;
};

type InvoiceMatchRow = {
  id: string;
  invoice_number: string;
  payment_reference: string | null;
  amount_cents: number | null;
  currency: string | null;
  status: string | null;
};

function centsFromRevolutAmount(amount?: number) {
  return Math.round(Math.abs(amount ?? 0) * 100);
}

function isCompletedCredit(transaction: RevolutTransaction) {
  return transaction.state === "completed" && (transaction.amount ?? 0) > 0;
}

function matchesInvoice(transaction: RevolutTransaction, invoice: InvoiceMatchRow) {
  const reference = `${transaction.reference ?? ""} ${transaction.request_id ?? ""}`.toLowerCase();
  const expectedReference = (invoice.payment_reference || invoice.invoice_number).toLowerCase();
  const sameReference = reference.includes(expectedReference);
  const sameCurrency = !invoice.currency || !transaction.currency || invoice.currency === transaction.currency;
  const sameAmount = !invoice.amount_cents || centsFromRevolutAmount(transaction.amount) === invoice.amount_cents;

  return sameReference && sameCurrency && sameAmount;
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

export async function POST(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);

  if (!adminAccessToken && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString();
    const transactions = await revolutBusinessGet<RevolutTransaction[]>("/api/1.0/transactions", { from, count: 100 });
    const invoices = (await supabaseRestFetch(
      "/rest/v1/portal_invoices?select=id,invoice_number,payment_reference,amount_cents,currency,status&status=in.(sent,pending,overdue)",
      { cache: "no-store" },
      adminAccessToken ?? undefined,
    )) as InvoiceMatchRow[];
    const updates = invoices.flatMap((invoice) => {
      const transaction = transactions.find((item) => isCompletedCredit(item) && matchesInvoice(item, invoice));
      if (!transaction) return [];

      return [{
        id: invoice.id,
        status: "paid",
        paid_on: transaction.completed_at ?? transaction.created_at ?? new Date().toISOString(),
        revolut_transaction_id: transaction.id,
        updated_at: new Date().toISOString(),
      }];
    });

    if (updates.length) {
      await supabaseRestFetch("/rest/v1/portal_invoices?on_conflict=id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify(updates),
      }, adminAccessToken ?? undefined);
    }

    return NextResponse.json({ matched: updates.length, scanned: transactions.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sync Revolut payments.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
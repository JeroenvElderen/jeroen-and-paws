import {
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileText,
  Filter,
  MoreVertical,
  PawPrint,
  Plus,
  Search,
  X,
  Clock3,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { useSupabaseLiveQuery } from "@/components/portal/use-supabase-live-query";

import { Card } from "./card";

type BackendInvoice = {
  id: string;
  number: string;
  client: string;
  email: string;
  dogs: string;
  issuedOn: string | null;
  dueOn: string | null;
  amountCents: number;
  currency: string;
  status: "draft" | "sent" | "pending" | "paid" | "overdue" | "refunded";
  paidOn: string | null;
  revolutTransactionId: string | null;
  paymentReference: string | null;
};

type InvoicesResponse = {
  invoices: BackendInvoice[];
  isFallback: boolean;
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(cents / 100);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IE", { dateStyle: "medium" }).format(new Date(value));
}

function displayStatus(status: BackendInvoice["status"]) {
  if (status === "paid") return "Paid";
  if (status === "overdue") return "Overdue";
  if (status === "refunded") return "Refunded";
  if (status === "draft") return "Draft";
  return "Pending";
}

const toneClasses = {
  purple: "bg-[#efe8ff] text-[#5b2aa0]",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-rose-100 text-rose-600",
};

function StatusPill({ status }: { status: string }) {
  const styles = status === "Paid" ? "bg-green-100 text-green-700" : status === "Pending" ? "bg-orange-100 text-orange-700" : status === "Draft" ? "bg-slate-100 text-slate-700" : "bg-rose-100 text-rose-700";
  return <span className={`rounded-md px-3 py-1 text-xs font-semibold ${styles}`}>{status}</span>;
}

export function BackendInvoices({ accessToken }: { accessToken?: string }) {
  const [isFallback, setIsFallback] = useState(true);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const fallback = useMemo<BackendInvoice[]>(() => [], []);
  const realtimeTables = useMemo(() => ["portal_invoices"], []);
  const noopMap = useCallback(() => [], []);
  const loadInvoices = useCallback(async () => {
    const response = await fetch("/api/invoices", { cache: "no-store" });
    const payload = (await response.json()) as InvoicesResponse;
    setIsFallback(payload.isFallback);
    return payload.invoices;
  }, []);
  const { data: invoices, isLoading, error } = useSupabaseLiveQuery({
    accessToken,
    fallback,
    path: "/api/invoices",
    realtimeTables,
    map: noopMap,
    load: loadInvoices,
  });

  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");
  const pendingInvoices = invoices.filter((invoice) => invoice.status === "pending" || invoice.status === "sent");
  const overdueInvoices = invoices.filter((invoice) => invoice.status === "overdue");
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amountCents, 0);
  const paidAmount = paidInvoices.reduce((sum, invoice) => sum + invoice.amountCents, 0);
  const pendingAmount = pendingInvoices.reduce((sum, invoice) => sum + invoice.amountCents, 0);
  const overdueAmount = overdueInvoices.reduce((sum, invoice) => sum + invoice.amountCents, 0);
  const currency = invoices[0]?.currency ?? "EUR";
  const latestInvoice = invoices[0];
  const invoiceStats = [
    { label: "Total Invoices", value: invoices.length.toString(), helper: `${formatMoney(totalAmount, currency)} billed`, tone: "purple", icon: FileText },
    { label: "Paid Invoices", value: paidInvoices.length.toString(), helper: `${formatMoney(paidAmount, currency)} collected`, tone: "green", icon: Check },
    { label: "Pending Invoices", value: pendingInvoices.length.toString(), helper: `${formatMoney(pendingAmount, currency)} pending`, tone: "orange", icon: Clock3 },
    { label: "Overdue Invoices", value: overdueInvoices.length.toString(), helper: `${formatMoney(overdueAmount, currency)} overdue`, tone: "red", icon: X },
  ] as const;

  async function syncRevolutPayments() {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const response = await fetch("/api/invoices/sync", { method: "POST" });
      const payload = (await response.json()) as { matched?: number; scanned?: number; error?: string };
      if (!response.ok) throw new Error(payload.error || "Revolut sync failed.");
      setSyncMessage(`Revolut sync complete: matched ${payload.matched ?? 0} invoice payment(s) from ${payload.scanned ?? 0} transaction(s).`);
    } catch (syncError) {
      setSyncMessage(syncError instanceof Error ? syncError.message : "Revolut sync failed.");
    } finally {
      setIsSyncing(false);
    }
  }
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-serif text-3xl">Invoices <PawPrint className="inline size-6 text-[#6c38c2]" /></h1>
          <p className="mt-1 text-sm text-[#6d667a]">Live Supabase invoices with Revolut bank payment reconciliation.</p>
        </div>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={syncRevolutPayments} disabled={isSyncing} className="rounded-lg border border-[#4f2c91]/20 bg-white px-6 py-3 text-sm font-semibold text-[#4f2c91] disabled:opacity-60"><Clock3 className="mr-2 inline size-4" />{isSyncing ? "Syncing Revolut…" : "Sync Revolut"}</button><button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />Create Invoice <ChevronDown className="ml-8 inline size-4" /></button></div>
      </div>

      {(isLoading || isFallback || error || syncMessage) && <p className="mt-5 rounded-xl border border-[#151124]/10 bg-white px-5 py-4 text-sm text-[#6d667a]">{isLoading ? "Loading live invoices…" : syncMessage || error || "Showing no invoices until Supabase is connected and portal_invoices exists."}</p>}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {invoiceStats.map(({ label, value, helper, tone, icon: Icon }) => (
          <Card key={label} className="p-6">
            <div className="flex items-center gap-6"><span className={`grid size-14 place-items-center rounded-full ${toneClasses[tone]}`}><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className={`mt-2 text-sm ${tone === "purple" || tone === "green" ? "text-green-700" : tone === "orange" ? "text-orange-600" : "text-rose-600"}`}>{tone === "purple" && "↑ "}{helper}</p></div></div>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_20rem]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 xl:flex-row xl:items-center xl:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] xl:max-w-lg"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search invoices by number, client or dog..." /></label>
            <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Statuses <ChevronDown className="ml-8 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Clients <ChevronDown className="ml-8 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">May 20 – May 26, 2024 <CalendarDays className="ml-5 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[1030px] text-left text-sm"><thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Invoice # ↕", "Client", "Dog(s)", "Date", "Due Date", "Amount", "Status", "Actions"].map((h)=><th key={h} className="px-6 py-4">{h}</th>)}</tr></thead><tbody className="divide-y divide-[#151124]/10">{invoices.map((invoice)=><tr key={invoice.id} className="bg-white"><td className="px-6 py-4"><p className="font-semibold">{invoice.number}</p><p className="mt-1 text-[#6d667a]">Ref: {invoice.paymentReference || invoice.number}</p></td><td className="px-6 py-4"><div className="flex items-center gap-4"><div className="grid size-11 place-items-center rounded-full bg-[#efe8ff] font-serif text-[#4f2c91]">{invoice.client.charAt(0)}</div><div><p className="font-semibold">{invoice.client}</p><p className="mt-1 text-xs text-[#6d667a]">{invoice.email}</p></div></div></td><td className="px-6 py-4"><div className="flex items-center gap-3"><PawPrint className="size-5 text-[#4f2c91]" />{invoice.dogs}</div></td><td className="px-6 py-4">{formatDate(invoice.issuedOn)}</td><td className="px-6 py-4">{formatDate(invoice.dueOn)}</td><td className="px-6 py-4 font-semibold">{formatMoney(invoice.amountCents, invoice.currency)}</td><td className="px-6 py-4"><StatusPill status={displayStatus(invoice.status)} /></td><td className="px-6 py-4"><div className="flex gap-3"><button aria-label={`View ${invoice.number}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f2c91]"><Eye className="size-5" /></button><button aria-label={`Actions for ${invoice.number}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></div></td></tr>)}</tbody></table></div>
          <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between"><p>Showing {invoices.length ? `1 to ${invoices.length} of ${invoices.length}` : "0"} invoices</p><div className="flex gap-2">{["‹", "1", "2", "3", "...", "16", "›"].map((p)=><button key={p} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${p === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{p}</button>)}</div></div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-5"><h2 className="font-serif text-xl">Invoice Summary</h2><div className="mt-6 flex items-center gap-5"><div className="grid size-28 place-items-center rounded-full bg-[conic-gradient(#4f2c91_0_68%,#22c55e_68%_82%,#f59e0b_82%_96%,#f43f5e_96%_100%)]"><div className="grid size-16 place-items-center rounded-full bg-white text-center text-xs"><span>Total<br /><strong>€12,140.00</strong></span></div></div><div className="space-y-3 text-xs"><p><span className="mr-2 inline-block size-2 rounded-full bg-green-500" />Paid<br /><span className="text-[#6d667a]">€8,340.00 (68%)</span></p><p><span className="mr-2 inline-block size-2 rounded-full bg-orange-500" />Pending<br /><span className="text-[#6d667a]">€2,180.00 (18%)</span></p><p><span className="mr-2 inline-block size-2 rounded-full bg-rose-500" />Overdue<br /><span className="text-[#6d667a]">€1,620.00 (14%)</span></p></div></div></Card>
          <Card className="p-5"><h2 className="font-serif text-xl">Invoice Details</h2><div className="mt-5 flex items-center justify-between"><p className="font-serif text-xl">{latestInvoice?.number ?? "No invoice"}</p><StatusPill status={latestInvoice ? displayStatus(latestInvoice.status) : "Pending"} /></div><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between"><dt className="text-[#6d667a]">Issued On</dt><dd>{formatDate(latestInvoice?.issuedOn ?? null)}</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Due Date</dt><dd>{formatDate(latestInvoice?.dueOn ?? null)}</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Amount</dt><dd>{latestInvoice ? formatMoney(latestInvoice.amountCents, latestInvoice.currency) : "—"}</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Paid On</dt><dd>{formatDate(latestInvoice?.paidOn ?? null)}</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Payment Method</dt><dd>{latestInvoice?.revolutTransactionId ? "Revolut bank transfer" : "Awaiting Revolut match"}</dd></div></dl><button className="mt-5 w-full rounded-lg border border-[#5b2aa0]/15 bg-[#f4efff] px-4 py-3 text-sm font-semibold text-[#5b2aa0]"><Download className="mr-2 inline size-4" />Download PDF</button></Card>
          <Card className="p-5"><h2 className="font-serif text-lg">Client</h2><div className="mt-4 flex items-center gap-3"><Image src="/images/dogs/Johnny/Johnny.jpeg" alt="Sarah Johnson" width={48} height={48} className="size-12 rounded-full object-cover" /><div><p className="font-semibold">Sarah Johnson</p><p className="text-xs text-[#6d667a]">sarah.j@email.com<br />+353 87 123 4567</p></div></div><button className="mt-5 w-full rounded-lg border border-[#5b2aa0]/15 bg-[#f4efff] px-4 py-3 text-sm font-semibold text-[#5b2aa0]">View Client Profile</button></Card>
          <Card className="p-5"><h2 className="font-serif text-lg">Dog</h2><div className="mt-4 flex items-center gap-3"><Image src="/images/dogs/kaiser.jpg" alt="Max" width={48} height={48} className="size-12 rounded-full object-cover" /><div><p className="font-semibold">Max</p><p className="text-xs text-[#6d667a]">Golden Retriever</p></div></div><button className="mt-5 w-full rounded-lg border border-[#5b2aa0]/15 bg-[#f4efff] px-4 py-3 text-sm font-semibold text-[#5b2aa0]">View Dog Profile</button></Card>
        </aside>
      </div>
    </div>
  );
}
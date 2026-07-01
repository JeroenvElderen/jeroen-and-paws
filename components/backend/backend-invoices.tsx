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

import { Card } from "./card";

const invoiceStats = [
  { label: "Total Invoices", value: "124", helper: "18% from last month", tone: "purple", icon: FileText },
  { label: "Paid Invoices", value: "89", helper: "€8,340.00 collected", tone: "green", icon: Check },
  { label: "Pending Invoices", value: "21", helper: "€2,180.00 pending", tone: "orange", icon: Clock3 },
  { label: "Overdue Invoices", value: "14", helper: "€1,620.00 overdue", tone: "red", icon: X },
] as const;

const invoices = [
  { id: "INV-2024-0124", date: "May 25, 2024", client: "Sarah Johnson", email: "sarah.j@email.com", dog: "Max", amount: "€60.00", due: "Jun 8, 2024", status: "Paid", image: "/images/dogs/kaiser.jpg" },
  { id: "INV-2024-0123", date: "May 25, 2024", client: "James Smith", email: "james.s@email.com", dog: "Luna", amount: "€45.00", due: "Jun 8, 2024", status: "Paid", image: "/images/dogs/Nola/Nola-1.jpg" },
  { id: "INV-2024-0122", date: "May 24, 2024", client: "Emily Davis", email: "emily.d@email.com", dog: "Buddy", amount: "€35.00", due: "Jun 7, 2024", status: "Pending", image: "/images/dogs/lakta.jpeg" },
  { id: "INV-2024-0121", date: "May 23, 2024", client: "Michael Brown", email: "michael.b@email.com", dog: "Charlie", amount: "€90.00", due: "Jun 6, 2024", status: "Paid", image: "/images/dogs/aslan/aslan.jpg" },
  { id: "INV-2024-0120", date: "May 22, 2024", client: "Olivia Wilson", email: "olivia.w@email.com", dog: "Milo, Zara", amount: "€80.00", due: "Jun 5, 2024", status: "Pending", image: "/images/dogs/echo.jpg" },
  { id: "INV-2024-0119", date: "May 21, 2024", client: "Daniel Taylor", email: "daniel.t@email.com", dog: "Poppy", amount: "€30.00", due: "Jun 4, 2024", status: "Overdue", image: "/images/dogs/rufus.jpg" },
  { id: "INV-2024-0118", date: "May 20, 2024", client: "Sophia Anderson", email: "sophia.a@email.com", dog: "Bella", amount: "€70.00", due: "Jun 3, 2024", status: "Paid", image: "/images/dogs/ollie/ollie1.jpeg" },
  { id: "INV-2024-0117", date: "May 19, 2024", client: "David Lee", email: "david.l@email.com", dog: "Zara", amount: "€50.00", due: "Jun 2, 2024", status: "Overdue", image: "/images/dogs/nola.jpg" },
] as const;

const toneClasses = {
  purple: "bg-[#efe8ff] text-[#5b2aa0]",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-rose-100 text-rose-600",
};

function StatusPill({ status }: { status: string }) {
  const styles = status === "Paid" ? "bg-green-100 text-green-700" : status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-rose-100 text-rose-700";
  return <span className={`rounded-md px-3 py-1 text-xs font-semibold ${styles}`}>{status}</span>;
}

export function BackendInvoices() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-serif text-3xl">Invoices <PawPrint className="inline size-6 text-[#6c38c2]" /></h1>
          <p className="mt-1 text-sm text-[#6d667a]">Create, view and manage all your invoices.</p>
        </div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />Create Invoice <ChevronDown className="ml-8 inline size-4" /></button>
      </div>

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
          <div className="overflow-x-auto"><table className="w-full min-w-[1030px] text-left text-sm"><thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Invoice # ↕", "Client", "Dog(s)", "Date", "Due Date", "Amount", "Status", "Actions"].map((h)=><th key={h} className="px-6 py-4">{h}</th>)}</tr></thead><tbody className="divide-y divide-[#151124]/10">{invoices.map((invoice)=><tr key={invoice.id} className="bg-white"><td className="px-6 py-4"><p className="font-semibold">{invoice.id}</p><p className="mt-1 text-[#6d667a]">{invoice.date}</p></td><td className="px-6 py-4"><div className="flex items-center gap-4"><Image src={invoice.image} alt={`${invoice.client} profile`} width={42} height={42} className="size-11 rounded-full object-cover" /><div><p className="font-semibold">{invoice.client}</p><p className="mt-1 text-xs text-[#6d667a]">{invoice.email}</p></div></div></td><td className="px-6 py-4"><div className="flex items-center gap-3"><Image src={invoice.image} alt={`${invoice.dog} profile`} width={32} height={32} className="size-8 rounded-full object-cover" />{invoice.dog}</div></td><td className="px-6 py-4">{invoice.date}</td><td className="px-6 py-4">{invoice.due}</td><td className="px-6 py-4 font-semibold">{invoice.amount}</td><td className="px-6 py-4"><StatusPill status={invoice.status} /></td><td className="px-6 py-4"><div className="flex gap-3"><button aria-label={`View ${invoice.id}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f2c91]"><Eye className="size-5" /></button><button aria-label={`Actions for ${invoice.id}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></div></td></tr>)}</tbody></table></div>
          <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between"><p>Showing 1 to 8 of 124 invoices</p><div className="flex gap-2">{["‹", "1", "2", "3", "...", "16", "›"].map((p)=><button key={p} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${p === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{p}</button>)}</div></div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-5"><h2 className="font-serif text-xl">Invoice Summary</h2><div className="mt-6 flex items-center gap-5"><div className="grid size-28 place-items-center rounded-full bg-[conic-gradient(#4f2c91_0_68%,#22c55e_68%_82%,#f59e0b_82%_96%,#f43f5e_96%_100%)]"><div className="grid size-16 place-items-center rounded-full bg-white text-center text-xs"><span>Total<br /><strong>€12,140.00</strong></span></div></div><div className="space-y-3 text-xs"><p><span className="mr-2 inline-block size-2 rounded-full bg-green-500" />Paid<br /><span className="text-[#6d667a]">€8,340.00 (68%)</span></p><p><span className="mr-2 inline-block size-2 rounded-full bg-orange-500" />Pending<br /><span className="text-[#6d667a]">€2,180.00 (18%)</span></p><p><span className="mr-2 inline-block size-2 rounded-full bg-rose-500" />Overdue<br /><span className="text-[#6d667a]">€1,620.00 (14%)</span></p></div></div></Card>
          <Card className="p-5"><h2 className="font-serif text-xl">Invoice Details</h2><div className="mt-5 flex items-center justify-between"><p className="font-serif text-xl">INV-2024-0124</p><StatusPill status="Paid" /></div><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between"><dt className="text-[#6d667a]">Issued On</dt><dd>May 25, 2024</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Due Date</dt><dd>Jun 8, 2024</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Amount</dt><dd>€60.00</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Paid On</dt><dd>May 26, 2024</dd></div><div className="flex justify-between"><dt className="text-[#6d667a]">Payment Method</dt><dd>VISA •••• 4242</dd></div></dl><button className="mt-5 w-full rounded-lg border border-[#5b2aa0]/15 bg-[#f4efff] px-4 py-3 text-sm font-semibold text-[#5b2aa0]"><Download className="mr-2 inline size-4" />Download PDF</button></Card>
          <Card className="p-5"><h2 className="font-serif text-lg">Client</h2><div className="mt-4 flex items-center gap-3"><Image src="/images/dogs/Johnny/Johnny.jpeg" alt="Sarah Johnson" width={48} height={48} className="size-12 rounded-full object-cover" /><div><p className="font-semibold">Sarah Johnson</p><p className="text-xs text-[#6d667a]">sarah.j@email.com<br />+353 87 123 4567</p></div></div><button className="mt-5 w-full rounded-lg border border-[#5b2aa0]/15 bg-[#f4efff] px-4 py-3 text-sm font-semibold text-[#5b2aa0]">View Client Profile</button></Card>
          <Card className="p-5"><h2 className="font-serif text-lg">Dog</h2><div className="mt-4 flex items-center gap-3"><Image src="/images/dogs/kaiser.jpg" alt="Max" width={48} height={48} className="size-12 rounded-full object-cover" /><div><p className="font-semibold">Max</p><p className="text-xs text-[#6d667a]">Golden Retriever</p></div></div><button className="mt-5 w-full rounded-lg border border-[#5b2aa0]/15 bg-[#f4efff] px-4 py-3 text-sm font-semibold text-[#5b2aa0]">View Dog Profile</button></Card>
        </aside>
      </div>
    </div>
  );
}
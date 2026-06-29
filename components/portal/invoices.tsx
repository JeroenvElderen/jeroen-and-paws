import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Download,
  FileText,
  Filter,
  Mail,
  PawPrint,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const overviewStats = [
  {
    icon: FileText,
    label: "Total Paid",
    value: "€1,245.00",
    note: "Across 9 invoices",
    tone: "bg-[#eadff4] text-[#4d2e91]",
  },
  {
    icon: Clock3,
    label: "Outstanding",
    value: "€0.00",
    note: "All caught up",
    tone: "bg-[#eee9e1] text-[#5f4d35]",
  },
  {
    icon: Check,
    label: "Paid Invoices",
    value: "9",
    note: "Thank you",
    tone: "bg-[#e7f1df] text-[#356d28]",
  },
  {
    icon: CalendarDays,
    label: "Last Payment",
    value: "€195.00",
    note: "25 Apr 2026",
    tone: "bg-[#f0e8f8] text-[#4d2e91]",
  },
] as const;

const invoices = [
  {
    title: "Golden Hour Dunes",
    date: "2 Mar 2026",
    location: "Greystones South Beach",
    number: "INV-2026-0091",
    status: "Paid",
    amount: "€195.00",
    paymentNote: "Paid on 5 Mar 2026",
    image: "/images/dogs/ace.jpg",
  },
  {
    title: "Forest Adventure",
    date: "14 Apr 2026",
    location: "Powerscourt Estate",
    number: "INV-2026-0073",
    status: "Paid",
    amount: "€195.00",
    paymentNote: "Paid on 16 Apr 2026",
    image: "/images/dogs/shadow.jpg",
  },
  {
    title: "Heathland Walk",
    date: "18 Feb 2026",
    location: "Wicklow Mountains",
    number: "INV-2026-0045",
    status: "Paid",
    amount: "€175.00",
    paymentNote: "Paid on 20 Feb 2026",
    image: "/images/dogs/kaiser.jpg",
  },
  {
    title: "Winter Woods",
    date: "10 Jan 2026",
    location: "Djouce Woods",
    number: "INV-2026-0012",
    status: "Paid",
    amount: "€175.00",
    paymentNote: "Paid on 12 Jan 2026",
    image: "/images/dogs/lola.jpeg",
  },
  {
    title: "Lakeside Escape",
    date: "12 Dec 2025",
    location: "Vartry Reservoir",
    number: "INV-2025-0122",
    status: "Outstanding",
    amount: "€180.00",
    paymentNote: "Due on 12 Jan 2026",
    image: "/images/dogs/nola.jpeg",
  },
  {
    title: "Beach Day",
    date: "22 Aug 2025",
    location: "Greystones Harbour",
    number: "INV-2025-0071",
    status: "Paid",
    amount: "€150.00",
    paymentNote: "Paid on 24 Aug 2025",
    image: "/images/dogs/compass.jpeg",
  },
] as const;

const invoiceTabs = ["All", "Paid", "Outstanding", "Refunded"] as const;

function InvoicePanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: (typeof invoices)[number]["status"] }) {
  const isOutstanding = status === "Outstanding";

  return (
    <span
      className={`inline-flex rounded-full px-4 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] ${isOutstanding ? "bg-[#fff0cf] text-[#806013]" : "bg-[#e9f4df] text-[#356d28]"}`}
    >
      {status}
    </span>
  );
}

export function Invoices() {
  return (
    <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-[#241f30]">
            Invoices <FileText aria-hidden="true" className="inline size-6 text-[#4d2e91]" />
          </h1>
          <p className="mt-3 text-sm text-[#17132a]">View and manage all your invoices and payments.</p>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Notifications" className="relative text-[#2f1b59]">
            <Bell className="size-6" />
            <span className="absolute -right-1 -top-2 grid size-5 place-items-center rounded-full bg-[#17132a] text-[0.65rem] font-black text-white">2</span>
          </button>
          <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
            <Image src="/images/dogs/ace.jpg" alt="Teddy profile photo" fill sizes="56px" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-6xl space-y-6">
        <InvoicePanel className="p-6 sm:p-8">
          <h2 className="font-serif text-2xl text-[#241f30]">Payment Overview</h2>
          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {overviewStats.map(({ icon: Icon, label, value, note, tone }) => (
              <article key={label} className="flex gap-4 xl:border-r xl:border-[#24163f]/10 xl:pr-6 xl:last:border-r-0">
                <span className={`grid size-14 shrink-0 place-items-center rounded-full ${tone}`}>
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#3a3048]">{label}</p>
                  <p className="mt-3 font-serif text-2xl text-[#2f1b59]">{value}</p>
                  <p className="mt-3 text-sm text-[#665d70]">{note}</p>
                </div>
              </article>
            ))}
          </div>
        </InvoicePanel>

        <section className="rounded-xl border border-[#24163f]/10 bg-white p-5 shadow-[0_18px_55px_rgba(29,23,40,0.08)] sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-[#241f30]">All Invoices</h2>
              <div className="mt-5 flex flex-wrap gap-8 text-sm font-medium">
                {invoiceTabs.map((tab) => (
                  <a
                    key={tab}
                    href="#"
                    className={`${tab === "All" ? "border-b-2 border-[#4d2e91] text-[#3f2581]" : "text-[#3a3048]"} px-1 pb-4`}
                  >
                    {tab}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[#5f5769]">
              <button type="button" className="inline-flex items-center gap-2 rounded border border-[#24163f]/10 px-4 py-3 text-[#3f2581]">
                <Filter aria-hidden="true" className="size-4" />
                Filter
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded border border-[#24163f]/10 px-4 py-3">
                Sort by: <span className="font-bold text-[#241f30]">Newest</span>
                <ChevronDown aria-hidden="true" className="size-4 text-[#3f2581]" />
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {invoices.map((invoice) => {
              const isOutstanding = invoice.status === "Outstanding";

              return (
                <article key={invoice.number} className="grid gap-5 rounded-lg border border-[#24163f]/10 p-3 shadow-[0_8px_24px_rgba(29,23,40,0.04)] lg:grid-cols-[11rem_1fr_auto] lg:items-center">
                  <div className="relative h-40 overflow-hidden rounded-lg lg:h-36">
                    <Image src={invoice.image} alt={`${invoice.title} invoice session`} fill sizes="176px" className="object-cover" />
                  </div>

                  <div className="px-1 py-1 lg:px-0">
                    <h3 className="font-serif text-xl text-[#25203d]">{invoice.title}</h3>
                    <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#3a3048]">
                      <CalendarDays aria-hidden="true" className="size-4 text-[#6d4b9b]" />
                      <span>{invoice.date}</span>
                      <span aria-hidden="true">-</span>
                      <span>{invoice.location}</span>
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#3a3048]">
                      <span>Invoice #{invoice.number}</span>
                      <span className="rounded-full bg-[#f0e8f8] px-3 py-1 text-[0.65rem] font-bold text-[#4d2e91]">Session</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-[#24163f]/10 pt-4 lg:min-w-52 lg:border-t-0 lg:pt-0">
                    <div>
                      <StatusBadge status={invoice.status} />
                      <p className="mt-4 text-xl font-semibold text-[#17132a]">{invoice.amount}</p>
                      <p className="mt-2 text-sm text-[#665d70]">{invoice.paymentNote}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={`rounded px-5 py-3 text-xs font-black uppercase tracking-[0.14em] ${isOutstanding ? "bg-[#4d2e91] text-white" : "border border-[#4d2e91]/30 text-[#3f2581]"}`}
                      >
                        {isOutstanding ? "View & Pay" : "View invoice"}
                      </button>
                      <button type="button" aria-label={`Download ${invoice.title} invoice`} className="grid size-11 place-items-center rounded border border-[#4d2e91]/30 text-[#3f2581]">
                        <Download aria-hidden="true" className="size-5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-5 rounded-xl bg-[#f4eef8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#4d2e91] text-white">
              <Mail aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h2 className="font-serif text-xl text-[#241f30]">Prefer email invoices?</h2>
              <p className="mt-2 text-sm text-[#5f5769]">We can send all future invoices directly to your inbox.</p>
            </div>
          </div>
          <button type="button" className="rounded border border-[#4d2e91]/30 px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#3f2581]">
            Update preferences
          </button>
        </section>

        <section className="grid gap-5 rounded-xl border border-[#24163f]/10 bg-white p-6 shadow-[0_18px_55px_rgba(29,23,40,0.08)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7">
          <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
            <Image src="/images/dogs/melakta.jpeg" alt="Jeroen with a dog" fill sizes="80px" className="object-cover" />
          </div>
          <div>
            <h2 className="font-serif text-xl text-[#241f30]">Have a question about an invoice?</h2>
            <p className="mt-2 text-sm text-[#5f5769]">I&apos;m happy to help.</p>
            <p className="mt-2 font-serif text-xl text-[#3f2581]">Jeroen <PawPrint aria-hidden="true" className="inline size-4" /></p>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded bg-[#4d2e91] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white">
            Send me a message <PawPrint aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

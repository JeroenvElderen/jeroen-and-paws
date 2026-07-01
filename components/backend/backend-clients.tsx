import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Filter,
  Mail,
  MapPin,
  MoreVertical,
  PawPrint,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  StickyNote,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";

import { Card } from "./card";

const clientStats = [
  { label: "Total Clients", value: "38", caption: "Across all time", icon: Users, tone: "bg-[#f0e9fb] text-[#5b2aa0]" },
  { label: "New Clients", value: "5", caption: "This month", icon: UserPlus, tone: "bg-green-100 text-green-700" },
  { label: "Active Clients", value: "35", caption: "With bookings", icon: ShieldCheck, tone: "bg-orange-100 text-orange-600" },
  { label: "Returning Clients", value: "28", caption: "This month", icon: RefreshCw, tone: "bg-[#f0e9fb] text-[#5b2aa0]" },
] as const;

const clients = [
  { name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+353 87 123 4567", dogs: "1 Dog", bookings: 12, spent: "€360.00", lastBooking: "May 25, 2024", service: "Dog Walk", status: "Active", image: "/images/dogs/Johnny/Johnny.jpeg" },
  { name: "James Smith", email: "james.s@email.com", phone: "+353 86 987 6543", dogs: "1 Dog", bookings: 8, spent: "€240.00", lastBooking: "May 25, 2024", service: "Training Session", status: "Active", image: "/images/dogs/Nola/Nola-1.jpg" },
  { name: "Emily Davis", email: "emily.d@email.com", phone: "+353 85 555 1122", dogs: "1 Dog", bookings: 6, spent: "€180.00", lastBooking: "May 26, 2024", service: "Dog Walk", status: "Active", image: "/images/dogs/lakta.jpeg" },
  { name: "Michael Brown", email: "michael.b@email.com", phone: "+353 87 222 3344", dogs: "1 Dog", bookings: 9, spent: "€270.00", lastBooking: "May 26, 2024", service: "Training Session", status: "Active", image: "/images/dogs/aslan/aslan.jpg" },
  { name: "Olivia Wilson", email: "olivia.w@email.com", phone: "+353 86 333 6677", dogs: "2 Dogs", bookings: 10, spent: "€320.00", lastBooking: "May 27, 2024", service: "Group Walk", status: "Active", image: "/images/dogs/echo.jpg" },
  { name: "Daniel Taylor", email: "daniel.t@email.com", phone: "+353 87 444 7788", dogs: "1 Dog", bookings: 5, spent: "€150.00", lastBooking: "May 27, 2024", service: "Dog Walk", status: "Inactive", image: "/images/dogs/rufus.jpg" },
  { name: "Sophia Anderson", email: "sophia.a@email.com", phone: "+353 85 666 8899", dogs: "1 Dog", bookings: 7, spent: "€210.00", lastBooking: "May 28, 2024", service: "Puppy Visit", status: "Active", image: "/images/dogs/ollie/ollie1.jpeg" },
  { name: "David Lee", email: "david.l@email.com", phone: "+353 86 777 9900", dogs: "1 Dog", bookings: 3, spent: "€90.00", lastBooking: "May 10, 2024", service: "Training Session", status: "Inactive", image: "/images/dogs/kaiser.jpg" },
] as const;

const selectedClient = clients[0];

export function BackendClients() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div><h1 className="font-serif text-3xl">Clients <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">Manage your clients and their furry friends.</p></div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />Add New Client</button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
        {clientStats.map(({ label, value, caption, icon: Icon, tone }) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className={`grid size-14 place-items-center rounded-full ${tone}`}><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className="mt-2 text-sm text-[#6d667a]">{caption}</p></div></div></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_23rem]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] lg:max-w-md"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search clients by name, email, or phone..." /></label>
            <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Statuses <ChevronDown className="ml-8 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Clients <ChevronDown className="ml-8 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Client ↑", "Contact", "Dogs", "Bookings", "Total Spent", "Last Booking", "Status", ""].map((heading) => <th key={heading} className="px-6 py-4">{heading}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#151124]/10">
                {clients.map((client) => (
                  <tr key={client.email} className="bg-white align-middle">
                    <td className="px-6 py-4"><div className="flex items-center gap-4"><Image src={client.image} alt={`${client.name} avatar`} width={42} height={42} className="size-11 rounded-full object-cover" /><p className="font-semibold">{client.name}</p></div></td>
                    <td className="px-6 py-4 text-[#4f4863]"><p>{client.email}</p><p className="mt-1">{client.phone}</p></td>
                    <td className="px-6 py-4"><span className="inline-flex items-center gap-2"><PawPrint className="size-4 text-[#6c38c2]" />{client.dogs}</span></td>
                    <td className="px-6 py-4">{client.bookings}</td>
                    <td className="px-6 py-4">{client.spent}</td>
                    <td className="px-6 py-4"><p>{client.lastBooking}</p><p className="mt-1 text-[#6d667a]">{client.service}</p></td>
                    <td className="px-6 py-4"><span className={`rounded-md px-3 py-1 text-xs font-medium ${client.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"}`}>{client.status}</span></td>
                    <td className="px-6 py-4"><button aria-label={`Actions for ${client.name}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between">
            <p>Showing 1 to 8 of 38 clients</p><div className="flex gap-2"><button className="grid size-9 place-items-center rounded-md border border-[#151124]/10"><ChevronLeft className="size-4" /></button>{["1", "2", "3", "...", "5"].map((page) => <button key={page} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${page === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{page}</button>)}<button className="grid size-9 place-items-center rounded-md border border-[#151124]/10"><ChevronRight className="size-4" /></button></div>
          </div>
        </Card>

        <aside className="space-y-5">
          <Card className="overflow-hidden">
            <div className="flex items-start gap-4 p-5"><Image src={selectedClient.image} alt={`${selectedClient.name} profile`} width={64} height={64} className="size-16 rounded-full object-cover" /><div className="min-w-0 flex-1"><h2 className="font-serif text-xl">{selectedClient.name}</h2><span className="mt-2 inline-block rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Active Client</span><p className="mt-3 text-sm text-[#6d667a]">{selectedClient.email}</p><p className="mt-1 text-sm text-[#6d667a]">{selectedClient.phone}</p></div><button aria-label="Close client details"><X className="size-5 text-[#3c246c]" /></button></div>
            <div className="grid grid-cols-4 border-y border-[#151124]/10 text-center text-xs font-semibold text-[#4f4863]"><button className="border-b-2 border-[#5b2aa0] py-3 text-[#5b2aa0]">Overview</button><button>Dogs</button><button>Bookings</button><button>Notes</button></div>
            <div className="space-y-6 p-5 text-sm"><div className="flex items-center justify-between"><h3 className="font-semibold">Client Information</h3><button className="font-semibold text-[#5b2aa0]"><Edit3 className="mr-1 inline size-4" />Edit</button></div><InfoRow icon={MapPin} label="Address" value="123 Greenfield Road, Dublin 6, Ireland" /><InfoRow icon={CalendarDays} label="Joined" value="Feb 10, 2024" /><InfoRow icon={Mail} label="Preferred Contact" value="Email" /><InfoRow icon={StickyNote} label="Notes" value="Loves morning walks. Prefers quieter routes." /></div>
          </Card>
          <Card className="p-5"><h3 className="font-semibold">Summary</h3><div className="mt-5 space-y-5 text-sm"><InfoRow icon={CalendarDays} label="Total Bookings" value="12" /><InfoRow icon={RefreshCw} label="Total Spent" value="€360.00" /><InfoRow icon={CalendarDays} label="Last Booking" value="May 25, 2024\nDog Walk" /></div><button className="mt-6 w-full rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25">View Full Profile <ChevronRight className="ml-2 inline size-4" /></button></Card>
        </aside>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return <div className="flex gap-4"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-4" /></span><div><p className="text-[#858093]">{label}</p>{value.split("\n").map((line) => <p key={line} className="mt-1 text-[#2c2542]">{line}</p>)}</div></div>;
}
import { CalendarDays, ChevronDown, Download, Eye, Filter, ImageIcon, MoreVertical, PawPrint, Pencil, Plus, Search, Upload, Users } from "lucide-react";
import Image from "next/image";

import { Card } from "./card";

const galleryImages = [
  "/images/dogs/kaiser.jpg",
  "/images/dogs/honey.jpg",
  "/images/dogs/Nola/Nola-1.jpg",
  "/images/dogs/lakta.jpeg",
  "/images/dogs/walk.jpeg",
  "/images/dogs/echo.jpg",
  "/images/dogs/aslan/aslan.jpg",
  "/images/dogs/ollie/ollie1.jpeg",
] as const;

const stats = [
  { label: "Total Galleries", value: "48", trend: "16%", note: "from last month", icon: ImageIcon, color: "bg-[#f0e9fb] text-[#4f2c91]" },
  { label: "Clients with Galleries", value: "32", trend: "14%", note: "from last month", icon: Users, color: "bg-emerald-100 text-emerald-700" },
  { label: "Total Photos", value: "612", trend: "22%", note: "from last month", icon: ImageIcon, color: "bg-orange-100 text-orange-600" },
  { label: "Photos This Month", value: "128", trend: "May 1 – May 26, 2024", note: "", icon: CalendarDays, color: "bg-[#f0e9fb] text-[#4f2c91]" },
] as const;

const rows = [
  { client: "Sarah Johnson", dog: "Max", date: "May 25, 2024", time: "2:30 PM", photos: 16, status: "Published", avatar: "/images/dogs/Johnny/Johnny.jpeg", more: "+12" },
  { client: "James Smith", dog: "Luna", date: "May 24, 2024", time: "5:10 PM", photos: 12, status: "Published", avatar: "/images/dogs/Nola/nola2.jpg", more: "+8" },
  { client: "Emily Davis", dog: "Buddy", date: "May 24, 2024", time: "11:45 AM", photos: 18, status: "Draft", avatar: "/images/dogs/lakta/lakta1.jpg", more: "+15" },
  { client: "Michael Brown", dog: "Charlie", date: "May 23, 2024", time: "3:20 PM", photos: 22, status: "Published", avatar: "/images/dogs/aslan/aslan.jpg", more: "+20" },
  { client: "Olivia Wilson", dog: "Milo, Zara", date: "May 22, 2024", time: "1:15 PM", photos: 9, status: "Draft", avatar: "/images/dogs/echostevie.jpg", more: "+7" },
  { client: "Daniel Taylor", dog: "Poppy", date: "May 21, 2024", time: "4:50 PM", photos: 13, status: "Published", avatar: "/images/dogs/rufus.jpg", more: "+11" },
  { client: "Sophia Anderson", dog: "Bella", date: "May 20, 2024", time: "2:05 PM", photos: 8, status: "Archived", avatar: "/images/dogs/leia1.jpg", more: "+6" },
  { client: "David Lee", dog: "Zara", date: "May 19, 2024", time: "10:30 AM", photos: 16, status: "Published", avatar: "/images/dogs/shadow.jpg", more: "+14" },
] as const;

function StatusBadge({ status }: { status: string }) {
  const classes = status === "Draft" ? "bg-orange-100 text-orange-700" : status === "Archived" ? "bg-slate-200 text-slate-600" : "bg-green-100 text-green-700";
  return <span className={`rounded-md px-3 py-1 text-xs font-medium ${classes}`}>{status}</span>;
}

function PhotoStrip({ more }: { more: string }) {
  return (
    <div className="flex w-72 gap-1">
      {galleryImages.slice(0, 4).map((src, index) => (
        <div key={`${src}-${index}`} className="relative h-14 flex-1 overflow-hidden rounded-md">
          <Image src={src} alt="Gallery preview" fill sizes="80px" className="object-cover" />
          {index === 3 && <span className="absolute inset-0 grid place-items-center bg-[#151124]/55 text-xs font-bold text-white">{more}</span>}
        </div>
      ))}
    </div>
  );
}

export function BackendPhotoUpdates() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div><h1 className="font-serif text-3xl">Photo Updates <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">Create and manage photo galleries for your clients.</p></div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />Create New Gallery <ChevronDown className="ml-6 inline size-4" /></button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, trend, note, icon: Icon, color }) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className={`grid size-14 place-items-center rounded-full ${color}`}><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className="mt-2 text-sm text-[#6d667a]">{note ? <><span className="text-emerald-600">↑ {trend}</span> {note}</> : trend}</p></div></div></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_20rem]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 xl:flex-row xl:items-center xl:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] xl:max-w-md"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search galleries by client or dog name..." /></label>
            <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Clients <ChevronDown className="ml-10 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Dogs <ChevronDown className="ml-10 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Statuses <ChevronDown className="ml-8 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Gallery", "Client & Dog", "Date Created", "Photos", "Status", "Actions"].map((h) => <th key={h} className="px-6 py-4">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#151124]/10">
                {rows.map((row) => <tr key={`${row.client}-${row.date}`}><td className="px-6 py-4"><PhotoStrip more={row.more} /></td><td className="px-6 py-4"><div className="flex items-center gap-4"><Image src={row.avatar} alt={`${row.client} avatar`} width={42} height={42} className="size-11 rounded-full object-cover" /><div><p className="font-semibold">{row.client}</p><p className="mt-1 text-[#6d667a]">{row.dog}</p></div></div></td><td className="px-6 py-4"><p>{row.date}</p><p className="mt-1 text-[#4f4863]">{row.time}</p></td><td className="px-6 py-4">{row.photos}</td><td className="px-6 py-4"><StatusBadge status={row.status} /></td><td className="px-6 py-4"><div className="flex gap-3"><button className="rounded-lg border border-[#151124]/10 p-2 text-[#4f2c91]" aria-label={`View ${row.client} gallery`}>{row.status === "Draft" ? <Pencil className="size-4" /> : <Eye className="size-4" />}</button><button className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]" aria-label={`More actions for ${row.client}`}><MoreVertical className="size-4" /></button></div></td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between"><p>Showing 1 to 8 of 48 galleries</p><div className="flex gap-2">{["‹", "1", "2", "3", "...", "6", "›"].map((p) => <button key={p} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${p === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{p}</button>)}</div></div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-5"><h2 className="font-serif text-xl">Gallery Overview</h2><div className="relative mt-4 h-36 overflow-hidden rounded-lg"><Image src="/images/dogs/walkaslan.jpg" alt="Happy Walks with Max" fill sizes="320px" className="object-cover" /><span className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-2 text-xs font-bold">+12</span></div><div className="mt-4 flex items-start justify-between gap-3"><div><p className="font-semibold">Happy Walks with Max</p><p className="mt-1 text-xs text-[#6d667a]">Created on May 25, 2024 at 2:30 PM</p></div><StatusBadge status="Published" /></div><div className="mt-4 flex gap-6 text-sm text-[#6d667a]"><span><ImageIcon className="mr-2 inline size-4" />16 Photos</span><span><Download className="mr-2 inline size-4" />2.4 MB</span></div><button className="mt-5 w-full rounded-lg bg-[#4f2c91] py-3 text-sm font-semibold text-white">View Gallery</button></Card>
          <Card className="p-5"><h2 className="font-serif text-xl">Client & Dog</h2><div className="mt-5 space-y-4"><div className="flex items-center gap-4"><Image src="/images/dogs/leia1.jpg" alt="Sarah Johnson" width={52} height={52} className="size-13 rounded-full object-cover" /><div><p className="font-semibold">Sarah Johnson</p><p className="text-sm text-[#6d667a]">sarah.j@email.com</p><p className="text-sm text-[#6d667a]">+353 87 123 4567</p></div></div><div className="flex items-center gap-4"><Image src="/images/dogs/kaiser.jpg" alt="Max" width={52} height={52} className="size-13 rounded-full object-cover" /><div><p className="font-semibold">Max</p><p className="text-sm text-[#6d667a]">Golden Retriever</p><p className="text-sm text-[#6d667a]">3 years old</p></div></div></div><button className="mt-5 w-full rounded-lg border border-[#151124]/10 bg-[#fbf9fd] py-3 text-sm font-semibold text-[#4f2c91]">View Profiles</button></Card>
          <Card className="p-5"><h2 className="font-serif text-xl">Recent Activity</h2><div className="mt-5 space-y-4 text-sm"><p><span className="mr-3 rounded-full bg-green-100 p-2 text-green-700">✓</span>Gallery published<br /><span className="ml-11 text-xs text-[#6d667a]">May 25, 2024 at 2:45 PM</span></p><p><span className="mr-3 rounded-full bg-[#f0e9fb] p-2 text-[#4f2c91]"><Upload className="inline size-4" /></span>14 photos uploaded<br /><span className="ml-11 text-xs text-[#6d667a]">May 25, 2024 at 2:30 PM</span></p><p><span className="mr-3 rounded-full bg-[#f0e9fb] p-2 text-[#4f2c91]">＋</span>Gallery created<br /><span className="ml-11 text-xs text-[#6d667a]">May 25, 2024 at 2:15 PM</span></p></div><button className="mt-5 w-full rounded-lg border border-[#151124]/10 bg-[#fbf9fd] py-3 text-sm font-semibold text-[#4f2c91]">View All Activity</button></Card>
        </aside>
      </div>
    </div>
  );
}
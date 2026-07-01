import { Bone, CalendarCheck, CalendarDays, ChevronDown, Clock3, Download, PawPrint, ReceiptText, Star, Users } from "lucide-react";
import Image from "next/image";

import { Card } from "./card";

const stats = [
  { label: "Total Bookings", value: "32", trend: "18%", icon: CalendarCheck, rating: false },
  { label: "New Clients", value: "8", trend: "14%", icon: Users, rating: false },
  { label: "Total Revenue", value: "€2,840", trend: "22%", icon: PawPrint, rating: false },
  { label: "Reviews", value: "4.9", trend: "(42)", icon: Star, rating: true },
] as const;

const bookings = [
  { dog: "Max", service: "Dog Walk", length: "60 min", time: "Today, 10:00 AM", status: "Confirmed", image: "/images/dogs/kaiser.jpg" },
  { dog: "Luna", service: "Training Session", length: "60 min", time: "Today, 01:00 PM", status: "Confirmed", image: "/images/dogs/Nola/Nola-1.jpg" },
  { dog: "Buddy", service: "Dog Walk", length: "30 min", time: "Tomorrow, 09:00 AM", status: "Pending", image: "/images/dogs/lakta.jpeg" },
  { dog: "Charlie", service: "Training Session", length: "60 min", time: "Tomorrow, 11:30 AM", status: "Confirmed", image: "/images/dogs/aslan/aslan.jpg" },
] as const;

const services = [
  ["Dog Walk", "18 bookings", "56%"],
  ["Training Session", "8 bookings", "25%"],
  ["Puppy Visit", "4 bookings", "12%"],
  ["Group Walk", "2 bookings", "7%"],
] as const;

const activities = [
  [CalendarDays, "New booking created", "Max · Dog Walk · 25 May, 10:00 AM", "2m ago"],
  [ReceiptText, "Payment received", "INV-2024-0056 · €120.00", "15m ago"],
  [Users, "New client registered", "Sarah Johnson", "1h ago"],
  [Star, "Review received", "From Sarah Johnson", "2h ago"],
] as const;


export function BackendDashboardOverview() {
  return (
    <div className="p-5 md:p-10">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div><h1 className="font-serif text-3xl">Dashboard <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">Here&apos;s what&apos;s happening with your business today.</p></div>
              <div className="flex flex-wrap gap-4"><button className="rounded-lg border border-[#151124]/10 bg-white px-6 py-3 text-sm font-medium shadow-sm">20 May – 26 May, 2024 <CalendarDays className="ml-4 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 bg-white px-6 py-3 text-sm font-semibold shadow-sm"><Download className="mr-3 inline size-4 text-[#5b2aa0]" />Export</button></div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_20rem]">
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map(({ label, value, trend, icon: Icon, rating }) => <Card key={label} className="p-5"><div className="flex items-center gap-5"><span className="grid size-14 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p></div></div><p className="mt-3 text-sm text-[#6d667a]">{rating ? <span className="text-amber-400">★★★★★ </span> : <span className="text-emerald-600">↑ {trend}</span>} {rating ? trend : "from last week"}</p></Card>)}
                </div>

                <Card className="p-6"><div className="flex justify-between"><h2 className="font-serif text-xl">Bookings Overview</h2><button className="rounded-lg border border-[#151124]/10 px-4 py-2 text-sm">This Week <ChevronDown className="ml-3 inline size-4" /></button></div><div className="mt-8 h-64"><svg viewBox="0 0 820 250" className="h-full w-full"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7c3ab6" stopOpacity="0.18"/><stop offset="1" stopColor="#7c3ab6" stopOpacity="0"/></linearGradient></defs>{[40,90,140,190].map((y)=><line key={y} x1="0" x2="820" y1={y} y2={y} stroke="#ded9e8" strokeDasharray="5 7"/>)}<path d="M40 150 C150 105 185 105 260 130 S390 90 470 110 S590 150 700 145 S780 160 810 178 L810 220 L40 220 Z" fill="url(#area)"/><path d="M40 150 C150 105 185 105 260 130 S390 90 470 110 S590 150 700 145 S780 160 810 178" fill="none" stroke="#5630a2" strokeWidth="3"/><g fill="#5630a2">{[[40,150],[180,108],[300,128],[420,104],[540,137],[665,144],[810,178]].map(([x,y])=><circle key={`${x}`} cx={x} cy={y} r="5"/> )}</g><g fill="#6d667a" fontSize="13"><text x="20" y="222">0</text><text x="20" y="174">10</text><text x="20" y="124">20</text><text x="20" y="74">30</text><text x="20" y="28">40</text><text x="20" y="244">Mon 20</text><text x="160" y="244">Tue 21</text><text x="290" y="244">Wed 22</text><text x="420" y="244">Thu 23</text><text x="540" y="244">Fri 24</text><text x="665" y="244">Sat 25</text><text x="780" y="244">Sun 26</text></g></svg></div></Card>

                <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr]"><Card className="p-6"><div className="flex justify-between"><h2 className="font-serif text-xl">Top Services</h2><button className="rounded-lg border border-[#151124]/10 px-4 py-2 text-sm">This Week <ChevronDown className="ml-3 inline size-4" /></button></div><div className="mt-6 space-y-5">{services.map(([name,count,pct])=><div key={name} className="grid grid-cols-[2.5rem_1fr_4rem] items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Bone className="size-4"/></span><div><p className="font-medium">{name}</p><p className="text-sm text-[#6d667a]">{count}</p></div><div className="text-right text-sm text-[#6d667a]">{pct}</div><div className="col-span-2 col-start-2 h-1.5 rounded-full bg-[#eeeaf3]"><div className="h-full rounded-full bg-[#5630a2]" style={{width:pct}}/></div></div>)}</div></Card><Card className="p-6"><div className="flex justify-between"><h2 className="font-serif text-xl">Revenue</h2><button className="rounded-lg border border-[#151124]/10 px-4 py-2 text-sm">This Week <ChevronDown className="ml-3 inline size-4" /></button></div><div className="mt-5 grid gap-5 sm:grid-cols-[12rem_1fr] sm:items-center"><div className="relative grid size-44 place-items-center rounded-full bg-[conic-gradient(#4b2393_0_59%,#8f70d6_59%_89%,#b9a2ee_89%_96%,#ded2f8_96%_100%)]"><div className="size-20 rounded-full bg-white"/></div><div><p className="font-serif text-3xl">€2,840 <span className="text-sm font-sans text-emerald-600">↑ 22% from last week</span></p><div className="mt-6 space-y-4 text-sm">{[["Dog Walk","€1,680 (59%)"],["Training","€840 (30%)"],["Puppy Visit","€200 (7%)"],["Other","€120 (4%)"]].map((r,i)=><p key={r[0]} className="flex justify-between gap-4 text-[#6d667a]"><span><span className={`mr-3 inline-block size-3 rounded-full ${["bg-[#4b2393]","bg-[#8f70d6]","bg-[#b9a2ee]","bg-[#ded2f8]"][i]}`}/>{r[0]}</span><span>{r[1]}</span></p>)}</div></div></div></Card></div>
              </div>

              <aside className="space-y-5"><Card className="p-5"><div className="flex justify-between"><h2 className="font-serif text-xl">Upcoming Bookings</h2><a className="text-sm font-semibold text-[#5b2aa0]">View all</a></div><div className="mt-5 space-y-5">{bookings.map((booking)=><div key={booking.dog} className="grid grid-cols-[3rem_1fr_auto] gap-3"><Image src={booking.image} alt={booking.dog} width={48} height={48} className="size-12 rounded-full object-cover"/><div><p className="font-semibold">{booking.dog}</p><p className="text-sm text-[#6d667a]">{booking.service} · {booking.length}</p><p className="mt-1 text-xs text-[#6d667a]"><Clock3 className="mr-1 inline size-3" />{booking.time}</p></div><span className={`h-fit rounded-full px-2 py-1 text-xs ${booking.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{booking.status}</span></div>)}</div><button className="mt-5 w-full border-t border-[#151124]/10 pt-5 text-sm font-semibold text-[#5b2aa0]"><CalendarDays className="mr-2 inline size-4"/>View calendar</button></Card><Card className="p-5"><h2 className="font-serif text-xl">Recent Activity</h2><div className="mt-5 space-y-5">{activities.map(([Icon,title,copy,time])=><div key={title} className="grid grid-cols-[2.5rem_1fr_auto] gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-4"/></span><div><p className="font-semibold text-sm">{title}</p><p className="mt-1 text-xs text-[#6d667a]">{copy}</p></div><span className="text-xs text-[#6d667a]">{time}</span></div>)}</div><button className="mt-5 w-full border-t border-[#151124]/10 pt-5 text-sm font-semibold text-[#5b2aa0]">View all activity</button></Card></aside>
            </div>
          </div>

  );
}
import { CalendarDays, CheckCircle2, ChevronDown, Clock3, Filter, GraduationCap, MoreVertical, PawPrint, Plus, Search, XCircle } from "lucide-react";
import Image from "next/image";

import { Card } from "./card";

const bookingStats = [
  { label: "Total Bookings", value: "32", trend: "18%", direction: "up", icon: CalendarDays },
  { label: "Pending", value: "5", trend: "8%", direction: "down", icon: Clock3 },
  { label: "Confirmed", value: "23", trend: "22%", direction: "up", icon: CheckCircle2 },
  { label: "Cancelled", value: "4", trend: "13%", direction: "down", icon: XCircle },
] as const;

const bookingRows = [
  { id: "#BKG-00032", created: "May 25, 2024", client: "Sarah Johnson", dog: "Max (Golden Retriever)", service: "Dog Walk", detail: "Solo Walk", date: "Today, May 25", time: "10:00 AM", duration: "60 min", status: "Confirmed", image: "/images/dogs/kaiser.jpg" },
  { id: "#BKG-00031", created: "May 24, 2024", client: "James Smith", dog: "Luna (Labrador)", service: "Training Session", detail: "Basic Obedience", date: "Today, May 25", time: "1:00 PM", duration: "60 min", status: "Confirmed", image: "/images/dogs/Nola/Nola-1.jpg" },
  { id: "#BKG-00030", created: "May 24, 2024", client: "Emily Davis", dog: "Buddy (Beagle)", service: "Dog Walk", detail: "Solo Walk", date: "Tomorrow, May 26", time: "9:00 AM", duration: "30 min", status: "Pending", image: "/images/dogs/lakta.jpeg" },
  { id: "#BKG-00029", created: "May 23, 2024", client: "Michael Brown", dog: "Charlie (Goldendoodle)", service: "Training Session", detail: "Puppy Training", date: "Tomorrow, May 26", time: "11:30 AM", duration: "60 min", status: "Confirmed", image: "/images/dogs/aslan/aslan.jpg" },
  { id: "#BKG-00028", created: "May 22, 2024", client: "Olivia Wilson", dog: "Milo (Husky)", service: "Dog Walk", detail: "Group Walk", date: "May 27, 2024", time: "4:00 PM", duration: "60 min", status: "Confirmed", image: "/images/dogs/echo.jpg" },
  { id: "#BKG-00027", created: "May 22, 2024", client: "Daniel Taylor", dog: "Poppy (Pug)", service: "Dog Walk", detail: "Solo Walk", date: "May 27, 2024", time: "10:00 AM", duration: "30 min", status: "Cancelled", image: "/images/dogs/rufus.jpg" },
  { id: "#BKG-00026", created: "May 21, 2024", client: "Sophia Anderson", dog: "Bella (Cavalier King Charles)", service: "Dog Walk", detail: "Solo Walk", date: "May 28, 2024", time: "2:00 PM", duration: "60 min", status: "Pending", image: "/images/dogs/ollie/ollie1.jpeg" },
] as const;

export function BackendBookings() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div><h1 className="font-serif text-3xl">Bookings <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">View and manage all your bookings.</p></div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />New Booking</button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {bookingStats.map(({ label, value, trend, direction, icon: Icon }) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className="grid size-14 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className="mt-2 text-sm text-[#6d667a]"><span className={direction === "up" ? "text-emerald-600" : "text-orange-600"}>{direction === "up" ? "↑" : "↓"} {trend}</span> from last week</p></div></div></Card>
        ))}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] lg:max-w-md"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search by client, dog name, or service..." /></label>
          <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Status <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">20 May – 26 May, 2024 <CalendarDays className="ml-5 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Services <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Booking ↕", "Client & Dog", "Service", "Date & Time", "Duration", "Status", "Amount", ""].map((h)=><th key={h} className="px-7 py-4">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-[#151124]/10">
              {bookingRows.map((booking) => (
                <tr key={booking.id} className="bg-white align-middle">
                  <td className="px-7 py-4"><p className="font-semibold">{booking.id}</p><p className="mt-1 text-[#6d667a]">{booking.created}</p></td>
                  <td className="px-7 py-4"><div className="flex items-center gap-4"><Image src={booking.image} alt={`${booking.dog} profile`} width={42} height={42} className="size-11 rounded-full object-cover" /><div><p className="font-semibold">{booking.client}</p><p className="mt-1 text-[#6d667a]">{booking.dog}</p></div></div></td>
                  <td className="px-7 py-4"><div className="flex items-center gap-4"><span className="text-[#5b2aa0]">{booking.service === "Training Session" ? <GraduationCap className="size-5" /> : <PawPrint className="size-5" />}</span><div><p className="font-semibold">{booking.service}</p><p className="mt-1 text-[#6d667a]">{booking.detail}</p></div></div></td>
                  <td className="px-7 py-4"><p>{booking.date}</p><p className="mt-1 text-[#4f4863]">{booking.time}</p></td>
                  <td className="px-7 py-4">{booking.duration}</td>
                  <td className="px-7 py-4"><span className={`rounded-md px-3 py-1 text-xs font-medium ${booking.status === "Pending" ? "bg-amber-100 text-amber-700" : booking.status === "Cancelled" ? "bg-rose-100 text-rose-700" : "bg-green-100 text-green-700"}`}>{booking.status}</span></td>
                  <td className="px-7 py-4 text-[#6d667a]">—</td>
                  <td className="px-7 py-4"><button aria-label={`Actions for ${booking.id}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between">
          <p>Showing 1 to 7 of 32 bookings</p><div className="flex gap-2">{["←", "1", "2", "3", "4", "...", "5", "→"].map((p)=><button key={p} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${p === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{p}</button>)}</div>
        </div>
      </Card>
    </div>
  );
}
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Heart,
  Home,
  PawPrint,
  Plus,
} from "lucide-react";

import { Card } from "./card";

const stats = [
  { label: "Total Bookings", value: "32", trend: "18%", direction: "up", icon: CalendarDays },
  { label: "Dog Walks", value: "18", trend: "12%", direction: "up", icon: PawPrint },
  { label: "Training Sessions", value: "8", trend: "33%", direction: "up", icon: GraduationCap },
  { label: "Other Services", value: "6", trend: "10%", direction: "down", icon: Home },
] as const;

const days = ["Mon 20", "Tue 21", "Wed 22", "Thu 23", "Fri 24", "Sat 25", "Sun 26"];
const hours = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

const serviceStyles = {
  walk: { icon: PawPrint, bg: "bg-[#eee7fb]", text: "text-[#44208b]", label: "Dog Walk" },
  training: { icon: GraduationCap, bg: "bg-[#eaf7ec]", text: "text-[#176333]", label: "Training Session" },
  puppy: { icon: Heart, bg: "bg-[#fff1d9]", text: "text-[#9a5a00]", label: "Puppy Visit" },
  group: { icon: PawPrint, bg: "bg-[#fde9e7]", text: "text-[#8d332b]", label: "Group Walk" },
} as const;

type CalendarEvent = {
  day: number;
  row: number;
  span?: number;
  type: keyof typeof serviceStyles;
  dog: string;
  meta?: string;
  time: string;
};

const events: CalendarEvent[] = [
  { day: 0, row: 0, type: "walk", dog: "Max", time: "8:00 - 9:00 AM" },
  { day: 0, row: 2, type: "training", dog: "Luna", time: "10:00 - 11:00 AM" },
  { day: 0, row: 5, type: "walk", dog: "Buddy", time: "1:00 - 2:00 PM" },
  { day: 0, row: 8, type: "puppy", dog: "Charlie", time: "4:00 - 4:45 PM" },
  { day: 1, row: 1, type: "group", dog: "4 Dogs", time: "9:00 - 10:00 AM" },
  { day: 1, row: 3, type: "walk", dog: "Charlie", time: "11:00 AM - 12:00 PM" },
  { day: 1, row: 6, type: "walk", dog: "Milo", time: "2:00 - 3:00 PM" },
  { day: 1, row: 9, type: "training", dog: "Buddy", time: "5:00 - 6:00 PM" },
  { day: 2, row: 0, type: "walk", dog: "Bella", time: "8:00 - 9:00 AM" },
  { day: 2, row: 2, type: "training", dog: "Max", time: "10:00 - 11:00 AM" },
  { day: 2, row: 4, type: "puppy", dog: "Poppy", time: "12:00 - 12:45 PM" },
  { day: 2, row: 7, type: "walk", dog: "Zara", time: "3:00 - 4:00 PM" },
  { day: 3, row: 1, type: "walk", dog: "Luna", time: "9:00 - 10:00 AM" },
  { day: 3, row: 3, type: "training", dog: "Milo", time: "11:00 AM - 12:00 PM" },
  { day: 3, row: 6, type: "walk", dog: "Buddy", time: "2:00 - 3:00 PM" },
  { day: 3, row: 9, type: "group", dog: "5 Dogs", time: "5:00 - 6:00 PM" },
  { day: 4, row: 0, type: "walk", dog: "Charlie", time: "8:00 - 9:00 AM" },
  { day: 4, row: 5, type: "training", dog: "Bella", time: "1:00 - 2:00 PM" },
  { day: 4, row: 8, type: "walk", dog: "Poppy", time: "4:00 - 5:00 PM" },
  { day: 5, row: 1, type: "puppy", dog: "Max", time: "9:00 - 9:45 AM" },
  { day: 5, row: 3, type: "group", dog: "6 Dogs", time: "11:00 AM - 12:00 PM" },
  { day: 5, row: 7, type: "walk", dog: "Milo", time: "3:00 - 4:00 PM" },
  { day: 6, row: 2, type: "walk", dog: "Buddy", time: "10:00 - 11:00 AM" },
  { day: 6, row: 5, type: "training", dog: "Zara", time: "1:00 - 2:00 PM" },
];

const miniCalendar = [
  ["", "", "1", "2", "3", "4", "5"],
  ["6", "7", "8", "9", "10", "12", "12"],
  ["13", "14", "15", "16", "17", "18", "20"],
  ["20", "21", "22", "23", "24", "25", "26"],
  ["27", "28", "29", "30", "31", "1", "2"],
];

function EventCard({ event }: { event: CalendarEvent }) {
  const style = serviceStyles[event.type];
  const Icon = style.icon;

  return (
    <div className={`m-1 rounded-lg p-3 text-xs shadow-sm ${style.bg} ${style.text}`}>
      <div className="flex items-center gap-2 font-bold"><Icon className="size-4" />{style.label}</div>
      <p className="mt-2 font-medium text-[#151124]">{event.dog}</p>
      <p className="mt-1 text-[#151124]">{event.time}</p>
    </div>
  );
}

export function BackendCalendar() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div><h1 className="font-serif text-3xl">Calendar <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">View and manage your schedule.</p></div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <button className="rounded-lg border border-[#151124]/10 bg-white px-5 py-3 font-semibold">Today</button>
          <button className="grid size-11 place-items-center rounded-lg border border-[#151124]/10 bg-white"><ChevronLeft className="size-4" /></button>
          <button className="grid size-11 place-items-center rounded-lg border border-[#151124]/10 bg-white"><ChevronRight className="size-4" /></button>
          <button className="rounded-lg border border-[#151124]/10 bg-white px-5 py-3 font-semibold">May 20 - May 26, 2024 <ChevronDown className="ml-3 inline size-4" /></button>
          <div className="overflow-hidden rounded-lg border border-[#151124]/10 bg-white"><button className="bg-[#f3effb] px-5 py-3 font-semibold text-[#4f2c91]">Week</button><button className="px-5 py-3">Day</button><button className="px-5 py-3">Agenda</button></div>
          <button className="rounded-lg bg-[#4f2c91] px-6 py-3 font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />New Booking <ChevronDown className="ml-5 inline size-4" /></button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, trend, direction, icon: Icon }) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className="grid size-14 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className="mt-2 text-sm text-[#6d667a]"><span className={direction === "up" ? "text-emerald-600" : "text-red-600"}>{direction === "up" ? "↑" : "↓"} {trend}</span> from last week</p></div></div></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_20rem]">
        <Card className="overflow-x-auto">
          <div className="grid min-w-[980px] grid-cols-[4.5rem_repeat(7,minmax(8rem,1fr))] border-b border-[#151124]/10 text-sm font-semibold">
            <div className="border-r border-[#151124]/10 p-4" />
            {days.map((day) => <div key={day} className="border-r border-[#151124]/10 p-4 text-center last:border-r-0">{day === "Wed 22" ? <>Wed <span className="rounded-full bg-[#4f2c91] px-2 py-1 text-white">22</span></> : day}</div>)}
          </div>
          <div className="grid min-w-[980px] grid-cols-[4.5rem_repeat(7,minmax(8rem,1fr))]">
            <div className="border-r border-[#151124]/10"><div className="h-11 border-b border-[#151124]/10 px-4 py-3 text-xs text-[#4f4863]">All day</div>{hours.map((hour) => <div key={hour} className="h-[4.5rem] border-b border-[#151124]/10 px-3 py-3 text-xs text-[#4f4863]">{hour}</div>)}</div>
            {days.map((day, dayIndex) => (
              <div key={day} className="relative border-r border-[#151124]/10 last:border-r-0">
                <div className="h-11 border-b border-[#151124]/10" />
                {hours.map((hour) => <div key={hour} className="h-[4.5rem] border-b border-[#151124]/10" />)}
                {events.filter((event) => event.day === dayIndex).map((event) => (
                  <div key={`${event.day}-${event.row}-${event.dog}`} className="absolute left-0 right-0" style={{ top: `${44 + event.row * 72}px` }}><EventCard event={event} /></div>
                ))}
                {dayIndex === 0 && <div className="absolute left-0 right-0 top-[282px] h-px bg-rose-400"><span className="absolute -left-[4.2rem] -top-2 text-xs text-rose-500">11:30 AM</span><span className="absolute -left-1 -top-1 size-2 rounded-full bg-rose-500" /></div>}
              </div>
            ))}
          </div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-serif text-xl">May 2024</h2><div className="flex gap-3"><ChevronLeft className="size-4" /><ChevronRight className="size-4" /></div></div><div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#4f4863]">{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => <span key={d}>{d}</span>)}</div><div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">{miniCalendar.flat().map((d, i) => <span key={`${d}-${i}`} className={`rounded-full py-1 ${d === "22" ? "bg-[#4f2c91] text-white" : ["20", "21", "23", "24", "25", "26"].includes(d) ? "bg-[#f0e9fb] text-[#4f2c91]" : d === "" ? "text-transparent" : ""}`}>{d || "0"}</span>)}</div></Card>
          <Card className="p-5"><div className="mb-4 flex justify-between"><h2 className="font-serif text-lg">Filters</h2><button className="text-xs font-semibold text-[#4f2c91]">Clear all</button></div><div className="space-y-3">{["All Services", "All Walkers / Trainers", "All Dogs", "All Locations"].map((filter) => <button key={filter} className="flex w-full items-center justify-between rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#4f4863]">{filter}<ChevronDown className="size-4" /></button>)}{["Confirmed", "Pending", "Cancelled"].map((status) => <label key={status} className="flex items-center gap-3 text-sm"><input type="checkbox" defaultChecked /> <span className="size-3 rounded-full bg-[#6fcf97]" />{status}</label>)}</div></Card>
          <Card className="overflow-hidden"><div className="flex items-center justify-between p-5"><h2 className="font-serif text-lg">Upcoming Today</h2><button className="text-xs font-semibold text-[#4f2c91]">View all</button></div>{[["12:00 PM", "Puppy Visit", "Poppy", "Pending"], ["1:00 PM", "Training Session", "Bella", "Confirmed"], ["3:00 PM", "Dog Walk", "Zara", "Confirmed"]].map(([time, service, dog, status]) => <div key={time} className="flex items-center gap-4 px-5 py-3"><span className="rounded-lg bg-[#f0e9fb] px-3 py-2 text-center text-xs font-semibold text-[#4f2c91]">{time}</span><div className="flex-1"><p className="text-sm font-semibold">{service}</p><p className="text-xs text-[#6d667a]">{dog}</p></div><span className={`rounded-md px-2 py-1 text-xs ${status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{status}</span></div>)}<div className="border-t border-[#151124]/10 p-4"><button className="w-full rounded-lg border border-[#151124]/10 py-3 text-sm font-semibold text-[#4f2c91]"><CalendarDays className="mr-2 inline size-4" />View full agenda</button></div></Card>
        </aside>
      </div>
    </div>
  );
}
import { Cake, CalendarDays, CheckCircle2, ChevronDown, Dog, Edit3, Filter, Mail, Mars, MoreVertical, PawPrint, Phone, Plus, Search, StickyNote, UserRound, Venus, Weight, X } from "lucide-react";
import Image from "next/image";

import { Card } from "./card";

const dogStats = [
    { label: "Total Dogs", value: "46", detail: "Across all cleints", icon: Dog, tone: "purple" },
    { label: "Active Dogs", value: "42", detail: "91% of total", icon: CheckCircle2, tone: "green" },
    { label: "With Upcoming Bookings", value: "28", detail: "This week", icon: CalendarDays, tone: "orange" },
    { label: "Birthdays This Month", value: "3", detail: "May birthdays", icon: Cake, tone: "violet" },
] as const;

const toneClasses = {
  purple: "bg-[#f0e9fb] text-[#5b2aa0]",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-600",
  violet: "bg-[#f2eafd] text-[#5b2aa0]",
} as const;

const dogRows = [
  { name: "Max", gender: "male", owner: "Sarah Johnson", phone: "+353 87 123 4567", breed: "Golden Retriever", age: "3 years", status: "Active", lastDate: "May 25, 2024", lastService: "Dog Walk", notes: 2, image: "/images/dogs/kaiser.jpg" },
  { name: "Luna", gender: "female", owner: "James Smith", phone: "+353 86 987 6543", breed: "Labrador Retriever", age: "2 years", status: "Active", lastDate: "May 25, 2024", lastService: "Training Session", notes: 1, image: "/images/dogs/Nola/Nola-1.jpg" },
  { name: "Buddy", gender: "male", owner: "Emily Davis", phone: "+353 85 555 1122", breed: "Beagle", age: "4 years", status: "Active", lastDate: "May 26, 2024", lastService: "Dog Walk", notes: 0, image: "/images/dogs/lakta.jpeg" },
  { name: "Charlie", gender: "male", owner: "Michael Brown", phone: "+353 87 222 3344", breed: "Goldendoodle", age: "1 year", status: "Active", lastDate: "May 26, 2024", lastService: "Training Session", notes: 2, image: "/images/dogs/aslan/aslan.jpg" },
  { name: "Milo", gender: "male", owner: "Olivia Wilson", phone: "+353 86 333 6677", breed: "Siberian Husky", age: "3 years", status: "Active", lastDate: "May 27, 2024", lastService: "Group Walk", notes: 1, image: "/images/dogs/echo.jpg" },
  { name: "Poppy", gender: "female", owner: "Daniel Taylor", phone: "+353 87 444 7788", breed: "Pug", age: "5 years", status: "Active", lastDate: "May 27, 2024", lastService: "Dog Walk", notes: 0, image: "/images/dogs/rufus.jpg" },
  { name: "Bella", gender: "female", owner: "Sophia Anderson", phone: "+353 85 666 8899", breed: "Cavalier King Charles", age: "2 years", status: "Active", lastDate: "May 28, 2024", lastService: "Puppy Visit", notes: 1, image: "/images/dogs/ollie/ollie1.jpeg" },
  { name: "Zara", gender: "female", owner: "David Lee", phone: "+353 86 777 9900", breed: "Border Collie", age: "4 years", status: "Inactive", lastDate: "May 10, 2024", lastService: "Training Session", notes: 0, image: "/images/dogs/shadow.jpg" },
] as const;

const selectedDog = dogRows[0];

export function BackendDogs() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div><h1 className="font-serif text-3xl">Dogs <PawPrint className="inline size-6 text-[#6c38c2]" /></h1><p className="mt-1 text-sm text-[#6d667a]">View and manage all dogs in your care.</p></div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />Add New Dog</button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dogStats.map(({ label, value, detail, icon: Icon, tone }) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className={`grid size-14 place-items-center rounded-full ${toneClasses[tone]}`}><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className="mt-2 text-sm text-[#6d667a]">{detail}</p></div></div></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 2xl:grid-cols-[1fr_23rem]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] lg:max-w-lg"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search dogs by name, breed, or owner..." /></label>
            <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Statuses <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Breeds <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Dog", "Owner", "Breed", "Age", "Status", "Last Service", "Notes", ""].map((h)=><th key={h} className="px-5 py-4">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#151124]/10">
                {dogRows.map((dog) => (
                  <tr key={dog.name} className="bg-white align-middle">
                    <td className="px-5 py-4"><div className="flex items-center gap-4"><Image src={dog.image} alt={`${dog.name} profile`} width={44} height={44} className="size-11 rounded-full object-cover" /><p className="font-semibold">{dog.name} {dog.gender === "male" ? <Mars className="inline size-4 text-blue-500" /> : <Venus className="inline size-4 text-pink-500" />}</p></div></td>
                    <td className="px-5 py-4"><p className="font-semibold">{dog.owner}</p><p className="mt-1 text-[#6d667a]">{dog.phone}</p></td>
                    <td className="px-5 py-4">{dog.breed}</td><td className="px-5 py-4">{dog.age}</td>
                    <td className="px-5 py-4"><span className={`rounded-md px-3 py-1 text-xs font-medium ${dog.status === "Active" ? "bg-green-100 text-green-700" : "bg-zinc-200 text-zinc-600"}`}>{dog.status}</span></td>
                    <td className="px-5 py-4"><p>{dog.lastDate}</p><p className="mt-1 text-[#6d667a]">{dog.lastService}</p></td>
                    <td className="px-5 py-4"><StickyNote className="mr-1 inline size-4 text-[#4f4863]" />{dog.notes}</td>
                    <td className="px-5 py-4"><button aria-label={`Actions for ${dog.name}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#151124]/10 p-5 text-sm text-[#6d667a] sm:flex-row sm:items-center sm:justify-between"><p>Showing 1 to 8 of 46 dogs</p><div className="flex gap-2">{["←", "1", "2", "3", "...", "6", "→"].map((p)=><button key={p} className={`grid size-9 place-items-center rounded-md border border-[#151124]/10 ${p === "1" ? "border-[#5b2aa0] text-[#5b2aa0]" : "text-[#4f4863]"}`}>{p}</button>)}</div></div>
        </Card>

        <Card className="overflow-hidden p-5">
          <div className="flex justify-end"><X className="size-5 text-[#4f4863]" /></div>
          <div className="flex items-center gap-4"><Image src={selectedDog.image} alt="Max profile" width={74} height={74} className="size-[74px] rounded-full object-cover" /><div><h2 className="font-serif text-2xl">Max <Mars className="inline size-4 text-blue-500" /></h2><p className="text-sm text-[#6d667a]">Golden Retriever</p><span className="mt-2 inline-block rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Active</span></div></div>
          <div className="mt-8 flex border-b border-[#151124]/10 text-sm font-semibold text-[#4f4863]"><button className="border-b-2 border-[#5b2aa0] px-4 pb-3 text-[#5b2aa0]">Overview</button><button className="px-4 pb-3">Info</button><button className="px-4 pb-3">History</button><button className="px-4 pb-3">Notes</button></div>
          <div className="mt-5 space-y-5 text-sm">
            {[ [UserRound, "Owner", "Sarah Johnson"], [Phone, "Phone", "+353 87 123 4567"], [Mail, "Email", "sarah.j@email.com"], [Cake, "Age", "3 years (Born May 12, 2021)"], [Weight, "Weight", "30 kg"], [CalendarDays, "Last Service", "May 25, 2024\nDog Walk"], [CalendarDays, "Upcoming Booking", "May 30, 2024\nGroup Walk"], [StickyNote, "Notes", "Gets excited around other dogs. Loves tennis balls!"] ].map(([Icon, label, value]) => <div key={String(label)} className="grid grid-cols-[1.2rem_5rem_1fr] gap-3 text-[#4f4863]"><Icon className="size-4 text-[#6c38c2]" /><span>{label as string}</span><span className="whitespace-pre-line text-[#4f4863]">{value as string}</span></div>)}
          </div>
          <button className="mt-7 w-full rounded-lg bg-[#4f2c91] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25">View Dog Profile →</button>
          <button className="mt-3 w-full rounded-lg border border-[#151124]/10 px-5 py-3 text-sm font-semibold text-[#4f4863]"><Edit3 className="mr-2 inline size-4" />Edit Dog Info</button>
        </Card>
      </div>
    </div>
  );
}
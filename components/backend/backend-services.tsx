import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  GraduationCap,
  Heart,
  Home,
  MoreVertical,
  Package,
  PawPrint,
  Plus,
  Search,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";

import { Card } from "./card";

const serviceStats = [
  { label: "Total Services", value: "7", detail: "Active services", icon: Package },
  { label: "Active Services", value: "7", detail: "100% of total", icon: CheckCircle2 },
  { label: "Popular Service", value: "Dog Walk", detail: "56% of bookings", icon: Tag },
  { label: "Avg. Duration", value: "53 min", detail: "Across all services", icon: Clock3 },
] as const;

const serviceRows = [
  { name: "Dog Walk", description: "Solo or group walks tailored to your dog's needs.", category: "Walks", duration: "30 / 60 min", price: "€20 / €30", bookings: "56", icon: PawPrint },
  { name: "Training Session", description: "One-on-one training to build obedience and good habits.", category: "Training", duration: "60 min", price: "€45", bookings: "34", icon: GraduationCap },
  { name: "Puppy Training", description: "Positive start for puppies. Basic skills and socialization.", category: "Training", duration: "45 min", price: "€35", bookings: "18", icon: DogFace },
  { name: "Group Walk", description: "Fun group walks for well-socialized dogs.", category: "Walks", duration: "60 min", price: "€25", bookings: "27", icon: Users },
  { name: "Dog Sitting", description: "In-home care and company while you're away.", category: "Care", duration: "Per Day", price: "€50", bookings: "12", icon: Home },
  { name: "Puppy Visit", description: "Short visit for play, potty break, and attention.", category: "Care", duration: "30 min", price: "€18", bookings: "15", icon: Clock3 },
  { name: "Basic Grooming", description: "Bath, brush, nail trim and freshen up.", category: "Care", duration: "60 min", price: "€40", bookings: "9", icon: Sparkles },
] as const;

const categories = [
  { name: "Walks", count: "2 services", icon: PawPrint, className: "bg-[#f0e9fb] text-[#5b2aa0]" },
  { name: "Training", count: "3 services", icon: GraduationCap, className: "bg-emerald-100 text-emerald-700" },
  { name: "Care", count: "2 services", icon: Heart, className: "bg-orange-100 text-orange-600" },
] as const;

const categoryStyles = {
  Walks: "bg-[#eee7fb] text-[#5b2aa0]",
  Training: "bg-emerald-100 text-emerald-700",
  Care: "bg-orange-100 text-orange-600",
} as const;

function DogFace({ className }: { className?: string }) {
  return <span className={className}>🐶</span>;
}

export function BackendServices() {
  return (
    <div className="p-5 md:p-10">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="font-serif text-3xl">Services <PawPrint className="inline size-6 text-[#6c38c2]" /></h1>
          <p className="mt-1 text-sm text-[#6d667a]">Manage the services you offer to your clients.</p>
        </div>
        <button className="rounded-lg bg-[#4f2c91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25"><Plus className="mr-2 inline size-4" />New Service</button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {serviceStats.map(({ label, value, detail, icon: Icon }) => (
          <Card key={label} className="p-6"><div className="flex items-center gap-6"><span className="grid size-14 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-7" /></span><div><p className="text-sm text-[#6d667a]">{label}</p><p className="mt-1 font-serif text-3xl">{value}</p><p className="mt-2 text-sm text-[#6d667a]">{detail}</p></div></div></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_18rem]">
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-[#151124]/10 p-5 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#151124]/10 px-4 py-3 text-sm text-[#858093] lg:max-w-xl"><Search className="size-5" /><input className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search services by name or description..." /></label>
            <div className="flex flex-wrap gap-3"><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Categories <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm">All Statuses <ChevronDown className="ml-6 inline size-4" /></button><button className="rounded-lg border border-[#151124]/10 px-5 py-3 text-sm"><Filter className="mr-2 inline size-4" />Filters</button></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="bg-[#fbf9fd] text-xs font-semibold text-[#4f2c91]"><tr>{["Service", "Category", "Duration", "Price", "Bookings", "Status", "↕", ""].map((h)=><th key={h} className="px-7 py-4">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-[#151124]/10">
                {serviceRows.map(({ name, description, category, duration, price, bookings, icon: Icon }) => (
                  <tr key={name} className="bg-white align-middle">
                    <td className="px-7 py-4"><div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-full bg-[#f0e9fb] text-[#5b2aa0]"><Icon className="size-6" /></span><div><p className="font-semibold">{name}</p><p className="mt-1 max-w-64 text-[#6d667a]">{description}</p></div></div></td>
                    <td className="px-7 py-4"><span className={`rounded-md px-3 py-1 text-xs font-medium ${categoryStyles[category]}`}>{category}</span></td>
                    <td className="px-7 py-4">{duration}</td>
                    <td className="px-7 py-4 font-semibold">{price}</td>
                    <td className="px-7 py-4 text-center"><p>{bookings}</p><p className="text-[#6d667a]">(This month)</p></td>
                    <td className="px-7 py-4"><span className="inline-flex items-center gap-2"><span className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#4f2c91]"><span className="absolute right-1 size-3 rounded-full bg-white" /></span>Active</span></td>
                    <td className="px-7 py-4" />
                    <td className="px-7 py-4"><button aria-label={`Actions for ${name}`} className="rounded-lg border border-[#151124]/10 p-2 text-[#4f4863]"><MoreVertical className="size-5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <aside className="space-y-5">
          <Card className="p-6"><div className="mb-6 flex items-center justify-between"><h2 className="font-serif text-xl">Categories</h2><button className="text-sm font-semibold text-[#5b2aa0]">Manage</button></div><div className="space-y-5">{categories.map(({ name, count, icon: Icon, className }) => <div key={name} className="flex items-center gap-4"><span className={`grid size-12 place-items-center rounded-full ${className}`}><Icon className="size-6" /></span><div><p className="font-semibold">{name}</p><p className="mt-1 text-sm text-[#6d667a]">{count}</p></div></div>)}</div></Card>
          <Card className="overflow-hidden bg-gradient-to-b from-[#f0e9fb] to-[#fff8df] p-6"><h2 className="font-serif text-xl">Boost your services 🚀</h2><p className="mt-4 text-sm leading-6 text-[#6d667a]">Highlight your top services and attract more clients.</p><button className="mt-5 rounded-lg bg-[#4f2c91] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4f2c91]/25">Promote Services</button><div className="relative mt-4 h-36"><Image src="/images/dogs/kaiser.jpg" alt="Happy dog promotion" fill className="rounded-xl object-cover object-center opacity-90" /></div></Card>
        </aside>
      </div>
    </div>
  );
}
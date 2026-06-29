import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  CircleHelp,
  FileText,
  Heart,
  Home,
  ImageIcon,
  LogOut,
  MapPin,
  Package,
  PawPrint,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/site/layout/header";

const navItems = [
  [Home, "Dashboard"],
  [CalendarDays, "My Bookings"],
  [ImageIcon, "Photo Updates"],
  [ShoppingBag, "Products & Care"],
  [FileText, "Invoices"],
  [User, "Profile"],
  [CircleHelp, "FAQ"],
] as const;

const journey = [
  [Check, "Booking", "Confirmed", true],
  [Heart, "Care plan", "In progress", true],
  [Camera, "Adventure day", "12 July 2026", false],
  [ImageIcon, "Updates", "Coming soon", false],
  [Package, "Keepsakes", "Optional extras", false],
] as const;

const nextSteps = [
  [CalendarDays, "Adventure walk", "Jeroen arrives between 10:00 and 10:15."],
  [Camera, "Photo update", "A short gallery is shared after every care day."],
  [Heart, "Choose favourites", "Save the moments you love for prints or albums."],
] as const;

export const metadata = {
  title: "Customer Portal | Jeroen & Paws",
  description:
    "A warm customer portal concept for Jeroen & Paws clients to view bookings, care updates, photos, invoices, and keepsakes.",
};

function PortalCard({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`rounded-[1.4rem] border border-[#24163f]/10 bg-white shadow-[0_20px_60px_rgba(29,23,40,0.08)] ${className}`}>
      {children}
    </section>
  );
}

export default function PortalPage() {
  return (
    <>
      <Header activePage="portal" />
      <main className="min-h-screen bg-[#f7f4ef] text-[#1d1728]">
      <div className="grid min-h-screen lg:grid-cols-[17.5rem_1fr]">
        <aside className="hidden bg-[#080b10] text-[#fff7e8] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">

          <nav className="mt-6 flex flex-1 flex-col gap-2 px-5" aria-label="Customer portal navigation">
            {navItems.map(([Icon, label], index) => (
              <a
                key={label}
                href="#"
                className={`group flex items-center gap-4 rounded-xl px-5 py-4 text-sm font-bold transition ${index === 0 ? "bg-[#24163f] text-white shadow-lg shadow-[#000]/20" : "text-[#f5e9d5]/85 hover:bg-white/[0.06] hover:text-white"}`}
              >
                <Icon aria-hidden="true" className="size-5 text-[#c4b5fd] transition group-hover:scale-105" />
                {label}
              </a>
            ))}
          </nav>

          <div className="mx-5 mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="p-5">
              <p className="font-semibold text-[#c4b5fd]">Need help?</p>
              <p className="mt-2 text-sm leading-6 text-[#f5e9d5]/80">Message us anytime about a booking, photo, or care note.</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#6d4b9b] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white">
                Send a message <PawPrint aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="relative h-36">
              <Image src="/images/dogs/walk.jpeg" alt="Jeroen walking dogs through woodland" fill sizes="280px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10]" />
            </div>
          </div>

          <a href="#" className="mb-6 ml-8 inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.16em] text-[#f5e9d5]/90">
            <LogOut aria-hidden="true" className="size-5 text-[#c4b5fd]" /> Log out
          </a>
        </aside>

        <div className="px-4 py-5 sm:px-8 lg:px-10 lg:py-8">
          <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <div>
              <Link href="/" className="mb-3 inline-flex lg:hidden">
                <Image src="/logo4.svg" alt="Jeroen & Paws" width={140} height={82} className="h-12 w-auto" />
              </Link>
              <p className="text-lg font-semibold text-[#2d2140]">Welcome back, Sarah <PawPrint aria-hidden="true" className="ml-1 inline size-4 text-[#8b5cf6]" /></p>
              <p className="mt-1 text-sm text-[#665d70]">Here is Teddy&apos;s next adventure at a glance.</p>
            </div>
            <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
              <Image src="/images/dogs/ace.jpg" alt="Teddy profile photo" fill sizes="48px" className="object-cover" />
            </div>
          </header>

          <div className="mx-auto mt-7 max-w-6xl space-y-6">
            <section className="relative overflow-hidden rounded-[1.6rem] bg-[#080b10] px-6 py-12 text-white shadow-2xl shadow-[#1d1728]/15 sm:px-12 lg:min-h-[24rem]">
              <Image src="/images/dogs/lakta.jpg" alt="Happy dog in the forest" fill priority sizes="(min-width: 1024px) 1120px, 100vw" className="object-cover object-center opacity-60" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.92),rgba(8,11,16,.62),rgba(8,11,16,.18))]" />
              <div className="relative max-w-xl">
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[#c4b5fd]">Your dog&apos;s care, beautifully organised.</p>
                <h1 className="mt-5 text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-6xl">Everything for Teddy is right here.</h1>
                <p className="mt-5 max-w-md leading-8 text-[#f5e9d5]">Bookings, care notes, photo updates, invoices, and little keepsakes — all styled to feel as warm and premium as the Jeroen & Paws experience.</p>
                <Link href="#photos" className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#6d4b9b] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-[#000]/20">
                  View Teddy&apos;s photos <PawPrint aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
              <PortalCard className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Upcoming booking <PawPrint aria-hidden="true" className="inline size-4 text-[#8b5cf6]" /></h2>
                  <a href="#" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#6d4b9b]">View details <ArrowRight className="size-4" /></a>
                </div>
                <div className="mt-7 grid gap-6 sm:grid-cols-[13rem_1fr] sm:items-center">
                  <div className="relative h-44 overflow-hidden rounded-lg sm:h-36">
                    <Image src="/images/dogs/ace.jpg" alt="Teddy enjoying a previous walk" fill sizes="210px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Woodland Adventure Walk</h3>
                    <p className="mt-3 text-sm leading-7 text-[#30283c]">Sunday, 12 July 2026<br />10:00 – 12:00</p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-[#665d70]"><MapPin className="size-4 text-[#6d4b9b]" /> Greystones, County Wicklow</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-4 rounded-xl bg-[#f0e8f8] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#6d4b9b]"><CalendarDays className="size-5" /></span>
                    <div><p className="font-bold">Need to adjust it?</p><p className="mt-1 text-sm text-[#665d70]">Reschedule up to 48 hours before your booking.</p></div>
                  </div>
                  <a href="#" className="text-xs font-black uppercase tracking-[0.16em] text-[#6d4b9b]">Reschedule</a>
                </div>
              </PortalCard>

              <PortalCard className="relative min-h-[22rem] overflow-hidden p-8 text-center text-white">
                <Image src="/images/dogs/shadow.jpg" alt="Dog waiting on a woodland path" fill sizes="400px" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,23,40,.90),rgba(29,23,40,.55),rgba(29,23,40,.20))]" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold text-[#fff7e8]">Our time together <Heart className="inline size-4 text-[#c4b5fd]" /></h2>
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-[#c4b5fd]">Countdown to adventure</p>
                  <p className="mt-4 text-6xl font-semibold">13</p>
                  <p className="text-xs font-black uppercase tracking-[0.18em]">days to go</p>
                </div>
              </PortalCard>
            </div>

            <PortalCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Teddy&apos;s journey <PawPrint aria-hidden="true" className="inline size-4 text-[#8b5cf6]" /></h2>
              <div className="mt-8 grid gap-6 md:grid-cols-5">
                {journey.map(([Icon, title, status, active]) => (
                  <div key={title} className="relative text-center">
                    <div className={`mx-auto grid size-16 place-items-center rounded-full ${active ? "bg-[#3a205f] text-white" : "bg-[#efe8e5] text-[#665d70]"}`}><Icon className="size-7" /></div>
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.16em]">{title}</p>
                    <p className="mt-1 text-sm text-[#665d70]">{status}</p>
                  </div>
                ))}
              </div>
            </PortalCard>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <PortalCard id="photos" className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-semibold">Latest from your sessions</h2><a href="#" className="text-xs font-black uppercase tracking-[0.16em] text-[#6d4b9b]">View all</a></div>
                <div className="relative mt-6 h-64 overflow-hidden rounded-xl"><Image src="/images/dogs/compass1.jpeg" alt="Dog running during a Jeroen & Paws session" fill sizes="650px" className="object-cover" /></div>
                <div className="mt-5 flex items-center justify-between"><div><p className="font-semibold">Solo Adventure</p><p className="mt-1 text-sm text-[#665d70]">18 June 2026</p></div><p className="text-xs font-black uppercase tracking-[0.16em] text-green-700">Gallery delivered ✓</p></div>
              </PortalCard>

              <PortalCard className="p-6 sm:p-8">
                <h2 className="text-2xl font-semibold">What&apos;s next?</h2>
                <div className="mt-7 space-y-6">
                  {nextSteps.map(([Icon, title, text]) => (<div key={title} className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#f0e8f8] text-[#6d4b9b]"><Icon className="size-5" /></span><div><p className="font-semibold">{title}</p><p className="mt-1 text-sm leading-6 text-[#665d70]">{text}</p></div></div>))}
                </div>
                <Link href="#photos" className="mt-8 inline-flex rounded-md bg-[#6d4b9b] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white">View my photos</Link>
              </PortalCard>
            </div>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
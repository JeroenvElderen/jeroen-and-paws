"use client";

import { ArrowRight, Bell, CalendarDays, Check, Clock3, Download, ImageIcon, MapPin, PawPrint, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { formatBookingDate, formatBookingTime, mapBookingRow, type CalendarBooking } from "@/utils/bookings";
import { useSupabaseLiveQuery } from "./use-supabase-live-query";

function mapBookingRows(rows: unknown): CalendarBooking[] {
  return Array.isArray(rows) ? rows.map((row) => mapBookingRow(row as never)) : [];
}

function BookingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`overflow-hidden rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>{children}</section>;
}

export function MyBookings({ accessToken }: { accessToken?: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);
  const { data: bookings, isLoading, error } = useSupabaseLiveQuery({
    accessToken,
    fallback: [] as CalendarBooking[],
    path: "/rest/v1/portal_booking_list?select=*&order=starts_at.asc",
    realtimeTables: ["portal_bookings", "portal_dogs", "portal_session_updates", "portal_gallery_items"],
    map: mapBookingRows,
  });

  const upcoming = useMemo(() => bookings.filter((booking) => booking.status !== "cancelled").sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()), [bookings]);
  const nextBooking = upcoming[0];
  const futureBookings = upcoming.slice(1);
  const dogCount = new Set(upcoming.map((booking) => booking.dogId || booking.dogName)).size;
  const sessionPassed = nextBooking ? new Date(nextBooking.startsAt).getTime() < now : false;
  const timeline = nextBooking ? [
    [Check, "Booking", nextBooking.status.replace(/_/g, " "), formatBookingDate(nextBooking.startsAt, { day: "numeric", month: "short", year: "numeric" }), true],
    [Check, "Calendar", nextBooking.syncStatus.replace(/_/g, " "), nextBooking.source === "outlook" ? "Imported from Outlook" : "Synced from website", true],
    [CalendarDays, "Session day", sessionPassed ? "Completed" : "Scheduled", formatBookingDate(nextBooking.startsAt, { day: "numeric", month: "long", year: "numeric" }), sessionPassed],
    [ImageIcon, "Gallery", sessionPassed ? "In progress" : "Starts after session", "", sessionPassed],
  ] as const : [];

  return (
    <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-[#241f30]">My Bookings</h1>
          <p className="mt-3 text-sm text-[#17132a]">Your portal calendar is powered by the same Supabase bookings that sync with Outlook.</p>
        </div>
        <div className="flex items-center gap-5"><button aria-label="Notifications" className="relative text-[#2f1b59]"><Bell className="size-6" /><span className="absolute right-0 top-0 size-2 rounded-full bg-[#8b5cf6]" /></button><div className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]"><Image src={nextBooking?.coverImageUrl || "/images/dogs/ace.jpg"} alt={`${nextBooking?.dogName ?? "Client"} profile photo`} fill sizes="56px" className="object-cover" /></div></div>
      </header>

      <div className="mx-auto mt-10 max-w-6xl">
        {(isLoading || error || !nextBooking) && <p className="mb-5 rounded-xl border border-[#24163f]/10 bg-white px-5 py-4 text-sm text-[#665d70]">{isLoading ? "Loading live bookings…" : error ?? "No bookings yet."}</p>}
        <div className="flex gap-14 border-b border-[#24163f]/10 text-sm font-medium"><a href="#" className="border-b-2 border-[#4d2e91] px-1 pb-5 text-[#17132a]">Upcoming</a><a href="#future-bookings" className="px-1 pb-5 text-[#17132a]">Future</a><a href="#" className="px-1 pb-5 text-[#17132a]">Cancelled</a></div>

        {nextBooking ? <BookingCard className="mt-5">
          <div className="grid lg:grid-cols-[2fr_2.4fr_1.25fr]">
            <div className="relative min-h-80"><Image src={nextBooking?.coverImageUrl || "/images/dogs/ace.jpg"} alt={`${nextBooking.dogName} booking`} fill sizes="380px" className="object-cover" /></div>
            <div className="p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#3f2581]">Upcoming session</p>
              <h2 className="mt-5 font-serif text-3xl text-[#25203d]">{nextBooking.serviceName}</h2>
              <div className="mt-7 space-y-4 text-sm text-[#342c3f]"><p className="flex items-center gap-4"><CalendarDays className="size-5 text-[#6d4b9b]" /> {formatBookingDate(nextBooking.startsAt)}</p><p className="flex items-center gap-4"><Clock3 className="size-5 text-[#6d4b9b]" /> {formatBookingTime(nextBooking.startsAt)} – {formatBookingTime(nextBooking.endsAt)}</p><p className="flex items-center gap-4"><MapPin className="size-5 text-[#6d4b9b]" /> {nextBooking.location}</p><p className="flex items-center gap-4"><Users className="size-5 text-[#6d4b9b]" /> {dogCount} dog{dogCount === 1 ? "" : "s"}</p></div>
              <div className="mt-9 flex flex-wrap gap-4"><a href={`/api/bookings/${nextBooking.id}`} className="inline-flex items-center gap-2 rounded bg-[#4d2e91] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white"><Download className="size-4" /> Add to calendar</a><a href="#" className="rounded border border-[#4d2e91]/35 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#3f2581]">Reschedule</a></div>
            </div>
            <aside className="bg-[#f4eef8] p-8 text-center lg:p-10"><p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#3f2581]">Status</p><p className="mt-5 font-serif text-4xl capitalize text-[#2a2140]">{nextBooking.status.replace(/_/g, " ")}</p><div className="my-10 border-t border-[#24163f]/10" /><p className="text-sm leading-6">Want all bookings in your calendar?</p>{nextBooking.calendarFeedToken ? <a href={`/api/calendar/feed?token=${nextBooking.calendarFeedToken}`} className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#3f2581]">Open calendar feed <ArrowRight className="size-4" /></a> : <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#3f2581]">Calendar feed appears after Supabase is linked.</p>}</aside>
          </div>

          <div className="border-t border-[#24163f]/10 p-8 lg:p-10"><h3 className="font-serif text-xl">Session Timeline</h3><div className="mt-8 grid gap-8 md:grid-cols-4">{timeline.map(([Icon, title, status, date, active]) => <div key={title} className="relative text-center before:absolute before:left-0 before:top-8 before:hidden before:h-px before:w-full before:bg-[#24163f]/15 md:before:block"><div className={`relative z-10 mx-auto grid size-16 place-items-center rounded-full ${active ? "bg-[#28206e] text-white" : "bg-[#f0eaee] text-[#6a6170]"}`}><Icon className="size-7" /></div><p className="mt-4 text-xs font-black uppercase tracking-[0.14em]">{title}</p><p className="mt-1 text-sm capitalize text-[#665d70]">{status}</p>{date ? <p className="mt-2 text-xs text-[#665d70]">{date}</p> : null}</div>)}</div></div>
        </BookingCard> : null}

        <section id="future-bookings" className="mt-9"><h2 className="font-serif text-2xl text-[#241f30]">Future Bookings</h2><div className="mt-6 space-y-4">{futureBookings.map((booking) => <article key={booking.id} className="grid overflow-hidden rounded-xl border border-[#24163f]/10 bg-white shadow-[0_12px_35px_rgba(29,23,40,0.06)] sm:grid-cols-[14rem_1fr_auto]"><div className="relative h-40 sm:h-auto"><Image src={booking.coverImageUrl || "/images/dogs/walk.jpeg"} alt={`${booking.dogName} session`} fill sizes="224px" className="object-cover" /></div><div className="p-7"><h3 className="font-serif text-xl text-[#25203d]">{booking.serviceName}</h3><p className="mt-5 text-sm text-[#342c3f]">{formatBookingDate(booking.startsAt, { day: "numeric", month: "long", year: "numeric" })} · {formatBookingTime(booking.startsAt)} – {formatBookingTime(booking.endsAt)}</p><p className="mt-2 text-sm text-[#342c3f]">{booking.location}</p></div><div className="flex items-center justify-between gap-6 p-7 sm:min-w-72"><span className="rounded-full bg-[#e9f4df] px-4 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#356d28]">{booking.status.replace(/_/g, " ")}</span><a href={`/api/bookings/${booking.id}`} className="rounded border border-[#4d2e91]/20 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#3f2581]">.ics</a><ArrowRight className="size-5 text-[#3f2581]" /></div></article>)}</div></section>

        <section className="relative mt-9 overflow-hidden rounded-xl bg-[#f4eef8] p-9 sm:p-12"><Image src="/images/dogs/melakta.jpeg" alt="Jeroen with a happy dog" fill sizes="720px" className="object-cover object-right opacity-45" /><div className="relative max-w-md"><h2 className="font-serif text-2xl">Need to make a change?</h2><p className="mt-4 text-sm leading-7">Reschedule, ask a question or just say hi. I&apos;m here to help!</p><Link href="/contact" className="mt-7 inline-flex items-center gap-3 rounded bg-[#4d2e91] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">Send me a message <PawPrint className="size-4" /></Link></div></section>
      </div>
    </div>
  );
}
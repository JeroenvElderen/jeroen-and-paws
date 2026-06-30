"use client";

import { ArrowRight, CalendarDays, Camera, Check, Heart, MapPin, MessageCircle, PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { CountdownTimer } from "./countdown-timer";
import { mapPortalDashboardRow, portalDashboardData, type PortalDashboardData, type PortalDashboardViewRow } from "./portal-data";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IE", { dateStyle: "full" }).format(new Date(date));
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}

function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-IE", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(date));
}

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

export function Dashboard() {
  const [data, setData] = useState<PortalDashboardData>(portalDashboardData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setError("Connect Supabase to show live portal data.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${supabaseUrl.replace(/\/$/, "")}/rest/v1/portal_dashboard?select=*&limit=1`,
          {
            headers: {
              apikey: supabaseAnonKey,
              Authorization: `Bearer ${supabaseAnonKey}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Supabase returned ${response.status}`);
        }

        const rows = (await response.json()) as PortalDashboardViewRow[];
        const row = rows[0];

        if (!isMounted) return;

        if (row) {
          setData(mapPortalDashboardRow(row));
          setError(null);
        } else {
          setError("No portal dashboard records were returned yet.");
        }
      } catch (loadError) {
        if (!isMounted) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load portal data.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const journey = [
    [Check, "Booking", data.upcomingBooking.status, true],
    [Heart, "Care plan", "Shared with Jeroen", true],
    [Camera, "Session day", formatDate(data.upcomingBooking.startsAt), false],
    [MessageCircle, "Live updates", "Shared during care", false],
  ] as const;

  const nextSteps = [
    [CalendarDays, data.upcomingBooking.serviceName, `Jeroen arrives for ${formatTime(data.upcomingBooking.startsAt)} – ${formatTime(data.upcomingBooking.endsAt)}.`],
    [Camera, "Photo update", "Session photos and notes appear here as soon as they are shared."],
  ] as const;

  return (
    <div className="px-4 py-5 sm:px-8 lg:px-10 lg:py-8">
      {(isLoading || error) && (
        <div className="mx-auto mb-5 max-w-6xl rounded-xl border border-[#24163f]/10 bg-white px-5 py-4 text-sm text-[#665d70] shadow-[0_12px_30px_rgba(29,23,40,0.06)]">
          {isLoading ? "Loading live portal data from Supabase…" : `${error} Showing the fallback portal preview until live data is available.`}
        </div>
      )}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <Link href="/" className="mb-3 inline-flex lg:hidden">
            <Image src="/logo4.svg" alt="Jeroen & Paws" width={140} height={82} className="h-12 w-auto" />
          </Link>
          <p className="text-lg font-semibold text-[#2d2140]">Welcome back, {data.clientName} <PawPrint aria-hidden="true" className="ml-1 inline size-4 text-[#8b5cf6]" /></p>
          <p className="mt-1 text-sm text-[#665d70]">Here is {data.dogName}&apos;s next booking at a glance.</p>
        </div>
        <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
          <Image src={data.dogPhotoUrl} alt={`${data.dogName} profile photo`} fill sizes="48px" className="object-cover" />
        </div>
      </header>

      <div className="mx-auto mt-7 max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-[1.6rem] bg-[#080b10] px-6 py-12 text-white shadow-2xl shadow-[#1d1728]/15 sm:px-12 lg:min-h-[24rem]">
          <Image src={data.heroPhotoUrl} alt={`${data.dogName} enjoying a Jeroen & Paws session`} fill priority sizes="(min-width: 1024px) 1120px, 100vw" className="object-cover object-center opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.92),rgba(8,11,16,.62),rgba(8,11,16,.18))]" />
          <div className="relative max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#c4b5fd]">Your dog&apos;s care, beautifully organised.</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-6xl">Everything for {data.dogName} is right here.</h1>
            <p className="mt-5 max-w-md leading-8 text-[#f5e9d5]">Bookings, care notes, photo updates, invoices, and live client updates — all styled to feel as warm and premium as the Jeroen & Paws experience.</p>
            <Link href="#photos" className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#6d4b9b] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-[#000]/20">
              View {data.dogName}&apos;s photos <PawPrint aria-hidden="true" className="size-4" />
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
                <Image src={data.upcomingBooking.imageUrl} alt={`${data.dogName} booking photo`} fill sizes="210px" className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{data.upcomingBooking.serviceName}</h3>
                <p className="mt-3 text-sm leading-7 text-[#30283c]">{formatDate(data.upcomingBooking.startsAt)}<br />{formatTime(data.upcomingBooking.startsAt)} – {formatTime(data.upcomingBooking.endsAt)}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#665d70]"><MapPin className="size-4 text-[#6d4b9b]" /> {data.upcomingBooking.location}</p>
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
            <Image src={data.dogPhotoUrl} alt={`${data.dogName} countdown photo`} fill sizes="400px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,23,40,.90),rgba(29,23,40,.55),rgba(29,23,40,.20))]" />
            <div className="relative">
              <h2 className="text-2xl font-semibold text-[#fff7e8]">Our time together <Heart className="inline size-4 text-[#c4b5fd]" /></h2>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.24em] text-[#c4b5fd]">Countdown to adventure</p>
              <CountdownTimer startsAt={data.upcomingBooking.startsAt} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.18em]">hours : minutes : seconds</p>
            </div>
          </PortalCard>
        </div>

        <PortalCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">{data.dogName}&apos;s booking progress <PawPrint aria-hidden="true" className="inline size-4 text-[#8b5cf6]" /></h2>
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
            <div className="relative mt-6 h-64 overflow-hidden rounded-xl"><Image src={data.latestSession.imageUrl} alt={`${data.dogName} latest session photo`} fill sizes="650px" className="object-cover" /></div>
            <div className="mt-5 flex items-center justify-between"><div><p className="font-semibold">{data.latestSession.serviceName}</p><p className="mt-1 text-sm text-[#665d70]">{formatShortDate(data.latestSession.sessionDate)}</p></div><p className="text-xs font-black uppercase tracking-[0.16em] text-green-700">{data.latestSession.status}</p></div>
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
  );
}
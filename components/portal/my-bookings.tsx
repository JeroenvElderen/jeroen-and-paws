import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  Clock3,
  Gift,
  ImageIcon,
  MapPin,
  PawPrint,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const timeline = [
  [Check, "Booking", "Confirmed", "14 Jun 2026", true],
  [Check, "Planning", "In progress", "22 Jun 2026", true],
  [CalendarDays, "Session day", "12 July 2026", "", false],
  [ImageIcon, "Gallery", "Coming soon", "", false],
  [Gift, "Products", "Coming soon", "", false],
] as const;

const futureBookings = [
  ["/images/dogs/lola/lola1.jpeg", "Meadow Social Walk", "26 July 2026 · 09:30 – 11:00", "Powerscourt Estate", "Planning"],
  ["/images/dogs/nola.jpg", "Golden Hour Beach Walk", "9 August 2026 · 18:00 – 19:30", "Greystones South Beach", "Confirmed"],
  ["/images/dogs/kaiser/kaiser1.jpeg", "Heathland Pack Adventure", "23 August 2026 · 10:00 – 12:00", "Wicklow Mountains", "Confirmed"],
] as const;

function BookingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`overflow-hidden rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>
      {children}
    </section>
  );
}

export function MyBookings() {
  return (
    <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-[#241f30]">My Bookings</h1>
          <p className="mt-3 text-sm text-[#17132a]">Here you can see all your upcoming and future sessions.</p>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Notifications" className="relative text-[#2f1b59]"><Bell className="size-6" /><span className="absolute right-0 top-0 size-2 rounded-full bg-[#8b5cf6]" /></button>
          <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]"><Image src="/images/dogs/ace.jpg" alt="Teddy profile photo" fill sizes="56px" className="object-cover" /></div>
        </div>
      </header>

      <div className="mx-auto mt-10 max-w-6xl">
        <div className="flex gap-14 border-b border-[#24163f]/10 text-sm font-medium">
          <a href="#" className="border-b-2 border-[#4d2e91] px-1 pb-5 text-[#17132a]">Upcoming</a>
          <a href="#future-bookings" className="px-1 pb-5 text-[#17132a]">Future</a>
          <a href="#" className="px-1 pb-5 text-[#17132a]">Cancelled</a>
        </div>

        <BookingCard className="mt-5">
          <div className="grid lg:grid-cols-[2fr_2.4fr_1.25fr]">
            <div className="relative min-h-80"><Image src="/images/dogs/ace.jpg" alt="Happy dog standing in a forest" fill sizes="380px" className="object-cover" /></div>
            <div className="p-8 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#3f2581]">Upcoming session</p>
              <h2 className="mt-5 font-serif text-3xl text-[#25203d]">Adventure Walk</h2>
              <div className="mt-7 space-y-4 text-sm text-[#342c3f]">
                <p className="flex items-center gap-4"><CalendarDays className="size-5 text-[#6d4b9b]" /> Sunday, 12 July 2026</p>
                <p className="flex items-center gap-4"><Clock3 className="size-5 text-[#6d4b9b]" /> 10:00 – 12:00</p>
                <p className="flex items-center gap-4"><MapPin className="size-5 text-[#6d4b9b]" /> Greystones, County Wicklow</p>
                <p className="flex items-center gap-4"><Users className="size-5 text-[#6d4b9b]" /> 2 dogs</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#" className="rounded bg-[#4d2e91] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">View details</a>
                <a href="#" className="rounded border border-[#4d2e91]/35 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#3f2581]">Reschedule</a>
              </div>
            </div>
            <aside className="bg-[#f4eef8] p-8 text-center lg:p-10">
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#3f2581]">Countdown</p>
              <p className="mt-5 font-serif text-6xl text-[#2a2140]">13</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em]">Days to go</p>
              <div className="my-10 border-t border-[#24163f]/10" />
              <p className="text-sm leading-6">Preparing for your session?</p>
              <a href="#" className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#3f2581]">View guide <ArrowRight className="size-4" /></a>
            </aside>
          </div>

          <div className="border-t border-[#24163f]/10 p-8 lg:p-10">
            <h3 className="font-serif text-xl">Session Timeline</h3>
            <div className="mt-8 grid gap-8 md:grid-cols-5">
              {timeline.map(([Icon, title, status, date, active]) => (
                <div key={title} className="relative text-center before:absolute before:left-0 before:top-8 before:hidden before:h-px before:w-full before:bg-[#24163f]/15 md:before:block">
                  <div className={`relative z-10 mx-auto grid size-16 place-items-center rounded-full ${active ? "bg-[#28206e] text-white" : "bg-[#f0eaee] text-[#6a6170]"}`}><Icon className="size-7" /></div>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.14em]">{title}</p>
                  <p className="mt-1 text-sm text-[#665d70]">{status}</p>
                  {date ? <p className="mt-2 text-xs text-[#665d70]">{date}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </BookingCard>

        <div className="mt-5 flex flex-col gap-5 rounded-xl bg-[#f4eef8] p-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5"><span className="grid size-14 place-items-center rounded-full bg-[#4d2e91] text-white"><PawPrint className="size-7" /></span><div><h3 className="font-serif text-xl">Questions before your session?</h3><p className="mt-2 text-sm">Check out the preparation guide with tips for you and your dog.</p></div></div>
          <a href="#" className="rounded border border-[#4d2e91]/40 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#3f2581]">View guide</a>
        </div>

        <section id="future-bookings" className="mt-9">
          <h2 className="font-serif text-2xl text-[#241f30]">Future Bookings</h2>
          <div className="mt-6 space-y-4">
            {futureBookings.map(([src, title, date, location, status]) => (
              <article key={title} className="grid overflow-hidden rounded-xl border border-[#24163f]/10 bg-white shadow-[0_12px_35px_rgba(29,23,40,0.06)] sm:grid-cols-[14rem_1fr_auto]">
                <div className="relative h-40 sm:h-auto"><Image src={src} alt={`${title} dog session`} fill sizes="224px" className="object-cover" /></div>
                <div className="p-7"><h3 className="font-serif text-xl text-[#25203d]">{title}</h3><p className="mt-5 text-sm text-[#342c3f]">{date}</p><p className="mt-2 text-sm text-[#342c3f]">{location}</p></div>
                <div className="flex items-center justify-between gap-6 p-7 sm:min-w-72"><span className="rounded-full bg-[#e9f4df] px-4 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#356d28]">{status}</span><a href="#" className="rounded border border-[#4d2e91]/20 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#3f2581]">View details</a><ArrowRight className="size-5 text-[#3f2581]" /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative mt-9 overflow-hidden rounded-xl bg-[#f4eef8] p-9 sm:p-12">
          <Image src="/images/dogs/melakta.jpeg" alt="Jeroen with a happy dog" fill sizes="720px" className="object-cover object-right opacity-45" />
          <div className="relative max-w-md"><h2 className="font-serif text-2xl">Need to make a change?</h2><p className="mt-4 text-sm leading-7">Reschedule, ask a question or just say hi. I&apos;m here to help!</p><Link href="/contact" className="mt-7 inline-flex items-center gap-3 rounded bg-[#4d2e91] px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">Send me a message <PawPrint className="size-4" /></Link></div>
        </section>
      </div>
    </div>
  );
}
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronRight,
  Edit3,
  FileText,
  Heart,
  ImageIcon,
  Lock,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const personalDetails = [
  ["Full Name", "Sarah Johnson"],
  ["Email Address", "sarah.johnson@email.com"],
  ["Phone Number", "+353 87 123 4567"],
  ["Address", "12 Marine Road, Greystones, County Wicklow"],
] as const;

const preferences = [
  [Bell, "Notification Preferences", "Email, SMS"],
  [PawPrint, "Service Preferences", "Walks, Training, Drop-ins"],
  [Heart, "Dog Preferences", "Size, breed experience, behaviour"],
  [ShieldCheck, "Privacy Settings", "Manage your data and privacy"],
] as const;

const dogs = [
  {
    name: "Max",
    details: "Golden Retriever - 3 years",
    image: "/images/dogs/ace.jpg",
  },
  {
    name: "Luna",
    details: "Labrador - 1 year",
    image: "/images/dogs/shadow.jpg",
  },
] as const;

const recentActivity = [
  [CalendarDays, "Booking confirmed", "Adventure Walk - 12 July 2026 at 10:00", "2 days ago"],
  [ImageIcon, "Photo update added", "From Max's latest walk", "3 days ago"],
  [FileText, "Invoice paid", "INV-2026-0045 - €125.00", "1 week ago"],
  [Star, "Review submitted", "You left a 5-star review", "2 weeks ago"],
] as const;

function ProfilePanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>
      {children}
    </section>
  );
}

function EditButton() {
  return (
    <button type="button" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]">
      <Edit3 aria-hidden="true" className="size-4" />
      Edit
    </button>
  );
}

export function Profile({
  onBackToDashboard,
}: {
  onBackToDashboard: () => void;
}) {
  return (
    <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Dashboard
          </button>
          <h1 className="font-serif text-4xl leading-tight text-[#241f30]">
            My Profile <PawPrint aria-hidden="true" className="inline size-6 text-[#8b5cf6]" />
          </h1>
          <p className="mt-3 text-sm text-[#17132a]">Manage your personal details and preferences.</p>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Notifications" className="relative text-[#2f1b59]">
            <Bell className="size-6" />
            <span className="absolute -right-1 -top-2 grid size-5 place-items-center rounded-full bg-[#17132a] text-[0.65rem] font-black text-white">2</span>
          </button>
          <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
            <Image src="/images/dogs/ace.jpg" alt="Teddy profile photo" fill sizes="56px" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-6xl space-y-6">
        <ProfilePanel className="overflow-hidden p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[14rem_1fr_18rem] lg:items-center">
            <div className="relative mx-auto size-44 lg:mx-0">
              <Image src="/images/dogs/nola.jpeg" alt="Sarah Johnson profile dog portrait" fill sizes="176px" className="rounded-full object-cover ring-4 ring-[#ead9b8]" />
              <button type="button" aria-label="Edit profile photo" className="absolute bottom-3 right-0 grid size-12 place-items-center rounded-full bg-white text-[#4d2e91] shadow-[0_12px_28px_rgba(29,23,40,0.18)]">
                <Edit3 aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-[#241f30]">Sarah Johnson</h2>
              <div className="mt-6 space-y-4 text-sm text-[#2f2938]">
                <p className="flex items-center gap-3">
                  <Mail aria-hidden="true" className="size-4 text-[#4d2e91]" />
                  sarah.johnson@email.com
                </p>
                <p className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="size-4 text-[#4d2e91]" />
                  +353 87 123 4567
                </p>
                <p className="flex items-center gap-3">
                  <MapPin aria-hidden="true" className="size-4 text-[#4d2e91]" />
                  Greystones, County Wicklow
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0e8f8] px-5 py-2 text-sm font-semibold text-[#4d2e91]">
                <PawPrint aria-hidden="true" className="size-4" />
                Member since March 2024
              </span>
            </div>

            <div className="relative rounded-xl bg-[#faf7fb] p-6 text-[#241f30]">
              <Heart aria-hidden="true" className="absolute right-7 top-5 size-10 text-[#d8c4ea]" />
              <p className="relative max-w-52 text-lg leading-8">Making tails wag and lives better, one walk at a time.</p>
              <p className="relative mt-7 font-serif text-2xl text-[#3f2581]">
                Jeroen <PawPrint aria-hidden="true" className="inline size-4" />
              </p>
            </div>
          </div>
        </ProfilePanel>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="space-y-6">
            <ProfilePanel className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-[#241f30]">Personal Information</h2>
                <EditButton />
              </div>
              <dl className="mt-6 divide-y divide-[#24163f]/10">
                {personalDetails.map(([label, value]) => (
                  <div key={label} className="py-4 first:pt-0 last:pb-0">
                    <dt className="text-sm font-semibold text-[#241f30]">{label}</dt>
                    <dd className="mt-2 text-sm text-[#3a3048]">{value}</dd>
                  </div>
                ))}
              </dl>

              <button type="button" className="mt-7 flex w-full items-center justify-between gap-4 rounded-xl bg-[#f8f2fb] p-5 text-left">
                <span className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#4d2e91]">
                    <Mail aria-hidden="true" className="size-6" />
                  </span>
                  <span>
                    <span className="block font-semibold text-[#241f30]">Email Preferences</span>
                    <span className="mt-2 block text-sm leading-6 text-[#665d70]">Choose what updates you want to receive from us.</span>
                  </span>
                </span>
                <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-[#4d2e91]" />
              </button>
            </ProfilePanel>

            <ProfilePanel className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-[#241f30]">Preferences</h2>
                <EditButton />
              </div>
              <div className="mt-6 divide-y divide-[#24163f]/10">
                {preferences.map(([Icon, title, detail]) => (
                  <button key={title} type="button" className="flex w-full items-center justify-between gap-4 py-4 text-left first:pt-0 last:pb-0">
                    <span className="flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-[#241f30]">{title}</span>
                        <span className="mt-1 block text-sm text-[#665d70]">{detail}</span>
                      </span>
                    </span>
                    <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-[#4d2e91]" />
                  </button>
                ))}
              </div>
            </ProfilePanel>
          </div>

          <div className="space-y-6">
            <ProfilePanel className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-[#241f30]">Security</h2>
                <EditButton />
              </div>
              <div className="mt-7 divide-y divide-[#24163f]/10">
                <button type="button" className="flex w-full items-center justify-between gap-4 pb-5 text-left">
                  <span className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]">
                      <Lock aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-[#241f30]">Password</span>
                      <span className="mt-1 block text-sm text-[#665d70]">************</span>
                    </span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-5 text-[#4d2e91]" />
                </button>

                <div className="flex items-center justify-between gap-4 pt-5">
                  <span className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]">
                      <ShieldCheck aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-[#241f30]">Two-Factor Authentication</span>
                      <span className="mt-1 block text-sm text-[#356d28]">Enabled</span>
                    </span>
                  </span>
                  <button type="button" aria-label="Two-factor authentication enabled" className="flex h-8 w-14 items-center justify-end rounded-full bg-[#4d2e91] p-1">
                    <span className="size-6 rounded-full bg-white shadow-sm" />
                  </button>
                </div>
              </div>
            </ProfilePanel>

            <ProfilePanel className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl text-[#241f30]">My Dogs</h2>
                <EditButton />
              </div>
              <div className="mt-6 divide-y divide-[#24163f]/10">
                {dogs.map((dog) => (
                  <article key={dog.name} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-5 first:pt-0">
                    <div className="relative size-16 overflow-hidden rounded-full ring-2 ring-[#ead9b8]">
                      <Image src={dog.image} alt={`${dog.name} profile photo`} fill sizes="64px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#241f30]">{dog.name}</h3>
                      <p className="mt-1 text-sm text-[#665d70]">{dog.details}</p>
                    </div>
                    <span className="rounded-full bg-[#f0e8f8] px-4 py-1 text-xs font-semibold text-[#4d2e91]">Active</span>
                  </article>
                ))}
              </div>
              <button type="button" className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded border border-[#4d2e91]/30 px-6 py-4 text-sm font-semibold text-[#4d2e91]">
                <Plus aria-hidden="true" className="size-5" />
                Add a Dog
              </button>
            </ProfilePanel>
          </div>
        </div>

        <ProfilePanel className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-serif text-2xl text-[#241f30]">Recent Activity</h2>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]">
              View all activity <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <div className="mt-6 divide-y divide-[#24163f]/10">
            {recentActivity.map(([Icon, title, detail, time]) => (
              <article key={title} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center">
                <span className="grid size-10 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#241f30]">{title}</h3>
                  <p className="mt-1 text-sm text-[#665d70]">{detail}</p>
                </div>
                <p className="text-sm text-[#665d70]">{time}</p>
              </article>
            ))}
          </div>
        </ProfilePanel>

        <section className="flex flex-col gap-5 rounded-xl bg-[#f4eef8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-5">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#4d2e91] text-white">
              <PawPrint aria-hidden="true" className="size-8" />
            </span>
            <div>
              <h2 className="font-serif text-2xl text-[#241f30]">We&apos;re here for you and your pup.</h2>
              <p className="mt-2 text-sm text-[#5f5769]">Need anything? Our team is just a message away.</p>
            </div>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded bg-[#4d2e91] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white">
            Send a message <PawPrint aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}

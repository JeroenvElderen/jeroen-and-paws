import Image from "next/image";
import { Camera, GraduationCap, Heart, KeyRound, Route, ShieldCheck, UserRoundCheck, CalendarCheck2 } from "lucide-react";

import { Navbar } from "@/components/home/navbar";

const stats = [
  { value: "500+", label: "Happy Pet Families" },
  { value: "15k+", label: "Walks Completed" },
  { value: "5.0", label: "Google Rating" },
];

const trustHighlights = [
  {
    title: "Insured & Bonded",
    description:
      "Every walker is fully insured, bonded, and background-checked. Your pet's safety is never a question mark.",
    icon: UserRoundCheck,
  },
  {
    title: "GPS-Tracked Walks",
    description: "Get real-time updates and a map of every walk. You'll know exactly where your dog explored and for how long.",
    icon: Route,
  },
  {
    title: "Photo Updates",
    description: "We send photos and a summary after every visit. Because you shouldn't have to wonder how your pet's day went.",
    icon: Camera,
  },
  {
    title: "Secure Key Storage",
    description: "Keys are stored in a locked safe when not in use. We take access to your home as seriously as you do.",
    icon: KeyRound,
  },
  {
    title: "Pet First Aid Certified",
    description: "All team members are trained in pet first aid and CPR. If something unexpected happens, we're ready.",
    icon: GraduationCap,
  },
  {
    title: "Consistent Walkers",
    description: "Your dog gets the same walker every time. Familiarity builds trust, and trust makes for happier walks.",
    icon: CalendarCheck2,
  },
];

export function Homepage() {
  return (
    <div className="min-h-screen bg-[#eef2dc]">
      <Navbar />
      
      <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_0.98fr] lg:items-center lg:gap-12 lg:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0f7f45] shadow-sm">
            <Heart className="h-3.5 w-3.5 fill-[#a45422] text-[#a45422]" />
            Trusted by 500+ Denver Pet Families
          </div>

          <h1 className="mt-7 text-[42px] font-bold leading-[1.08] tracking-tight text-[#0f172a] sm:text-[58px]">
            Your Dog Deserves
            <span className="mt-2 block text-[#148b45]">Happy Trails</span>
          </h1>

          <div className="mt-3 h-1 w-[340px] max-w-full rounded-full bg-[#ba8b57]" />

          <p className="mt-7 max-w-[640px] text-[20px] leading-[1.5] text-[#334155] sm:text-[22px]">
            Professional dog walking and pet sitting that actually feels like family. We treat every pup, kitten,
            and critter like our own. Rain or shine, your pet is in caring hands.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="inline-flex rounded-full bg-[#188a45] px-9 py-3 text-[18px] font-bold text-white transition hover:bg-[#15763b]"
            >
              Book a Walk
            </a>
            <a
              href="#"
              className="inline-flex rounded-full border-2 border-[#188a45] px-9 py-3 text-[18px] font-semibold text-[#15763b] transition hover:bg-[#e6f4e9]"
            >
              See Our Services
            </a>
          </div>

          <div className="mt-10 border-t border-[#d3d8ce] pt-6">
            <dl className="grid grid-cols-2 gap-y-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[42px] font-bold text-[#118748]">{stat.value}</dt>
                  <dd className="mt-1 text-lg text-[#475569]">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative aspect-[5/3] overflow-hidden rounded-[26px] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80"
            alt="Dog walker with dogs in a park"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-4 sm:px-10 lg:pb-20">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#0f7f45]">
            <ShieldCheck className="h-4 w-4 fill-[#d8f0df] text-[#0f7f45]" />
            Why Happy Trails
          </p>
          <h2 className="mt-5 text-[42px] font-bold tracking-tight text-[#0f172a] sm:text-[56px]">Pet Care You Can Count On</h2>
          <p className="mx-auto mt-4 max-w-[840px] text-[21px] leading-relaxed text-[#3f4a5a] sm:text-[22px]">
            We built this business because we saw too many dog walkers treat it like a side gig.
            <span className="block">This is our full-time commitment to your pet&apos;s wellbeing.</span>
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trustHighlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <article key={highlight.title} className="rounded-[18px] border border-[#d7dce2] bg-[#f6f8fb] px-8 pb-8 pt-9 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d6efde]">
                  <Icon className="h-7 w-7 text-[#0f7f45]" />
                </div>
                <h3 className="mt-6 text-[24px] font-bold tracking-tight text-[#0f172a]">{highlight.title}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-[#394456]">{highlight.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
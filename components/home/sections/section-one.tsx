import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Sparkles } from "lucide-react";

import { sectionOne } from "@/lib/data/homepage-data";

export function SectionOneHero() {
  return (
    <section className="px-4 pt-10 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 rounded-[2.5rem] border border-white/20 bg-[#071428]/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div className="space-y-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-cyan-300/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
            {sectionOne.eyebrow}
          </p>

          <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl">A whole new way to care for your dog.</h1>
          <p className="max-w-2xl text-lg text-cyan-100/90 sm:text-xl">{sectionOne.subtitle}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={sectionOne.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-6 py-3 text-base font-black text-[#041423] transition hover:-translate-y-0.5"
            >
              {sectionOne.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={sectionOne.secondaryCta.href}
              className="inline-flex items-center rounded-2xl border border-fuchsia-300/60 bg-fuchsia-400/10 px-6 py-3 text-base font-bold text-fuchsia-100"
            >
              {sectionOne.secondaryCta.label}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {sectionOne.stats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-white/20 bg-white/5 p-4">
                <p className="text-3xl font-black text-cyan-100">{stat.value}</p>
                <p className="text-sm text-cyan-100/80">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[2rem] border-4 border-cyan-300/60">
            <Image src={sectionOne.heroImage.src} alt={sectionOne.heroImage.alt} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021127] via-transparent" />
          </div>
          <div className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-xl border border-emerald-300/40 bg-[#05223f] px-4 py-2 text-sm font-semibold text-emerald-200">
            <BadgeCheck className="h-4 w-4" /> Insured, licensed, and trusted
          </div>
        </div>
      </div>
    </section>
  );
}

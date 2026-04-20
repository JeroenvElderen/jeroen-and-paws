import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sectionOne } from "@/lib/data/homepage-data";

export function SectionOneHero() {
  return (
    <section className="px-6 pb-8 pt-10 sm:px-10 lg:px-12">
      <div className="premium-section playful-panel relative overflow-hidden">
        <div className="pointer-events-none absolute -left-16 top-6 h-52 w-52 rounded-full bg-[#ff74b3]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-4 h-60 w-60 rounded-full bg-[#8c63ff]/30 blur-3xl" />
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-28" />
        <div className="playful-ribbons pointer-events-none absolute right-0 top-0 h-28 w-40" />

        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#fcecff]">
              <Sparkles className="h-3.5 w-3.5" />
              {sectionOne.eyebrow}
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-[1.02] text-[#fff4ff] sm:text-6xl">{sectionOne.title}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#ead6ff] sm:text-2xl">{sectionOne.subtitle}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-gradient-to-r from-[#ff74b3] to-[#8f63ff] px-10 text-lg font-semibold text-white shadow-[0_16px_32px_rgba(255,116,179,0.3)] hover:from-[#ff63aa] hover:to-[#7f52f6]"
              >
                <Link href={sectionOne.primaryCta.href}>{sectionOne.primaryCta.label} →</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="rounded-full border border-white/35 bg-[#2a1a45]/70 px-6 text-lg font-bold text-[#f7e8ff] no-underline"
              >
                <Link href={sectionOne.secondaryCta.href}>☎ {sectionOne.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3">
              {sectionOne.stats.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-white/25 bg-[#2f1e4f]/70 px-4 py-4 backdrop-blur">
                  <p className="text-2xl font-extrabold text-[#fff3ff]">{stat.value}</p>
                  <p className="text-sm font-medium text-[#dfc2ff]">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[0.85] overflow-hidden rounded-[2.8rem] border-[10px] border-[#3a235f] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <Image
                src={sectionOne.heroImage.src}
                alt={sectionOne.heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 520px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,14,46,0.85)] via-[rgba(35,20,57,0.35)] to-transparent" />
            </div>

            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-white/25 bg-[#2b1848]/90 px-4 py-3 shadow-xl backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-[#ffd6ec]" />
              <p className="text-sm font-semibold text-[#f9eaff]">Fully insured & verified sitters</p>
            </div>

            <div className="absolute -right-4 top-6 flex items-center gap-2 rounded-full bg-[#ff74b3] px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <Star className="h-4 w-4 text-[#ffe3ff]" />
              Premium care
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

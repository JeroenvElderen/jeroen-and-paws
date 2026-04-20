import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sectionOne } from "@/lib/data/homepage-data";

export function SectionOneHero() {
  return (
    <section className="px-6 pb-8 pt-10 sm:px-10 lg:px-12">
      <div className="premium-section relative overflow-hidden">
        <div className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-6 h-56 w-56 rounded-full bg-[#9d64ff]/25 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {sectionOne.eyebrow}
            </p>

            <h1 className="max-w-xl text-5xl font-black leading-[1.02] text-[#efe3ff] sm:text-6xl">{sectionOne.title}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#c9b1ee] sm:text-2xl">{sectionOne.subtitle}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-accent px-10 text-lg font-semibold text-accent-foreground shadow-[0_16px_28px_rgba(145,87,222,0.35)] hover:bg-[#8448e8]"
              >
                <Link href={sectionOne.primaryCta.href}>{sectionOne.primaryCta.label} →</Link>
              </Button>
              <Button
                asChild
                variant="link"
                className="rounded-full border border-[#d8c1ff] bg-[#201530]/70 px-6 text-lg font-bold text-[#d9c4ff] no-underline"
              >
                <Link href={sectionOne.secondaryCta.href}>☎ {sectionOne.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-3">
              {sectionOne.stats.map((stat) => (
                <article key={stat.label} className="rounded-2xl border border-[#3f2a60] bg-card/80 px-4 py-4 backdrop-blur">
                  <p className="text-2xl font-extrabold text-[#efe3ff]">{stat.value}</p>
                  <p className="text-sm font-medium text-[#bca3e7]">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="relative aspect-[0.85] overflow-hidden rounded-[2.8rem] border-[10px] border-[#2d1f46] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <Image
                src={sectionOne.heroImage.src}
                alt={sectionOne.heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 520px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,10,30,0.85)] via-[rgba(27,18,48,0.4)] to-transparent" />
            </div>

            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">Fully insured & verified sitters</p>
            </div>

            <div className="absolute -right-4 top-6 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">
              <Star className="h-4 w-4 text-[#c7a2ff]" />
              Premium care
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

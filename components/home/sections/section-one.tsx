import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sectionOne } from "@/lib/data/homepage-data";

export function SectionOneHero() {
  return (
    <section className="px-6 pb-20 pt-10 sm:px-10 lg:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d7def7] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5c90]">
            <Sparkles className="h-3.5 w-3.5" />
            {sectionOne.eyebrow}
          </p>

          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] text-[#142678] sm:text-6xl">{sectionOne.title}</h1>
          <p className="max-w-xl text-xl leading-relaxed text-[#4f5d8e] sm:text-2xl">{sectionOne.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-accent px-10 text-lg font-semibold text-accent-foreground shadow-[0_16px_28px_rgba(255,103,56,0.3)] hover:bg-[#f35b2a]"
            >
              <Link href={sectionOne.primaryCta.href}>{sectionOne.primaryCta.label} →</Link>
            </Button>
            <Button
              asChild
              variant="link"
              className="rounded-full border border-[#dce2f8] px-6 text-lg font-bold text-[#24367f] no-underline"
            >
              <Link href={sectionOne.secondaryCta.href}>☎ {sectionOne.secondaryCta.label}</Link>
            </Button>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-3">
            {sectionOne.stats.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-[#e3e8fa] bg-white/90 px-4 py-4">
                <p className="text-2xl font-extrabold text-[#132978]">{stat.value}</p>
                <p className="text-sm font-medium text-[#5f678b]">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="relative aspect-[0.85] overflow-hidden rounded-[2.8rem] border-[10px] border-white shadow-[0_30px_80px_rgba(17,36,114,0.18)]">
            <Image
              src={sectionOne.heroImage.src}
              alt={sectionOne.heroImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 520px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d64cc] via-[#0c1d6420] to-transparent" />
          </div>

          <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl">
            <ShieldCheck className="h-5 w-5 text-[#132978]" />
            <p className="text-sm font-semibold text-[#132978]">Fully insured & verified sitters</p>
          </div>

          <div className="absolute -right-4 top-6 flex items-center gap-2 rounded-full bg-[#132978] px-4 py-2 text-sm font-semibold text-white shadow-lg">
            <Star className="h-4 w-4 text-[#ffd56a]" />
            Premium care
          </div>
        </div>
      </div>
    </section>
  );
}
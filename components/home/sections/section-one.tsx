import Link from "next/link";

import { Button } from "@/components/ui/button";
import { sectionOne } from "@/lib/data/homepage-data";

export function SectionOneHero() {
  return (
    <section className="px-6 pb-20 pt-10 sm:px-10 lg:px-12">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5c90]">{sectionOne.eyebrow}</p>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] text-[#142678] sm:text-6xl">{sectionOne.title}</h1>
          <p className="text-2xl text-[#4f5d8e]">{sectionOne.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-[#ff6738] px-10 text-lg font-semibold text-white hover:bg-[#f35b2a]"
            >
              <Link href={sectionOne.primaryCta.href}>{sectionOne.primaryCta.label} →</Link>
            </Button>
            <Button asChild variant="link" className="text-lg font-bold text-[#24367f] no-underline">
              <Link href={sectionOne.secondaryCta.href}>☎ {sectionOne.secondaryCta.label}</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="aspect-[0.85] w-full rounded-[42%] border-[18px] border-white bg-[#ffd629] shadow-[0_24px_60px_rgba(0,0,0,0.09)]" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-[20rem] leading-none">🐶</span>
          </div>
        </div>
      </div>
    </section>
  );
}
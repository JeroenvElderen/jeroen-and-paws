import Link from "next/link";
import { Mail } from "lucide-react";

import { sectionFour } from "@/lib/data/homepage-data";

export function SectionFourContact() {
  return (
    <section className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section playful-panel relative px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="absolute left-0 top-0 h-full w-full rounded-[2rem] bg-[radial-gradient(circle_at_18%_12%,rgba(255,116,179,0.2),transparent_34%)]" />
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute right-0 top-0 h-24 w-44" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-[#ffc6e4]">
            <Mail className="h-6 w-6" strokeWidth={1.8} />
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight text-[#fff2ff] sm:text-5xl">{sectionFour.title}</h2>

          <p className="mt-8 text-2xl font-semibold text-[#e7ceff] sm:text-3xl">
            {sectionFour.phoneLabel} <span className="text-[#ff9ec9]">{sectionFour.phoneNumber}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={sectionFour.primaryCta.href}
              className="inline-flex rounded-full bg-gradient-to-r from-[#ff74b3] to-[#8f63ff] px-9 py-4 text-xl font-extrabold text-white transition-colors hover:from-[#ff63aa] hover:to-[#7f52f6]"
            >
              {sectionFour.primaryCta.label}
            </Link>
            <Link
              href={sectionFour.secondaryCta.href}
              className="inline-flex rounded-full border border-white/20 bg-[#302049] px-9 py-4 text-xl font-extrabold text-[#f7e9ff] transition-colors hover:bg-[#3f2b61]"
            >
              {sectionFour.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

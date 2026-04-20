import Link from "next/link";
import { Mail } from "lucide-react";

import { sectionFour } from "@/lib/data/homepage-data";

export function SectionFourContact() {
  return (
    <section className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#9d64ff]/25 text-[#9d64ff]">
            <Mail className="h-6 w-6" strokeWidth={1.8} />
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight text-[#efe3ff] sm:text-5xl">
            {sectionFour.title}
          </h2>

          <p className="mt-8 text-3xl font-semibold text-[#bca4e6]">
            {sectionFour.phoneLabel} <span className="text-[#9d64ff]">{sectionFour.phoneNumber}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={sectionFour.primaryCta.href}
              className="inline-flex rounded-full bg-[#9d64ff] px-9 py-4 text-xl font-extrabold text-white transition-colors hover:bg-[#8448e8]"
            >
              {sectionFour.primaryCta.label}
            </Link>
            <Link
              href={sectionFour.secondaryCta.href}
              className="inline-flex rounded-full bg-[#2b213d] px-9 py-4 text-xl font-extrabold text-[#efe3ff] transition-colors hover:bg-[#3b2f54]"
            >
              {sectionFour.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
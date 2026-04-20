import Link from "next/link";
import { Mail } from "lucide-react";

import { sectionFour } from "@/lib/data/homepage-data";

export function SectionFourContact() {
  return (
    <section className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] bg-[#f6f1ff] px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#7c3aed]/25 text-[#7c3aed]">
            <Mail className="h-6 w-6" strokeWidth={1.8} />
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight text-[#351a75] sm:text-5xl">
            {sectionFour.title}
          </h2>

          <p className="mt-8 text-3xl font-semibold text-[#745da8]">
            {sectionFour.phoneLabel} <span className="text-[#7c3aed]">{sectionFour.phoneNumber}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={sectionFour.primaryCta.href}
              className="inline-flex rounded-full bg-[#7c3aed] px-9 py-4 text-xl font-extrabold text-white transition-colors hover:bg-[#6d28d9]"
            >
              {sectionFour.primaryCta.label}
            </Link>
            <Link
              href={sectionFour.secondaryCta.href}
              className="inline-flex rounded-full bg-[#eadfff] px-9 py-4 text-xl font-extrabold text-[#351a75] transition-colors hover:bg-[#dfd1fb]"
            >
              {sectionFour.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
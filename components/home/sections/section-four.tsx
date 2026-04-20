import Link from "next/link";
import { Mail } from "lucide-react";

import { sectionFour } from "@/lib/data/homepage-data";

export function SectionFourContact() {
  return (
    <section className="px-6 pb-20 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] bg-[#f6f7fb] px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6436]/25 text-[#ff6436]">
            <Mail className="h-6 w-6" strokeWidth={1.8} />
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight text-[#111f77] sm:text-5xl">
            {sectionFour.title}
          </h2>

          <p className="mt-8 text-3xl font-semibold text-[#556089]">
            {sectionFour.phoneLabel} <span className="text-[#ff6436]">{sectionFour.phoneNumber}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={sectionFour.primaryCta.href}
              className="inline-flex rounded-full bg-[#ff6436] px-9 py-4 text-xl font-extrabold text-white transition-colors hover:bg-[#f2511f]"
            >
              {sectionFour.primaryCta.label}
            </Link>
            <Link
              href={sectionFour.secondaryCta.href}
              className="inline-flex rounded-full bg-[#efe3d7] px-9 py-4 text-xl font-extrabold text-[#111f77] transition-colors hover:bg-[#e6d8cc]"
            >
              {sectionFour.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";

import { sectionFour } from "@/lib/data/homepage-data";

export function SectionFourContact() {
  return (
    <section className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-cyan-300/40 bg-gradient-to-r from-[#08203d]/90 via-[#1a1140]/90 to-[#221136]/90 p-8 text-center sm:p-12">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-100">Fast booking lane</p>
        <h2 className="mt-4 text-4xl font-black text-white sm:text-6xl">{sectionFour.title}</h2>
        <p className="mt-6 text-2xl font-bold text-fuchsia-100">{sectionFour.phoneLabel}: {sectionFour.phoneNumber}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={sectionFour.primaryCta.href} className="rounded-xl bg-cyan-300 px-6 py-3 font-black text-[#032033]">
            {sectionFour.primaryCta.label}
          </Link>
          <Link href={sectionFour.secondaryCta.href} className="rounded-xl border border-fuchsia-200/60 px-6 py-3 font-black text-fuchsia-100">
            {sectionFour.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

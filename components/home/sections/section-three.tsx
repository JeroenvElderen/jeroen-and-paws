import Image from "next/image";
import Link from "next/link";

import { sectionThree } from "@/lib/data/homepage-data";

export function SectionThreeImages() {
  const [first, second] = sectionThree.visuals;

  return (
    <section id="about" className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-2">
        <article className="rounded-[2.2rem] border border-white/20 bg-[#081a31]/75 p-6 backdrop-blur-xl">
          <div className="relative h-72 overflow-hidden rounded-3xl sm:h-96">
            <Image src={first.image.src} alt={first.image.alt} fill className="object-cover" />
          </div>
          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">{first.title}</h2>
          {first.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-cyan-100/90">
              {paragraph}
            </p>
          ))}
          <Link href={first.cta.href} className="mt-6 inline-flex rounded-xl bg-fuchsia-300 px-5 py-3 font-black text-[#20043b]">
            {first.cta.label}
          </Link>
        </article>

        <article className="rounded-[2.2rem] border border-white/20 bg-[#06172c]/75 p-6 backdrop-blur-xl">
          <h2 className="text-3xl font-black text-white sm:text-4xl">{second.title}</h2>
          <p className="mt-4 text-cyan-100/90">{second.intro}</p>
          <ul className="mt-5 space-y-3">
            {second.highlights.map((highlight) => (
              <li key={highlight} className="rounded-xl border border-emerald-300/30 bg-emerald-200/10 p-3 text-emerald-100">
                {highlight}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-fuchsia-100">{second.footerPrefix} <span className="font-black">{second.footerAccent}</span> {second.footerSuffix}</p>
          <div className="relative mt-6 h-72 overflow-hidden rounded-3xl sm:h-80">
            <Image src={second.image.src} alt={second.image.alt} fill className="object-cover" />
          </div>
        </article>
      </div>
    </section>
  );
}

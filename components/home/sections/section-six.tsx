import Image from "next/image";

import { sectionSix } from "@/lib/data/homepage-data";

export function SectionSixFaq() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="premium-section playful-panel relative isolate">
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute right-0 top-0 h-24 w-44" />

        <h2 className="premium-title text-center">{sectionSix.title}</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectionSix.logos.map((logo) => (
            <article
              key={logo.alt}
              className="rounded-3xl border border-white/20 bg-[#25183d]/70 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.3)]"
            >
              <div className="relative h-36 overflow-hidden rounded-2xl">
                <Image src={logo.src} alt={logo.alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

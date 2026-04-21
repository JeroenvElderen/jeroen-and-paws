import Image from "next/image";

import { sectionFive } from "@/lib/data/homepage-data";

export function SectionFiveTeam() {
  return (
    <section id="reviews" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="premium-section playful-panel relative isolate">
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute left-0 top-0 h-24 w-44" />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="premium-title">{sectionFive.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#e3cbff] sm:text-[1.35rem]">{sectionFive.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sectionFive.members.map((member) => (
            <article
              key={member.name}
              className="dynamic-band text-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mx-auto max-w-[24rem] rounded-[3rem] border border-white/15 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
                <div
                  className="relative h-[22rem] overflow-hidden rounded-[2.4rem]"
                  style={{ backgroundColor: member.image.bgColor }}
                >
                  <Image src={member.image.src} alt={member.image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              </div>

              <h3 className="mt-7 text-[1.7rem] font-extrabold leading-tight text-[#fff4ff]">{member.name}</h3>
              <p className="mt-2 text-[1.05rem] font-bold text-[#ff9ec9]">{member.role}</p>
              <p className="mt-4 text-left text-[1rem] leading-relaxed text-[#e3cbff]">&ldquo;{member.quote}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

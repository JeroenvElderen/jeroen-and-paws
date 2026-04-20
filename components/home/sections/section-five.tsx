import Image from "next/image";

import { sectionFive } from "@/lib/data/homepage-data";

export function SectionFiveTeam() {
  return (
    <section id="reviews" className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="premium-title">{sectionFive.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#bda5e9] sm:text-[1.35rem]">{sectionFive.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sectionFive.members.map((member) => (
            <article key={member.name} className="rounded-3xl border border-white/10 bg-[#1e1530]/80 p-5 text-center transition-transform hover:-translate-y-1">
              <div className="mx-auto max-w-[24rem] rounded-[3rem] border border-white/15 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
                <div
                  className="relative h-[22rem] overflow-hidden rounded-[2.4rem]"
                  style={{ backgroundColor: member.image.bgColor }}
                >
                  <Image src={member.image.src} alt={member.image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              </div>

              <h3 className="mt-7 text-[1.7rem] font-extrabold leading-tight text-[#efe3ff]">{member.name}</h3>
              <p className="mt-2 text-[1.05rem] font-bold text-[#9d64ff]">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

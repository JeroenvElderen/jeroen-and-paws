import Image from "next/image";

import { sectionFive } from "@/lib/data/homepage-data";

export function SectionFiveTeam() {
  return (
    <section className="px-6 pb-24 pt-4 sm:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold text-[#111f77] sm:text-5xl">{sectionFive.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[#4f5b89] sm:text-[1.35rem]">{sectionFive.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sectionFive.members.map((member) => (
            <article key={member.name} className="text-center">
              <div className="mx-auto max-w-[24rem] rounded-[6rem] border-[10px] border-white p-0 shadow-[0_24px_60px_rgba(13,28,105,0.10)]">
                <div
                  className="relative h-[30rem] overflow-hidden rounded-[5.4rem]"
                  style={{ backgroundColor: member.image.bgColor }}
                >
                  <Image src={member.image.src} alt={member.image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
              </div>

              <h3 className="mt-9 text-[2rem] font-extrabold leading-tight text-[#101f78]">{member.name}</h3>
              <p className="mt-3 text-[1.35rem] font-bold text-[#ff6436]">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
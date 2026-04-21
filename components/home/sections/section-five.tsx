import Image from "next/image";

import { sectionFive } from "@/lib/data/homepage-data";

export function SectionFiveTeam() {
  return (
    <section id="reviews" className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/20 bg-[#08172d]/70 p-6 backdrop-blur-xl lg:p-10">
        <h2 className="text-center text-4xl font-black text-white sm:text-5xl">{sectionFive.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-cyan-100/90">{sectionFive.subtitle}</p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {sectionFive.members.map((member) => (
            <article key={member.name} className="rounded-3xl border border-white/20 bg-white/5 p-4">
              <div className="relative h-72 overflow-hidden rounded-2xl">
                <Image src={member.image.src} alt={member.image.alt} fill className="object-cover" />
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">{member.name}</h3>
              <p className="text-fuchsia-200">{member.role}</p>
              <p className="mt-3 text-cyan-100/90">“{member.quote}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

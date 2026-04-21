"use client";

import Image from "next/image";
import Link from "next/link";
import { Footprints, GraduationCap, MoonStar, Route, Sparkles, Sun } from "lucide-react";

import { sectionTwo, type HomepageSectionTwoCard } from "@/lib/data/homepage-data";

function ServiceCardIcon({ icon }: { icon: HomepageSectionTwoCard["icon"] }) {
  const className = "h-6 w-6 text-white";

  if (icon === "walk") return <Footprints className={className} strokeWidth={2.2} />;
  if (icon === "day") return <Sun className={className} strokeWidth={2.2} />;
  if (icon === "overnight") return <MoonStar className={className} strokeWidth={2.2} />;
  if (icon === "training") return <GraduationCap className={className} strokeWidth={2.2} />;
  if (icon === "custom") return <Sparkles className={className} strokeWidth={2.2} />;

  return <Route className={className} strokeWidth={2.2} />;
}

function ServiceCardItem({ card }: { card: HomepageSectionTwoCard }) {
  return (
    <article className="group snap-start overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-r from-[#281a44]/88 via-[#211537]/82 to-[#1b122f]/86 shadow-[0_18px_46px_rgba(0,0,0,0.32)] backdrop-blur-sm">
      <div className="grid min-h-[20rem] md:grid-cols-[0.45fr_0.55fr]">
        <div className="relative h-52 overflow-hidden md:h-full">
          <Image
            src={card.image}
            alt={`${card.title} service`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, 34vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(24,13,40,0.9)] to-transparent" />
          <div
            className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
            style={{ backgroundColor: card.iconBg }}
            aria-hidden="true"
          >
            <ServiceCardIcon icon={card.icon} />
          </div>
        </div>

        <div className="flex min-h-[230px] flex-col px-6 py-7 sm:px-8">
          <h3 className="text-[1.9rem] font-extrabold leading-[1.05] text-[#fff3ff]">{card.title}</h3>
          <div className="mt-4 h-[0.2rem] w-14 rounded-full bg-gradient-to-r from-[#ff74b3] to-[#8f63ff]" />
          <p className="mt-5 max-w-xl text-base leading-[1.7] text-[#dfc3ff] sm:text-lg">{card.description}</p>

          <Link href={card.href} className="mt-auto inline-flex items-center gap-3 pt-7 text-base font-extrabold text-[#ffd4ef] sm:text-lg">
            Learn More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SectionTwoServices() {
  return (
    <section id="services" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="flow-section playful-panel relative isolate mb-8">
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute left-0 top-0 h-24 w-48" />
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2d7ff]">Our Services</p>
            <h2 className="premium-title mt-3">Care options built around your dog&apos;s needs</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#e3cbff] sm:text-base">
            Explore walking, training, daycare, home check-ins, and boarding options with flexible support for every routine.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:thin] [scrollbar-color:#8f63ff_transparent]">
          {sectionTwo.cards.map((card) => (
            <div key={card.title} className="min-w-[84%] sm:min-w-[70%] lg:min-w-[55%]">
              <ServiceCardItem card={card} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-[#ccafe9]">Scroll horizontally to explore each service in a continuous flow.</p>
      </div>
    </section>
  );
}

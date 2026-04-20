"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Footprints,
  GraduationCap,
  MoonStar,
  Route,
  Sparkles,
  Sun,
} from "lucide-react";

import { sectionTwo, type HomepageSectionTwoCard } from "@/lib/data/homepage-data";

function getVisibleCards(cards: HomepageSectionTwoCard[], start: number, count: number) {
  return Array.from({ length: count }, (_, offset) => cards[(start + offset) % cards.length]);
}

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
    <article className="group overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(0,0,0,0.5)]">
      <div className="relative h-44 overflow-hidden">
        <Image
          src={card.image}
          alt={`${card.title} service`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,10,31,0.8)] to-transparent" />
        <div
          className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
          style={{ backgroundColor: card.iconBg }}
          aria-hidden="true"
        >
          <ServiceCardIcon icon={card.icon} />
        </div>
      </div>

      <div className="flex min-h-[230px] flex-col px-6 py-7">
        <h3 className="text-[1.7rem] font-extrabold leading-[1.1] text-[#efe3ff]">{card.title}</h3>
        <div className="mt-4 h-[0.2rem] w-14 rounded-full bg-[#9d64ff]" />
        <p className="mt-5 text-base leading-[1.55] text-[#bca3e7]">{card.description}</p>

        <Link href={card.href} className="mt-auto inline-flex items-center gap-3 pt-7 text-base font-extrabold text-primary">
          Learn More <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function SectionTwoServices() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = useMemo(() => getVisibleCards(sectionTwo.cards, startIndex, 4), [startIndex]);

  return (
    <section id="services" className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section mb-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Tailored services</p>
            <h2 className="premium-title mt-3">Choose a premium care experience</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#bda5e9] sm:text-base">
            Swipe through concierge-grade options designed to match your pet&apos;s rhythm, temperament, and routine.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => setStartIndex((index) => (index - 1 + sectionTwo.cards.length) % sectionTwo.cards.length)}
            className="hidden rounded-full border border-border/90 bg-card p-3 text-primary/70 transition-colors hover:bg-secondary lg:block"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="grid flex-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {visibleCards.map((card, index) => (
              <ServiceCardItem key={`${card.title}-${index}`} card={card} />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next services"
            onClick={() => setStartIndex((index) => (index + 1) % sectionTwo.cards.length)}
            className="hidden rounded-full border border-border/90 bg-card p-3 text-primary/70 transition-colors hover:bg-secondary lg:block"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
}

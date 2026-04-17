"use client";

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
  const className = "h-8 w-8 text-white";

  if (icon === "walk") return <Footprints className={className} strokeWidth={2.2} />;
  if (icon === "day") return <Sun className={className} strokeWidth={2.2} />;
  if (icon === "overnight") return <MoonStar className={className} strokeWidth={2.2} />;
  if (icon === "training") return <GraduationCap className={className} strokeWidth={2.2} />;
  if (icon === "custom") return <Sparkles className={className} strokeWidth={2.2} />;

  return <Route className={className} strokeWidth={2.2} />;
}

function ServiceCardItem({ card }: { card: HomepageSectionTwoCard }) {
  return (
    <article className="flex min-h-[320px] flex-col rounded-[2.2rem] bg-[#f2f3f5] px-8 py-9">
      <div
        className="mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full"
        style={{ backgroundColor: card.iconBg }}
        aria-hidden="true"
      >
        <ServiceCardIcon icon={card.icon} />
      </div>

      <h3 className="text-[2.6rem] font-extrabold leading-[1.1] text-[#101f78]">{card.title}</h3>
      <div className="mt-5 h-[0.2rem] w-14 rounded-full bg-[#ff6436]" />
      <p className="mt-6 text-[1.95rem] leading-[1.35] text-[#5f678b]">{card.description}</p>

      <Link
        href={card.href}
        className="mt-auto inline-flex items-center gap-4 pt-8 text-[1.45rem] font-extrabold text-[#263985]"
      >
        Learn More <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export function SectionTwoServices() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCards = useMemo(() => getVisibleCards(sectionTwo.cards, startIndex, 4), [startIndex]);

  return (
    <section className="bg-[#f7f1eb] px-6 py-16 sm:px-10 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6">
        <button
          type="button"
          aria-label="Previous services"
          onClick={() => setStartIndex((index) => (index - 1 + sectionTwo.cards.length) % sectionTwo.cards.length)}
          className="hidden rounded-full p-3 text-[#4d5ca0] transition-colors hover:bg-white/70 lg:block"
        >
          <ChevronLeft className="h-9 w-9" />
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
          className="hidden rounded-full p-3 text-[#4d5ca0] transition-colors hover:bg-white/70 lg:block"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      </div>
    </section>
  );
}
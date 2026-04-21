"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { sectionTwo } from "@/lib/data/homepage-data";

function visible(start: number, count: number) {
  return Array.from({ length: count }, (_, i) => sectionTwo.cards[(start + i) % sectionTwo.cards.length]);
}

export function SectionTwoServices() {
  const [index, setIndex] = useState(0);
  const cards = useMemo(() => visible(index, 4), [index]);

  return (
    <section id="services" className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-7xl rounded-[2.5rem] border border-white/20 bg-[#0a1b33]/70 p-6 backdrop-blur-xl lg:p-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-200">Service menu</p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Mix-and-match care plans</h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button onClick={() => setIndex((value) => (value - 1 + sectionTwo.cards.length) % sectionTwo.cards.length)} className="rounded-xl border border-white/20 p-3 text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setIndex((value) => (value + 1) % sectionTwo.cards.length)} className="rounded-xl border border-white/20 p-3 text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => (
            <article key={`${card.title}-${i}`} className="group flex h-full flex-col rounded-3xl border border-cyan-200/40 bg-gradient-to-b from-cyan-300/20 to-fuchsia-300/10 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-2xl font-black text-white">{card.title}</h3>
              <p className="mt-3 text-cyan-100/90">{card.description}</p>
              <Link href={card.href} className="mt-auto pt-6 text-sm font-black uppercase tracking-[0.15em] text-fuchsia-200">
                Explore package →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

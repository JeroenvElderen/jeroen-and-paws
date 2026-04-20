"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";

import { sectionSix } from "@/lib/data/homepage-data";

export function SectionSixFaq() {
  const [openItem, setOpenItem] = useState<string | null>(sectionSix.items[0]?.question ?? null);

  return (
    <section id="faq" className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="premium-section playful-panel relative isolate grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="playful-waves pointer-events-none absolute inset-x-0 bottom-0 h-24" />
        <div className="playful-ribbons pointer-events-none absolute right-0 top-0 h-24 w-44" />
        <div>
          <h2 className="premium-title tracking-tight">{sectionSix.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#e3cbff] sm:text-xl">{sectionSix.subtitle}</p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/25 bg-[#23163a]/60 shadow-[0_20px_50px_rgba(0,0,0,0.32)]">
            {sectionSix.items.map((item) => {
              const isOpen = openItem === item.question;

              return (
                <article key={item.question} className="border-t border-white/20 first:border-t-0">
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? null : item.question)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1.25rem] font-semibold leading-tight text-[#f7e8ff] sm:text-[1.45rem]">{item.question}</span>
                    <Plus
                      className={`h-6 w-6 shrink-0 text-[#ff9ec9] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen ? <p className="px-5 pb-5 pr-10 text-base leading-relaxed text-[#e1c6ff] sm:text-lg">{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[33rem] rounded-[3rem] border border-white/25 bg-[#1e1334] p-3 shadow-[0_24px_65px_rgba(0,0,0,0.45)]">
          <div className="relative h-[38rem] overflow-hidden rounded-[2.3rem] bg-[#63459a] sm:h-[42rem]">
            <Image src={sectionSix.image.src} alt={sectionSix.image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 44vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

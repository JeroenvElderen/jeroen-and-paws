"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";

import { sectionSix } from "@/lib/data/homepage-data";

export function SectionSixFaq() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section id="faq" className="px-6 py-10 sm:px-10 lg:px-12">
      <div className="premium-section grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <h2 className="premium-title tracking-tight">{sectionSix.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#bda5e9] sm:text-xl">{sectionSix.subtitle}</p>

          <div className="mt-10 border-b border-[#4a356f]">
            {sectionSix.items.map((item) => {
              const isOpen = openItem === item.question;

              return (
                <article key={item.question} className="border-t border-[#4a356f]">
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? null : item.question)}
                    className="flex w-full items-center justify-between gap-6 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[1.65rem] font-semibold leading-tight text-[#d8c1ff] sm:text-[1.85rem]">{item.question}</span>
                    <Plus
                      className={`h-6 w-6 shrink-0 text-[#b486ff] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      strokeWidth={2.1}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen ? <p className="pb-4 pr-10 text-base leading-relaxed text-[#b69bdc] sm:text-lg">{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[33rem] rounded-[8rem] border-[14px] border-white shadow-[0_24px_65px_rgba(0,0,0,0.45)]">
          <div className="relative h-[44rem] overflow-hidden rounded-[7rem] bg-[#63459a] sm:h-[46rem]">
            <Image src={sectionSix.image.src} alt={sectionSix.image.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 44vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { sectionSix } from "@/lib/data/homepage-data";

export function SectionSixFaq() {
  const [openItem, setOpenItem] = useState(sectionSix.items[0]?.question ?? "");

  return (
    <section id="faq" className="px-4 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-6 rounded-[2.5rem] border border-white/20 bg-[#061429]/75 p-6 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
        <div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">{sectionSix.title}</h2>
          <p className="mt-4 text-cyan-100/90">{sectionSix.subtitle}</p>

          <div className="mt-8 space-y-3">
            {sectionSix.items.map((item) => {
              const isOpen = openItem === item.question;

              return (
                <article key={item.question} className="rounded-2xl border border-white/20 bg-white/5 p-4">
                  <button
                    type="button"
                    onClick={() => setOpenItem(isOpen ? "" : item.question)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-lg font-bold text-white">{item.question}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-fuchsia-200" /> : <Plus className="h-5 w-5 text-cyan-200" />}
                  </button>
                  {isOpen ? <p className="mt-3 text-cyan-100/90">{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative h-[28rem] overflow-hidden rounded-3xl border border-cyan-300/40">
          <Image src={sectionSix.image.src} alt={sectionSix.image.alt} fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}

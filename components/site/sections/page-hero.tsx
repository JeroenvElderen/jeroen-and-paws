import type { LucideIcon } from "lucide-react";

import { SectionLabel } from "@/components/site/ui/section-label";

export function PageHero({ icon, label, title, text }: { icon: LucideIcon; label: string; title: string; text: string }) {
  return (
    <section className="bg-[#f8f3ff] px-6 py-20 text-center sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionLabel icon={icon}>{label}</SectionLabel>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-slate-600">{text}</p>
      </div>
    </section>
  );
}

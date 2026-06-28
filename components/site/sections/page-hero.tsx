import type { LucideIcon } from "lucide-react";

import { SectionLabel } from "@/components/site/ui/section-label";

export function PageHero({
  icon,
  label,
  title,
  text,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="premium-hero-orb bg-[#080b10] px-5 py-14 text-center sm:py-20 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionLabel icon={icon}>{label}</SectionLabel>
        <h1 className="text-5xl font-extrabold tracking-tight text-[#fff7e8] sm:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#b9aa99]">
          {text}
        </p>
      </div>
    </section>
  );
}

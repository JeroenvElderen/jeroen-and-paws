import type { LucideIcon } from "lucide-react";

import { SectionLabel } from "@/components/site/ui/section-label";

export function SectionHeader({ icon, label, title, text, light = false }: { icon: LucideIcon; label: string; title: string; text: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <SectionLabel icon={icon} light={light}>{label}</SectionLabel>
      <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${light ? "text-white" : "text-white"}`}>{title}</h2>
      <p className={`mt-4 text-lg leading-8 ${light ? "text-violet-100" : "text-slate-300"}`}>{text}</p>
    </div>
  );
}

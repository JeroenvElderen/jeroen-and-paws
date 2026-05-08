import type { LucideIcon } from "lucide-react";

export function SectionLabel({ icon: Icon, children, light = false }: { icon: LucideIcon; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] ${light ? "text-violet-100" : "text-violet-300"}`}>
      <Icon aria-hidden="true" className="h-4 w-4" />
      {children}
    </p>
  );
}

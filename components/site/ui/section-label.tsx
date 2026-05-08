import type { LucideIcon } from "lucide-react";

export function SectionLabel({ icon: Icon, children, light = false }: { icon: LucideIcon; children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] ${light ? "text-purple-100" : "text-purple-700"}`}>
      <Icon aria-hidden="true" className="h-4 w-4" />
      {children}
    </p>
  );
}

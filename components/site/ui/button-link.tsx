import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "light";
};

const variants = {
  primary: "bg-violet-700 text-white shadow-lg shadow-black/25 hover:bg-violet-800",
  outline: "border-2 border-violet-400 text-violet-100 hover:bg-violet-950",
  light: "bg-slate-900 text-violet-100 hover:bg-violet-950",
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-bold transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

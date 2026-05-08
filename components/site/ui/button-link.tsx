import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "light";
};

const variants = {
  primary: "bg-emerald-700 text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-800",
  outline: "border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-50",
  light: "bg-white text-emerald-800 hover:bg-emerald-50",
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-bold transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

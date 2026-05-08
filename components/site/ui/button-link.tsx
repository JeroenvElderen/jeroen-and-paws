import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "light";
};

const variants = {
  primary: "bg-purple-700 text-white shadow-lg shadow-purple-900/10 hover:bg-purple-800",
  outline: "border-2 border-purple-700 text-purple-800 hover:bg-purple-50",
  light: "bg-white text-purple-800 hover:bg-purple-50",
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-bold transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

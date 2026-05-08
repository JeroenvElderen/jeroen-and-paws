import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "light";
};

const variants = {
  primary:
    "bg-[#d1a34d] text-[#080b10] shadow-lg shadow-black/25 hover:bg-[#e0b862]",
  outline: "border-2 border-[#d1a34d] text-[#f6d184] hover:bg-[#1d1711]",
  light: "bg-[#fff7e8] text-[#080b10] hover:bg-[#f2ddad]",
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-bold transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "light";
};

const variants = {
  primary:
    "bg-[#8b5cf6] text-[#080b10] shadow-lg shadow-black/25 hover:bg-[#a78bfa]",
  outline: "border-2 border-[#8b5cf6] text-[#c4b5fd] hover:bg-[#1f1738]",
  light: "bg-[#fff7e8] text-[#080b10] hover:bg-[#ddd6fe]",
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`motion-button premium-button relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-5 py-4 text-center text-base font-bold sm:w-auto sm:px-7 sm:py-3 transition hover:-translate-y-0.5 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

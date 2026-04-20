import Link from "next/link";

import { navLinks, socialLinks } from "@/lib/data/navigation-data";

export function SiteMenu() {
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-3xl border border-border/80 bg-card/85 px-5 py-4 shadow-[0_14px_38px_rgba(8,6,16,0.35)] backdrop-blur sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#efe3ff]">
          <span className="text-3xl leading-none">♡</span>
          <div>
            <p className="text-2xl font-extrabold leading-none sm:text-3xl">Jeroen &amp; Paws</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bda5e9]">Dog Walking · Training · Boarding</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex h-8 min-w-8 items-center justify-center rounded-full border border-border bg-secondary px-2 text-xs font-bold uppercase text-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground sm:gap-6 sm:text-base">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

import { navLinks, socialLinks } from "@/lib/data/navigation-data";

export function SiteMenu() {
  return (
    <header className="px-6 pt-8 sm:px-10 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border border-border/80 bg-card/70 px-6 py-4 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 text-[#efe3ff]">
          <span className="text-3xl leading-none">♡</span>
          <div>
            <p className="text-4xl font-extrabold leading-none">Best.Pet</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bda5e9]">Signature Pet Concierge</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-lg font-semibold text-muted-foreground lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

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
    </header>
  );
}

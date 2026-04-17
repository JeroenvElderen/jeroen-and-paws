import Link from "next/link";

import { navLinks, socialLinks } from "@/lib/data/navigation-data";

export function SiteMenu() {
  return (
    <header className="px-6 pt-8 sm:px-10 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-[#15277a]">
          <span className="text-3xl leading-none">♡</span>
          <div>
            <p className="text-4xl font-extrabold leading-none">Best.Pet</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4f5d95]">Safe and caring hands</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-lg font-semibold text-[#525f89] lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#15277a]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {socialLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[#ff6a3b] px-2 text-xs font-bold uppercase text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
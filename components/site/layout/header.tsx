"use client";

import { Menu, PawPrint, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { navItems, type PageName } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";

export function Header({ activePage }: { activePage: PageName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-3 text-xl font-extrabold text-violet-300" onClick={() => setIsOpen(false)}>
          <PawPrint aria-hidden="true" className="h-6 w-6 fill-current" />
          Jeroen & Paws
        </Link>

        <button
          type="button"
          className="inline-flex rounded-full border border-white/10 p-2 text-violet-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
        </button>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${activePage === item.page ? "bg-violet-500/15 text-violet-100" : "text-slate-300 hover:bg-slate-900 hover:text-violet-100"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/contact" className="hidden md:inline-flex">
          Book a Walk
        </ButtonLink>
      </div>

      {isOpen ? (
        <nav className="border-t border-white/10 bg-slate-950 px-6 pb-6 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 font-bold ${activePage === item.page ? "bg-violet-500/15 text-violet-100" : "text-slate-300"}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" className="mt-2" onClick={() => setIsOpen(false)}>
              Book a Walk
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

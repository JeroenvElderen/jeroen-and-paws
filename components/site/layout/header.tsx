"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { navItems, type PageName } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";

export function Header({ activePage }: { activePage: PageName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#8b5cf6]/15 bg-[#080b10]/95 shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-4 sm:min-h-20 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo3.svg"
            alt="Jeroen & Paws"
            width={152}
            height={90}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <button
          type="button"
          className="inline-flex rounded-full border border-[#8b5cf6]/25 bg-[#111821] p-2 text-[#c4b5fd] shadow-lg shadow-black/20 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" />
          )}
        </button>

        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activePage === item.page ? "page" : undefined}
              className={`premium-nav-link rounded-full px-5 py-2 text-sm font-bold transition ${activePage === item.page ? "text-[#c4b5fd]" : "text-[#b9aa99] hover:text-[#c4b5fd]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/contact" className="hidden max-md:hidden md:inline-flex">
          Book a Free Meet & Greet
        </ButtonLink>
      </div>

      {isOpen ? (
        <nav
          className="mobile-menu-panel border-t border-[#8b5cf6]/15 bg-[#080b10] px-4 pb-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-4">
            <p className="mb-2 rounded-2xl border border-[#8b5cf6]/15 bg-[#111821] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#a78bfa]">
              Premium care, one tap away
            </p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 font-bold ring-1 ring-transparent transition ${activePage === item.page ? "bg-[#24163f] text-[#c4b5fd] ring-[#8b5cf6]/25" : "bg-white/[0.03] text-[#b9aa99] hover:bg-white/[0.06] hover:text-[#ddd6fe]"}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/contact"
              className="mt-2"
              onClick={() => setIsOpen(false)}
            >
              Book a Free Meet & Greet
            </ButtonLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

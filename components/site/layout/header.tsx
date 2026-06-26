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
    <header className={`top-0 z-40 border-b border-[#8b5cf6]/15 bg-[#080b10]/95 backdrop-blur ${activePage === "home" ? "absolute w-full border-transparent bg-transparent md:sticky md:border-[#8b5cf6]/15 md:bg-[#080b10]/95" : "sticky"}`}>
      <div className="mx-auto flex min-h-28 w-full max-w-6xl items-center justify-between px-8 sm:min-h-20 sm:px-8">
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
            className="h-16 w-auto sm:h-14"
          />
        </Link>

        {activePage === "home" ? (
          <ButtonLink
            href="/contact"
            className="ml-auto mr-6 hidden w-auto rounded-[6px] bg-[#6f45ad] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white hover:bg-[#7c55ba] min-[390px]:inline-flex md:hidden"
            onClick={() => setIsOpen(false)}
          >
            Book a Session
          </ButtonLink>
        ) : null}

        <button
          type="button"
          className="inline-flex rounded-none border-0 p-0 text-[#fff7e8] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-11 w-11" />
          ) : (
            <Menu aria-hidden="true" className="h-11 w-11" />
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
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${activePage === item.page ? "bg-[#24163f] text-[#c4b5fd]" : "text-[#b9aa99] hover:bg-[#111821] hover:text-[#c4b5fd]"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/contact" className="hidden rounded-[6px] bg-[#6f45ad] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-[#7c55ba] md:inline-flex">
          {activePage === "home" ? "Book a Session" : "Book a Free Meet & Greet"}
        </ButtonLink>
      </div>

      {isOpen ? (
        <nav
          className="border-t border-[#8b5cf6]/15 bg-[#080b10] px-4 pb-6 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 font-bold ${activePage === item.page ? "bg-[#24163f] text-[#c4b5fd]" : "text-[#b9aa99]"}`}
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

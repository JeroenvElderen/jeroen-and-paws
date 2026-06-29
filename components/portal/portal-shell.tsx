"use client";

import { CalendarDays, CircleHelp, FileText, Home, ImageIcon, LogOut, PawPrint, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Dashboard } from "./dashboard";
import { FAQ } from "./faq";
import { Invoices } from "./invoices";
import { MyBookings } from "./my-bookings";
import { Profile } from "./profile";
import { SessionGalleries } from "./session-galleries";

const navItems = [
  ["dashboard", Home, "Dashboard"],
  ["bookings", CalendarDays, "My Bookings"],
  ["photos", ImageIcon, "Session Galleries"],
  ["invoices", FileText, "Invoices"],
  ["profile", User, "Profile"],
  ["faq", CircleHelp, "FAQ"],
] as const;

type PortalView = (typeof navItems)[number][0];

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="px-4 py-5 sm:px-8 lg:px-10 lg:py-8">
      <section className="mx-auto max-w-6xl rounded-[1.4rem] border border-[#24163f]/10 bg-white p-8 shadow-[0_20px_60px_rgba(29,23,40,0.08)]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#6d4b9b]">Portal</p>
        <h1 className="mt-4 text-3xl font-semibold text-[#2d2140]">{title}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-[#665d70]">
          This portal section is ready to become its own component when the content is designed.
        </p>
      </section>
    </div>
  );
}

export function PortalShell() {
  const [activeView, setActiveView] = useState<PortalView>("dashboard");

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [activeView]);

  const ActiveContent = (() => {
    if (activeView === "dashboard") return <Dashboard />;
    if (activeView === "bookings") return <MyBookings />;
    if (activeView === "photos") {
      return <SessionGalleries onBackToDashboard={() => setActiveView("dashboard")} />;
    }
    if (activeView === "invoices") return <Invoices />;
    if (activeView === "profile") {
      return <Profile onBackToDashboard={() => setActiveView("dashboard")} />;
    }
    if (activeView === "faq") {
      return <FAQ onBackToDashboard={() => setActiveView("dashboard")} />;
    }

    const current = navItems.find(([key]) => key === activeView);
    return <PlaceholderView title={current?.[2] ?? "Portal"} />;
  })();

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#1d1728]">
      <div className="grid min-h-screen lg:grid-cols-[17.5rem_1fr]">
        <aside className="hidden bg-[#080b10] text-[#fff7e8] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden">
          <nav className="mt-6 flex flex-1 flex-col gap-2 px-5" aria-label="Customer portal navigation">
            {navItems.map(([key, Icon, label]) => {
              const isActive = activeView === key;

              return (
                <button
                  key={key}
                  type="button"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveView(key)}
                  className={`group flex items-center gap-4 rounded-xl px-5 py-4 text-left text-sm font-bold transition ${isActive ? "bg-[#24163f] text-white shadow-lg shadow-[#000]/20" : "text-[#f5e9d5]/85 hover:bg-white/[0.06] hover:text-white"}`}
                >
                  <Icon aria-hidden="true" className="size-5 text-[#c4b5fd] transition group-hover:scale-105" />
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="mx-5 mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="p-5">
              <p className="font-semibold text-[#c4b5fd]">Need help?</p>
              <p className="mt-2 text-sm leading-6 text-[#f5e9d5]/80">Message us anytime about a booking, photo, or care note.</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#6d4b9b] px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white">
                Send a message <PawPrint aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="relative h-36">
              <Image src="/images/dogs/walk.jpeg" alt="Jeroen walking dogs through woodland" fill sizes="280px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10]" />
            </div>
          </div>

          <button type="button" className="mb-6 ml-8 inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.16em] text-[#f5e9d5]/90">
            <LogOut aria-hidden="true" className="size-5 text-[#c4b5fd]" /> Log out
          </button>
        </aside>

        <div className="min-w-0">
          <nav className="border-b border-[#24163f]/10 bg-white/75 px-4 py-3 backdrop-blur lg:hidden" aria-label="Mobile customer portal navigation">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {navItems.map(([key, Icon, label]) => {
                const isActive = activeView === key;

                return (
                  <button
                    key={key}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setActiveView(key)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition ${isActive ? "border-[#4d2e91] bg-[#24163f] text-white" : "border-[#24163f]/10 bg-white text-[#3a3048]"}`}
                  >
                    <Icon aria-hidden="true" className="size-4 text-[#c4b5fd]" />
                    {label}
                  </button>
                );
              })}
            </div>
          </nav>

          {ActiveContent}
        </div>
      </div>
    </main>
  );
}

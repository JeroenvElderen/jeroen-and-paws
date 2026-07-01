"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronsLeft,
  Dog,
  FileText,
  HelpCircle,
  Home,
  ImageIcon,
  Menu,
  PawPrint,
  Search,
  Settings,
  Star,
  Users,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { BackendBookings } from "./backend-bookings";
import { BackendDashboardOverview } from "./backend-dashboard-overview";
import { BackendPlaceholder } from "./backend-placeholder";
import { BackendServices } from "./backend-services";
import { BackendDogs } from "./backend-dogs";
import { BackendClients } from "./backend-clients";
import { BackendCalendar } from "./backend-calendar";
import { BackendInvoices } from "./backend-invoices";
import { BackendPhotoUpdates } from "./backend-photo-updates";
import { BackendFAQ } from "./backend-faq";
import { BackendSettings } from "./backend-settings";

const navGroups = [
  { label: "", items: [["dashboard", Home, "Dashboard"]] },
  { label: "Manage", items: [["bookings", CalendarDays, "Bookings"], ["services", PawPrint, "Services"], ["dogs", Dog, "Dogs"], ["clients", Users, "Clients"], ["calendar", CalendarDays, "Calendar"]] },
  { label: "Business", items: [["invoices", FileText, "Invoices"]] },
  { label: "Content", items: [["photo-updates", ImageIcon, "Photo Updates"], ["reviews", Star, "Reviews"], ["faq", HelpCircle, "FAQ"]] },
  { label: "Settings", items: [["settings", Settings, "Settings"]] },
] as const;

type BackendView = (typeof navGroups)[number]["items"][number][0];

function getViewTitle(activeView: BackendView) {
  for (const group of navGroups) {
    const item = group.items.find(([key]) => key === activeView);

  if (item) return item[2];
  }

  return "Dashboard";
}

export function BackendDashboard() {
  const [activeView, setActiveView] = useState<BackendView>("dashboard");
  const activeTitle = getViewTitle(activeView);

  const ActiveContent = (() => {
    if (activeView === "dashboard") return <BackendDashboardOverview />;
    if (activeView === "bookings") return <BackendBookings />;
    if (activeView === "services") return <BackendServices />;
    if (activeView === "dogs") return <BackendDogs />;
    if (activeView === "clients") return <BackendClients />;
    if (activeView === "calendar") return <BackendCalendar />;
    if (activeView === "invoices") return <BackendInvoices />;
    if (activeView === "photo-updates") return <BackendPhotoUpdates />;
    if (activeView === "faq") return <BackendFAQ />;
    if (activeView === "settings") return <BackendSettings />;

    return <BackendPlaceholder title={activeTitle} />;
  })();

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#151124]">
      <div className="grid min-h-screen xl:grid-cols-[18rem_1fr]">
        <aside className="hidden bg-[#070a14] px-6 py-8 text-white xl:flex xl:flex-col">
          <div className="font-serif text-3xl leading-tight">jeroen<br />And Paws <PawPrint className="inline size-6 text-[#b8a1ff]" /></div>
          <nav className="mt-10 flex flex-1 flex-col gap-7" aria-label="Backend portal navigation">
            {navGroups.map((group) => (
              <div key={group.label || "main"}>
                {group.label && <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/58">{group.label}</p>}
                <div className="space-y-1.5">
                  {group.items.map(([key, Icon, label]) => {
                    const isActive = activeView === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setActiveView(key)}
                        className={`flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left text-sm font-semibold ${isActive ? "bg-[#4f2c91] text-white shadow-lg shadow-[#4f2c91]/30" : "text-white/88 hover:bg-white/8"}`}
                      >
                        <Icon className="size-5" /> {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="flex h-20 items-center justify-between border-b border-[#151124]/10 bg-white/86 px-5 backdrop-blur md:px-10">
            <Menu className="size-6" />
            <div className="flex items-center gap-5"><Bell className="size-5 text-[#3c246c]" /><label className="hidden items-center gap-3 rounded-lg border border-[#151124]/10 bg-white px-4 py-3 text-sm text-[#858093] shadow-sm sm:flex"><input className="w-56 bg-transparent outline-none" placeholder={activeView === "bookings" ? "Search bookings, clients, dogs..." : `Search ${activeTitle.toLowerCase()}...`} /><Search className="size-5" /></label></div>
          </header>

          {ActiveContent}
        </div>
      </div>
    </main>
  );
}
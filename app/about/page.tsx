import { AboutPageContent } from "@/components/site/pages/about-page";
            <div className="flex items-center gap-5"><span className="hidden text-sm font-semibold text-[#665d70] md:inline">{backendSession.email}</span><button type="button" onClick={() => { window.localStorage.removeItem(backendSessionStorageKey); setBackendSession(null); setActiveView("dashboard"); }} className="inline-flex items-center gap-2 rounded-lg border border-[#151124]/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#4f2c91]"><LogOut className="size-4" /> Log out</button><Bell className="size-5 text-[#3c246c]" /><label className="hidden items-center gap-3 rounded-lg border border-[#151124]/10 bg-white px-4 py-3 text-sm text-[#858093] shadow-sm sm:flex"><input className="w-56 bg-transparent outline-none" placeholder={activeView === "bookings" ? "Search bookings, clients, dogs..." : `Search ${activeTitle.toLowerCase()}...`} /><Search className="size-5" /></label></div>


export const metadata = buildPageMetadata({
  title: "About Jeroen | Dog Trainer, Walker & Boarding in Bray",
  description:
    "Meet Jeroen, a dog trainer, walker, and boarding provider offering calm, personalised care for dogs and families in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
  path: "/about",
  keywords: ["about Jeroen and Paws", "Bray dog care provider", "Wicklow dog trainer", "Dublin dog trainer", "Meath dog trainer"],
});

export default function AboutPage() {
  return <AboutPageContent />;
}

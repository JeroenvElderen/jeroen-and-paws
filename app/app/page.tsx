import { createClient } from "@supabase/supabase-js";
import { Apple, Download, ExternalLink, Smartphone } from "lucide-react";

import { SiteShell } from "@/components/site/layout/site-shell";
import { preferredMobileAppUrl, type MobileApp } from "@/utils/mobile-app";

export const metadata = {
  title: "Mobile App",
  description: "Download the latest Jeroen & Paws mobile app release.",
};
export const dynamic = "force-dynamic";

async function getMobileApps() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data } = await supabase.from("mobile_app").select("*").order("platform");
  return (data ?? []) as MobileApp[];
}

export default async function MobileAppPage() {
  const apps = await getMobileApps();
  return (
    <SiteShell activePage="app">
      <section className="relative overflow-hidden border-b border-[#8b5cf6]/15 px-4 py-20 sm:px-8 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.22),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl text-center"><p className="text-xs font-black uppercase tracking-[.24em] text-[#a78bfa]">Jeroen & Paws in your pocket</p><h1 className="mt-5 text-5xl font-black tracking-tight text-[#fff7e8] sm:text-7xl">The mobile app</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b9aa99]">Get the latest release and stay connected to your dog’s care wherever you are.</p></div>
      </section>
      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-2">
          {apps.map((app) => <ReleaseCard key={app.id} app={app} />)}
          {apps.length === 0 && <div className="col-span-full rounded-3xl border border-[#8b5cf6]/20 bg-[#111821] p-10 text-center text-[#b9aa99]">Release information is currently unavailable.</div>}
        </div>
      </section>
    </SiteShell>
  );
}

function ReleaseCard({ app }: { app: MobileApp }) {
  const android = app.platform === "android";
  const url = app.enabled ? preferredMobileAppUrl(app) : null;
  const action = app.store_url ? (android ? "Open Google Play" : "Open App Store") : app.download_url ? (android ? "Download APK" : "Open TestFlight") : "Coming Soon";
  const Icon = android ? Smartphone : Apple;
  return (
    <article className="motion-card motion-card-dark flex flex-col rounded-3xl border border-[#8b5cf6]/20 bg-[#111821] p-7 shadow-2xl shadow-black/20 sm:p-9">
      <div className="flex items-center justify-between"><span className="grid size-14 place-items-center rounded-2xl bg-[#24163f] text-[#c4b5fd]"><Icon className="size-7" /></span><span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[.16em] ${app.enabled ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-[#b9aa99]"}`}>{app.enabled ? "Released" : "Coming soon"}</span></div>
      <h2 className="mt-7 text-3xl font-black text-[#fff7e8]">{android ? "Android" : "iPhone"}</h2>
      <dl className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/[.035] p-4"><dt className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">Version</dt><dd className="mt-1 text-lg font-bold">{app.version || "—"}</dd></div>{android && <div className="rounded-2xl bg-white/[.035] p-4"><dt className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">Build</dt><dd className="mt-1 text-lg font-bold">{app.build ?? "—"}</dd></div>}</dl>
      <div className="mt-6 flex-1"><h3 className="text-xs font-bold uppercase tracking-wider text-[#a78bfa]">Release Notes</h3><p className="mt-3 whitespace-pre-wrap leading-7 text-[#b9aa99]">{app.release_notes || "Release notes will appear here."}</p></div>
      {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="motion-button mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-4 font-black text-[#080b10]">{action}{android && !app.store_url ? <Download className="size-5" /> : <ExternalLink className="size-5" />}</a> : <button disabled className="mt-8 rounded-full border border-white/10 bg-white/[.03] px-6 py-4 font-black text-[#b9aa99] opacity-60">Coming Soon</button>}
    </article>
  );
}

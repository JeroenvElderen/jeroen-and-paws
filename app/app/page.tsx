import { createClient } from "@supabase/supabase-js";
import {
  Apple,
  BadgeCheck,
  BellRing,
  ChevronRight,
  Download,
  ExternalLink,
  Info,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { SiteShell } from "@/components/site/layout/site-shell";
import { preferredMobileAppUrl, type MobileApp } from "@/utils/mobile-app";

export const metadata = {
  title: "Download the App",
  description: "Download the latest Jeroen & Paws app and follow the simple installation guide.",
};
export const dynamic = "force-dynamic";

async function getMobileApps() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("mobile_app").select("*").order("platform");
  if (error) {
    console.error("Unable to load mobile app releases:", error.message);
    return [];
  }
  return (data ?? []) as MobileApp[];
}

export default async function MobileAppPage() {
  const apps = await getMobileApps();

  return (
    <SiteShell activePage="app">
      <main className="overflow-hidden bg-[#080b10] text-[#fff7e8]">
        <section className="relative border-b border-white/10 px-4 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(139,92,246,.3),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(251,146,60,.12),transparent_26%)]" />
          <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/25 bg-[#8b5cf6]/10 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-[#c4b5fd]">
                <Sparkles className="size-4" aria-hidden="true" /> Jeroen & Paws in your pocket
              </div>
              <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-7xl">
                Your dog&apos;s care, <span className="text-[#a78bfa]">always close.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#c8bbac]">
                Download the latest app to keep up with bookings and your dog&apos;s care from wherever the day takes you.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#ded4c8]">
                <span className="flex items-center gap-2"><ShieldCheck className="size-5 text-emerald-400" />Secure download</span>
                <span className="flex items-center gap-2"><BadgeCheck className="size-5 text-emerald-400" />Latest release</span>
                <span className="flex items-center gap-2"><LockKeyhole className="size-5 text-emerald-400" />Private account</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 rounded-[3rem] bg-[#8b5cf6]/15 blur-3xl" />
              <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#18202b] to-[#0d1219] p-3 shadow-2xl shadow-black/60">
                <div className="rounded-[2rem] border border-white/10 bg-[#0b1016] p-7">
                  <div className="mx-auto h-1.5 w-20 rounded-full bg-white/15" />
                  <div className="mt-10 grid size-16 place-items-center rounded-2xl bg-[#8b5cf6] shadow-lg shadow-[#8b5cf6]/25">
                    <Smartphone className="size-8 text-white" />
                  </div>
                  <p className="mt-8 text-xs font-black uppercase tracking-[.2em] text-[#a78bfa]">One simple app</p>
                  <p className="mt-2 text-3xl font-black">More time for the moments that matter.</p>
                  <div className="mt-8 space-y-3">
                    {["Quick access to your account", "Built for iPhone and Android", "Updates in one safe place"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[.04] px-4 py-3 text-sm font-bold text-[#ded4c8]">
                        <BadgeCheck className="size-5 shrink-0 text-[#a78bfa]" />{item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div role="status" className="mb-10 flex flex-col gap-4 rounded-3xl border border-amber-300/25 bg-amber-300/[.07] p-5 sm:flex-row sm:items-center sm:p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-300/15 text-amber-200"><BellRing className="size-6" /></span>
              <div className="flex-1">
                <p className="font-black text-amber-100">Installing for the first time?</p>
                <p className="mt-1 leading-7 text-[#c8bbac]">Choose your phone below, then follow the short installation guide. Android may ask you to allow an install from your browser—this is expected for an APK download.</p>
              </div>
              <a href="#install-guide" className="inline-flex items-center gap-1 font-black text-amber-200 hover:text-amber-100">View guide <ChevronRight className="size-4" /></a>
            </div>

            <div className="mb-8">
              <p className="text-xs font-black uppercase tracking-[.22em] text-[#a78bfa]">Choose your device</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">Get the latest version</h2>
            </div>
            <div className="grid gap-7 lg:grid-cols-2">
              {apps.map((app) => <ReleaseCard key={app.id} app={app} />)}
              {apps.length === 0 && (
                <div className="col-span-full rounded-3xl border border-[#8b5cf6]/20 bg-[#111821] p-10 text-center">
                  <Info className="mx-auto size-8 text-[#a78bfa]" />
                  <h3 className="mt-4 text-xl font-black">Downloads are being prepared</h3>
                  <p className="mt-2 text-[#b9aa99]">Please check back soon for the latest app release.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <InstallGuide />
      </main>
    </SiteShell>
  );
}

function ReleaseCard({ app }: { app: MobileApp }) {
  const android = app.platform === "android";
  const url = preferredMobileAppUrl(app);
  const directDownload = android && !app.store_url;
  const actionUrl = directDownload && app.download_url ? "/app/download/android" : url;
  const action = app.store_url ? (android ? "Get it on Google Play" : "Open the App Store") : app.download_url ? (android ? "Download Android APK" : "Open TestFlight") : "Coming soon";
  const Icon = android ? Smartphone : Apple;

  return (
    <article className="motion-card motion-card-dark group flex flex-col rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#151d27] to-[#0e141c] p-7 shadow-2xl shadow-black/20 sm:p-9">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-16 place-items-center rounded-2xl border border-[#a78bfa]/15 bg-[#24163f] text-[#c4b5fd]"><Icon className="size-8" /></span>
        <span className={`rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-[.14em] ${app.enabled ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-[#b9aa99]"}`}>{app.enabled ? "Available now" : "Coming soon"}</span>
      </div>
      <h3 className="mt-7 text-3xl font-black">{android ? "Android" : "iPhone & iPad"}</h3>
      <p className="mt-2 leading-7 text-[#b9aa99]">{android ? "For Android phones and tablets." : "For Apple devices through the App Store or TestFlight."}</p>
      <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-[#c8bbac]">
        <span className="rounded-full bg-white/[.05] px-3 py-2">Version {app.version || "—"}</span>
        {android && app.build ? <span className="rounded-full bg-white/[.05] px-3 py-2">Build {app.build}</span> : null}
      </div>
      <div className="mt-6 flex-1 border-t border-white/10 pt-6">
        <p className="text-xs font-black uppercase tracking-[.16em] text-[#a78bfa]">What&apos;s new</p>
        <p className="mt-3 whitespace-pre-wrap leading-7 text-[#b9aa99]">{app.release_notes || "The latest improvements and fixes are included in this release."}</p>
      </div>
      {actionUrl ? (
        <a href={actionUrl} {...(!directDownload && { target: "_blank", rel: "noopener noreferrer" })} className="motion-button mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#8b5cf6] px-6 py-4 font-black text-white shadow-lg shadow-[#8b5cf6]/20">
          {directDownload ? <Download className="size-5" /> : <ExternalLink className="size-5" />}{action}
        </a>
      ) : (
        <button disabled className="mt-8 rounded-full border border-white/10 bg-white/[.03] px-6 py-4 font-black text-[#b9aa99] opacity-60">Coming soon</button>
      )}
    </article>
  );
}

function InstallGuide() {
  return (
    <section id="install-guide" className="border-t border-white/10 bg-[#0c1118] px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#a78bfa]">Installation guide</p>
          <h2 className="mt-3 text-3xl font-black sm:text-5xl">Ready in a few taps.</h2>
          <p className="mt-4 text-lg leading-8 text-[#b9aa99]">Pick the instructions for your phone. You only need to complete these steps once.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <GuideCard icon={Smartphone} title="Installing on Android" steps={["Tap “Download Android APK” above.", "Open the downloaded file from your browser or Downloads folder.", "If prompted, allow installs from this source, then tap Install.", "Open Jeroen & Paws and sign in to your account."]} note="Only install the APK downloaded directly from this page." />
          <GuideCard icon={Apple} title="Installing on iPhone" steps={["Tap the App Store or TestFlight button above.", "Confirm with Face ID, Touch ID, or your Apple ID.", "Wait for the app to finish installing.", "Open Jeroen & Paws and sign in to your account."]} note="TestFlight may ask you to install Apple’s TestFlight app first." />
        </div>
      </div>
    </section>
  );
}

function GuideCard({ icon: Icon, title, steps, note }: { icon: typeof Smartphone; title: string; steps: string[]; note: string }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-[#111821] p-7 sm:p-9">
      <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-2xl bg-[#8b5cf6]/15 text-[#c4b5fd]"><Icon className="size-6" /></span><h3 className="text-2xl font-black">{title}</h3></div>
      <ol className="mt-8 space-y-5">
        {steps.map((step, index) => <li key={step} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#8b5cf6] text-sm font-black text-white">{index + 1}</span><span className="pt-1 leading-7 text-[#d3c8bb]">{step}</span></li>)}
      </ol>
      <p className="mt-8 flex gap-3 rounded-2xl bg-white/[.04] p-4 text-sm leading-6 text-[#b9aa99]"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-400" />{note}</p>
    </article>
  );
}

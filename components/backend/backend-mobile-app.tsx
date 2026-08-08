"use client";

import { ExternalLink, Save, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import { Card } from "./card";
import { mobileAppSchema, preferredMobileAppUrl, type MobileApp } from "@/utils/mobile-app";

const emptyApps: MobileApp[] = [];

export function BackendMobileApp({ accessToken }: { accessToken: string }) {
  const [apps, setApps] = useState<MobileApp[]>(emptyApps);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/mobile-app", { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Unable to load mobile app settings.");
        setApps(body);
      })
      .catch((error) => setNotice({ kind: "error", text: error.message }))
      .finally(() => setLoading(false));
  }, []);

  function update(platform: string, values: Partial<MobileApp>) {
    setApps((current) => current.map((app) => app.platform === platform ? { ...app, ...values } : app));
  }

  async function save(app: MobileApp) {
    const parsed = mobileAppSchema.safeParse(app);
    if (!parsed.success) {
      setNotice({ kind: "error", text: parsed.error.issues[0]?.message ?? "Check the release details." });
      return;
    }
    setSaving(app.platform);
    setNotice(null);
    try {
      const response = await fetch("/api/mobile-app", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(parsed.data),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to save this release.");
      update(app.platform, body);
      setNotice({ kind: "success", text: `${app.platform === "android" ? "Android" : "iPhone"} release saved. The public page is now up to date.` });
    } catch (error) {
      setNotice({ kind: "error", text: error instanceof Error ? error.message : "Unable to save this release." });
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="px-5 py-8 md:px-10 md:py-10">
      <div className="flex items-start gap-4">
        <span className="grid size-12 place-items-center rounded-xl bg-[#efe8ff] text-[#4f2c91]"><Smartphone /></span>
        <div><p className="text-xs font-black uppercase tracking-[.2em] text-[#6c4bb0]">Release management</p><h1 className="mt-1 font-serif text-4xl">Mobile App</h1><p className="mt-2 text-[#665d70]">Update download destinations and release information without redeploying the website.</p></div>
      </div>
      {notice && <div role="status" className={`mt-6 rounded-xl border px-4 py-3 font-semibold ${notice.kind === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}>{notice.text}</div>}
      {loading ? <p className="mt-10 font-semibold text-[#665d70]">Loading releases…</p> : (
        <div className="mt-8 grid gap-6 2xl:grid-cols-2">
          {apps.map((app) => <ReleaseForm key={app.platform} app={app} saving={saving === app.platform} onChange={(values) => update(app.platform, values)} onSave={() => save(app)} />)}
        </div>
      )}
    </div>
  );
}

function ReleaseForm({ app, saving, onChange, onSave }: { app: MobileApp; saving: boolean; onChange: (values: Partial<MobileApp>) => void; onSave: () => void }) {
  const android = app.platform === "android";
  const destination = preferredMobileAppUrl(app);
  const visibilityMessage = destination
    ? "The public download link is visible. The release switch only controls its status label."
    : `Add an ${android ? "APK or Google Play" : "TestFlight or App Store"} URL to show a public link.`;
  const inputClass = "mt-2 w-full rounded-xl border border-[#151124]/12 bg-white px-4 py-3 outline-none focus:border-[#6c4bb0]";
  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.18em] text-[#6c4bb0]">{android ? "Android" : "iOS"}</p><h2 className="mt-1 font-serif text-3xl">{android ? "Android" : "iPhone"}</h2></div><label className="flex cursor-pointer items-center gap-3 font-bold"><span>Released</span><input type="checkbox" role="switch" aria-describedby={`${app.platform}-visibility-message`} checked={app.enabled} onChange={(e) => onChange({ enabled: e.target.checked })} className="size-5" /></label></div>
      <p id={`${app.platform}-visibility-message`} className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${destination ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"}`}>{visibilityMessage}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Version"><input className={inputClass} value={app.version} onChange={(e) => onChange({ version: e.target.value })} placeholder="1.0.0" /></Field>
        {android && <Field label="Build Number"><input className={inputClass} type="number" min="0" value={app.build ?? ""} onChange={(e) => onChange({ build: e.target.value === "" ? null : Number(e.target.value) })} /></Field>}
      </div>
      <Field label="Release Notes" className="mt-5"><textarea className={`${inputClass} min-h-32 resize-y`} value={app.release_notes} onChange={(e) => onChange({ release_notes: e.target.value })} /></Field>
      <div className="mt-5 grid gap-5">
        <Field label={android ? "APK Download URL" : "TestFlight URL"}><input className={inputClass} type="url" value={app.download_url} onChange={(e) => onChange({ download_url: e.target.value })} placeholder="https://" /></Field>
        <Field label={`${android ? "Google Play" : "App Store"} URL (optional)`}><input className={inputClass} type="url" value={app.store_url} onChange={(e) => onChange({ store_url: e.target.value })} placeholder="https://" /></Field>
      </div>
      <p className="mt-5 text-sm text-[#77727c]">Last Updated: <time dateTime={app.updated_at}>{new Intl.DateTimeFormat("en-IE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(app.updated_at))}</time></p>
      <div className="mt-6 flex flex-wrap gap-3"><button type="button" disabled={saving} onClick={onSave} className="inline-flex items-center gap-2 rounded-xl bg-[#4f2c91] px-5 py-3 font-bold text-white disabled:opacity-60"><Save className="size-4" />{saving ? "Saving…" : "Save"}</button>{destination ? <a href={destination} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-[#4f2c91]/25 px-5 py-3 font-bold text-[#4f2c91]">Preview <ExternalLink className="size-4" /></a> : <button disabled className="rounded-xl border px-5 py-3 font-bold opacity-45">Preview</button>}</div>
    </Card>
  );
}

function Field({ label, className = "", children }: { label: string; className?: string; children: React.ReactNode }) { return <label className={`block text-sm font-bold ${className}`}>{label}{children}</label>; }

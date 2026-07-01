"use client";

import { ArrowLeft, CalendarDays, Edit3, ImageIcon, Mail, MapPin, PawPrint, Phone, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { dogPlaceholderImage } from "./portal-data";
import { useSupabaseLiveQuery } from "./use-supabase-live-query";

type ProfileRow = { client_id: string; full_name: string; email: string; phone: string | null; address: string | null; avatar_url: string | null; created_at: string; dog_names: string | null; dog_photo_url: string | null; };
type ActivityRow = { id: string; activity_type: string; title: string; body: string | null; created_at: string; };
type ProfileData = { profile: ProfileRow | null; activity: ActivityRow[] };

function mapProfileRows(rows: unknown): ProfileData {
  const list = Array.isArray(rows) ? (rows as (ProfileRow & { recent_activity: ActivityRow[] | null })[]) : [];
  const row = list[0];
  return { profile: row ?? null, activity: row?.recent_activity ?? [] };
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>{children}</section>;
}

function formatSince(value?: string) {
  return value ? new Intl.DateTimeFormat("en-IE", { month: "long", year: "numeric" }).format(new Date(value)) : "your first booking";
}

export function Profile({ accessToken, onBackToDashboard }: { accessToken?: string; onBackToDashboard: () => void }) {
  const { data, isLoading, error } = useSupabaseLiveQuery({ accessToken, fallback: { profile: null, activity: [] } as ProfileData, path: "/rest/v1/portal_profile?select=*&limit=1", realtimeTables: ["portal_clients", "portal_dogs", "portal_client_activity"], map: mapProfileRows });
  const [message, setMessage] = useState<string | null>(null);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data.profile) return;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || !accessToken) return setMessage("Connect Supabase and log in before saving.");
    const formData = new FormData(event.currentTarget);
    const response = await fetch(`${url}/rest/v1/portal_clients?id=eq.${data.profile.client_id}`, { method: "PATCH", headers: { apikey: key, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify({ full_name: formData.get("full_name"), phone: formData.get("phone"), address: formData.get("address"), avatar_url: formData.get("avatar_url") }) });
    setMessage(response.ok ? "Profile saved. Realtime will refresh this page automatically." : "Unable to save profile.");
  }

  const profile = data.profile;
  return <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
    <header className="mx-auto flex max-w-6xl items-start justify-between gap-4"><div><button type="button" onClick={onBackToDashboard} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]"><ArrowLeft className="size-4" /> Back to Dashboard</button><h1 className="font-serif text-4xl leading-tight text-[#241f30]">My Profile <PawPrint className="inline size-6 text-[#8b5cf6]" /></h1><p className="mt-3 text-sm text-[#17132a]">Manage your live Supabase profile details.</p></div><div className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]"><Image src={profile?.avatar_url || profile?.dog_photo_url || dogPlaceholderImage} alt="Profile photo" fill sizes="56px" className="object-cover" /></div></header>
    <div className="mx-auto mt-8 max-w-6xl space-y-6">{(isLoading || error || !profile) ? <p className="rounded-xl border border-[#24163f]/10 bg-white px-5 py-4 text-sm text-[#665d70]">{isLoading ? "Loading live profile…" : error ?? "No profile data yet."}</p> : null}{profile ? <><Panel className="overflow-hidden p-6 sm:p-8"><div className="grid gap-8 lg:grid-cols-[14rem_1fr_18rem] lg:items-center"><div className="relative mx-auto size-44 lg:mx-0"><Image src={profile.avatar_url || profile.dog_photo_url || dogPlaceholderImage} alt={`${profile.full_name} profile`} fill sizes="176px" className="rounded-full object-cover ring-4 ring-[#ead9b8]" /><span className="absolute bottom-3 right-0 grid size-12 place-items-center rounded-full bg-white text-[#4d2e91] shadow-[0_12px_28px_rgba(29,23,40,0.18)]"><Edit3 className="size-5" /></span></div><div><h2 className="font-serif text-3xl text-[#241f30]">{profile.full_name}</h2><div className="mt-6 space-y-4 text-sm text-[#2f2938]"><p className="flex items-center gap-3"><Mail className="size-4 text-[#4d2e91]" />{profile.email}</p><p className="flex items-center gap-3"><Phone className="size-4 text-[#4d2e91]" />{profile.phone || "Add a phone number"}</p><p className="flex items-center gap-3"><MapPin className="size-4 text-[#4d2e91]" />{profile.address || "Add an address"}</p></div><span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0e8f8] px-5 py-2 text-sm font-semibold text-[#4d2e91]"><PawPrint className="size-4" />Member since {formatSince(profile.created_at)}</span></div><div className="rounded-xl bg-[#faf7fb] p-6"><p className="text-lg leading-8">Dogs: {profile.dog_names || "Add dogs in Supabase"}</p></div></div></Panel><Panel className="p-6 sm:p-7"><h2 className="font-serif text-2xl text-[#241f30]">Personal Information</h2><form onSubmit={saveProfile} className="mt-6 grid gap-4"><input className="rounded border border-[#24163f]/15 px-4 py-3" name="full_name" defaultValue={profile.full_name} placeholder="Full name" /><input className="rounded border border-[#24163f]/15 px-4 py-3" name="phone" defaultValue={profile.phone ?? ""} placeholder="Phone" /><input className="rounded border border-[#24163f]/15 px-4 py-3" name="address" defaultValue={profile.address ?? ""} placeholder="Address" /><input className="rounded border border-[#24163f]/15 px-4 py-3" name="avatar_url" defaultValue={profile.avatar_url ?? ""} placeholder="Uploaded profile picture URL" /><button className="inline-flex w-fit items-center gap-2 rounded bg-[#4d2e91] px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white"><Save className="size-4" />Save profile</button>{message ? <p className="text-sm text-[#665d70]">{message}</p> : null}</form></Panel><Panel className="p-6 sm:p-7"><h2 className="font-serif text-2xl text-[#241f30]">Recent Activity</h2><div className="mt-6 divide-y divide-[#24163f]/10">{data.activity.length ? data.activity.map((item) => <article key={item.id} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center"><span className="grid size-10 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]">{item.activity_type === "gallery" ? <ImageIcon className="size-5" /> : <CalendarDays className="size-5" />}</span><div><h3 className="font-semibold text-[#241f30]">{item.title}</h3><p className="mt-1 text-sm text-[#665d70]">{item.body}</p></div><p className="text-sm text-[#665d70]">{new Intl.DateTimeFormat("en-IE", { dateStyle: "medium" }).format(new Date(item.created_at))}</p></article>) : <p className="text-sm text-[#665d70]">No recent activity yet.</p>}</div></Panel></> : null}</div>
  </div>;
}

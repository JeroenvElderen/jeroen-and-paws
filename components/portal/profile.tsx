"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Edit3,
  ImageIcon,
  Lock,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

const fallbackProfile: PortalProfile = {
  id: "fallback",
  full_name: "Portal client",
  email: "client@example.com",
  phone: "Add your phone number",
  address: "Add your address",
  profile_photo_url: "/images/dogs/ace.jpg",
  created_at: "2024-03-01T00:00:00.000Z",
};

const fallbackDogs: PortalDog[] = [];
const dogPlaceholderImage = "/images/dogs/ace.jpg";

type PortalProfile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  profile_photo_url: string | null;
  created_at: string;
};

type PortalDog = {
  id: string;
  name: string;
  breed: string | null;
  birth_date: string | null;
  profile_photo_url: string | null;
};

type PortalBooking = {
  id: string;
  dog_name: string;
  service_name: string;
  starts_at: string;
  status: string;
};

type PortalUpdate = {
  id: string;
  title: string;
  body: string | null;
  shared_at: string;
};

function ProfilePanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-[#24163f]/10 bg-white shadow-[0_18px_55px_rgba(29,23,40,0.08)] ${className}`}>{children}</section>;
}

function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]">
      <Edit3 aria-hidden="true" className="size-4" />
      Edit
    </button>
  );
}

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return supabaseUrl && supabaseAnonKey ? { supabaseUrl, supabaseAnonKey } : null;
}

function headers(accessToken?: string) {
  const config = getSupabaseConfig();
  if (!config) return null;
  return {
    apikey: config.supabaseAnonKey,
    Authorization: `Bearer ${accessToken ?? config.supabaseAnonKey}`,
    "Content-Type": "application/json",
  };
}

function formatMemberSince(date: string) {
  return new Intl.DateTimeFormat("en-IE", { month: "long", year: "numeric" }).format(new Date(date));
}

function formatDogAge(birthDate: string | null) {
  if (!birthDate) return "Birth date needed";
  const birth = new Date(`${birthDate}T00:00:00`);
  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  months = Math.max(0, months);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
}

function relativeTime(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.max(0, Math.round(diff / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.round(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

export function Profile({ onBackToDashboard, accessToken }: { onBackToDashboard: () => void; accessToken?: string }) {
  const [profile, setProfile] = useState<PortalProfile>(fallbackProfile);
  const [dogs, setDogs] = useState<PortalDog[]>(fallbackDogs);
  const [bookings, setBookings] = useState<PortalBooking[]>([]);
  const [updates, setUpdates] = useState<PortalUpdate[]>([]);
  const [status, setStatus] = useState("Loading live profile data…");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showDogForm, setShowDogForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editingDogId, setEditingDogId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadProfile() {
      const config = getSupabaseConfig();
      const requestHeaders = headers(accessToken);
      if (!config || !requestHeaders) {
        setStatus("Connect Supabase to show live profile data.");
        return;
      }
      try {
        const [profileResponse, dogsResponse, bookingsResponse, updatesResponse] = await Promise.all([
          fetch(`${config.supabaseUrl}/rest/v1/portal_clients?select=id,full_name,email,phone,address,profile_photo_url,created_at&limit=1`, { headers: requestHeaders }),
          fetch(`${config.supabaseUrl}/rest/v1/portal_dogs?select=id,name,breed,birth_date,profile_photo_url&order=created_at.asc`, { headers: requestHeaders }),
          fetch(`${config.supabaseUrl}/rest/v1/portal_booking_list?select=id,dog_name,service_name,starts_at,status&order=starts_at.desc&limit=4`, { headers: requestHeaders }),
          fetch(`${config.supabaseUrl}/rest/v1/portal_session_updates?select=id,title,body,shared_at&order=shared_at.desc&limit=4`, { headers: requestHeaders }),
        ]);
        if (!profileResponse.ok || !dogsResponse.ok || !bookingsResponse.ok || !updatesResponse.ok) throw new Error("Supabase profile data is not available yet. Run the latest portal SQL migration.");
        const [profileRows, dogRows, bookingRows, updateRows] = await Promise.all([profileResponse.json(), dogsResponse.json(), bookingsResponse.json(), updatesResponse.json()]);
        if (!mounted) return;
        if (profileRows[0]) setProfile(profileRows[0]);
        setDogs(dogRows);
        setBookings(bookingRows);
        setUpdates(updateRows);
        setStatus(profileRows[0] ? "" : "No profile record found for this login yet.");
      } catch (error) {
        if (mounted) setStatus(error instanceof Error ? error.message : "Unable to load live profile data.");
      }
    }
    void loadProfile();
    return () => { mounted = false; };
  }, [accessToken]);

  const personalDetails = [
    ["Full Name", profile.full_name],
    ["Email Address", profile.email],
    ["Phone Number", profile.phone || "Add your phone number"],
    ["Address", profile.address || "Add your address"],
  ] as const;

  const recentActivity = useMemo(() => {
    const bookingItems = bookings.map((booking) => [CalendarDays, "Booking updated", `${booking.service_name} for ${booking.dog_name} - ${new Intl.DateTimeFormat("en-IE", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(booking.starts_at))}`, relativeTime(booking.starts_at)] as const);
    const updateItems = updates.map((update) => [ImageIcon, update.title, update.body || "Care update shared", relativeTime(update.shared_at)] as const);
    return [...updateItems, ...bookingItems].slice(0, 4);
  }, [bookings, updates]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const config = getSupabaseConfig();
    const requestHeaders = headers(accessToken);
    if (!config || !requestHeaders) return;
    const payload = { full_name: String(form.get("full_name") || ""), phone: String(form.get("phone") || ""), address: String(form.get("address") || ""), profile_photo_url: String(form.get("profile_photo_url") || "") };
    const response = await fetch(`${config.supabaseUrl}/rest/v1/portal_clients?id=eq.${profile.id}`, { method: "PATCH", headers: { ...requestHeaders, Prefer: "return=representation" }, body: JSON.stringify(payload) });
    if (response.ok) {
      const rows = await response.json();
      setProfile(rows[0] || { ...profile, ...payload });
      setShowProfileEdit(false);
    }
  }

  async function addDog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const config = getSupabaseConfig();
    const requestHeaders = headers(accessToken);
    if (!config || !requestHeaders) return;
    const payload = { client_id: profile.id, name: String(form.get("name") || ""), breed: String(form.get("breed") || ""), birth_date: String(form.get("birth_date") || ""), profile_photo_url: String(form.get("profile_photo_url") || dogPlaceholderImage) };
    const response = await fetch(`${config.supabaseUrl}/rest/v1/portal_dogs`, { method: "POST", headers: { ...requestHeaders, Prefer: "return=representation" }, body: JSON.stringify(payload) });
    if (response.ok) {
      const rows = await response.json();
      setDogs((current) => [...current, rows[0]]);
      setShowDogForm(false);
    }
  }

  async function saveDog(event: FormEvent<HTMLFormElement>, dogId: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const config = getSupabaseConfig();
    const requestHeaders = headers(accessToken);
    if (!config || !requestHeaders) return;
    const payload = { name: String(form.get("name") || ""), breed: String(form.get("breed") || ""), birth_date: String(form.get("birth_date") || ""), profile_photo_url: String(form.get("profile_photo_url") || "") };
    const response = await fetch(`${config.supabaseUrl}/rest/v1/portal_dogs?id=eq.${dogId}`, { method: "PATCH", headers: { ...requestHeaders, Prefer: "return=representation" }, body: JSON.stringify(payload) });
    if (response.ok) {
      const rows = await response.json();
      setDogs((current) => current.map((dog) => (dog.id === dogId ? rows[0] || { ...dog, ...payload } : dog)));
      setEditingDogId(null);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const config = getSupabaseConfig();
    if (!config) return;
    const oldPassword = String(form.get("old_password") || "");
    const newPassword = String(form.get("new_password") || "");
    const login = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${config.supabaseAnonKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ email: profile.email, password: oldPassword }) });
    if (!login.ok) {
      setStatus("Old password was not accepted.");
      return;
    }
    const { access_token } = await login.json();
    const response = await fetch(`${config.supabaseUrl}/auth/v1/user`, { method: "PUT", headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ password: newPassword }) });
    setStatus(response.ok ? "Password updated." : "Unable to update password.");
    if (response.ok) setShowPasswordForm(false);
  }

  return (
    <div className="px-4 py-6 text-[#17132a] sm:px-8 lg:px-10 lg:py-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <button type="button" onClick={onBackToDashboard} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]"><ArrowLeft aria-hidden="true" className="size-4" />Back to Dashboard</button>
          <h1 className="font-serif text-4xl leading-tight text-[#241f30]">My Profile <PawPrint aria-hidden="true" className="inline size-6 text-[#8b5cf6]" /></h1>
          <p className="mt-3 text-sm text-[#17132a]">Manage your personal details and pets.</p>
        </div>
        <div className="flex items-center gap-5">
          <button aria-label="Notifications" className="relative text-[#2f1b59]"><Bell className="size-6" /><span className="absolute -right-1 -top-2 grid size-5 place-items-center rounded-full bg-[#17132a] text-[0.65rem] font-black text-white">2</span></button>
          <button type="button" onClick={() => setShowProfileEdit(true)} className="relative size-14 overflow-hidden rounded-full ring-2 ring-[#ead9b8]"><Image src={profile.profile_photo_url || dogPlaceholderImage} alt={`${profile.full_name} profile photo`} fill sizes="56px" className="object-cover" /></button>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-6xl space-y-6">
        {status && <p className="rounded-xl border border-[#24163f]/10 bg-white px-5 py-4 text-sm text-[#665d70]">{status}</p>}
        <ProfilePanel className="overflow-hidden p-6 sm:p-8"><div className="grid gap-8 lg:grid-cols-[14rem_1fr_18rem] lg:items-center"><div className="relative mx-auto size-44 lg:mx-0"><Image src={profile.profile_photo_url || dogPlaceholderImage} alt={`${profile.full_name} profile portrait`} fill sizes="176px" className="rounded-full object-cover ring-4 ring-[#ead9b8]" /><button type="button" onClick={() => setShowProfileEdit(true)} aria-label="Edit profile photo" className="absolute bottom-3 right-0 grid size-12 place-items-center rounded-full bg-white text-[#4d2e91] shadow-[0_12px_28px_rgba(29,23,40,0.18)]"><Edit3 aria-hidden="true" className="size-5" /></button></div><div><h2 className="font-serif text-3xl text-[#241f30]">{profile.full_name}</h2><div className="mt-6 space-y-4 text-sm text-[#2f2938]"><p className="flex items-center gap-3"><Mail aria-hidden="true" className="size-4 text-[#4d2e91]" />{profile.email}</p><p className="flex items-center gap-3"><Phone aria-hidden="true" className="size-4 text-[#4d2e91]" />{profile.phone || "Add your phone number"}</p><p className="flex items-center gap-3"><MapPin aria-hidden="true" className="size-4 text-[#4d2e91]" />{profile.address || "Add your address"}</p></div><span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0e8f8] px-5 py-2 text-sm font-semibold text-[#4d2e91]"><PawPrint aria-hidden="true" className="size-4" />Member since {formatMemberSince(profile.created_at)}</span></div><div className="relative rounded-xl bg-[#faf7fb] p-6 text-[#241f30]"><p className="relative max-w-52 text-lg leading-8">Making tails wag and lives better, one walk at a time.</p><p className="relative mt-7 font-serif text-2xl text-[#3f2581]">Jeroen <PawPrint aria-hidden="true" className="inline size-4" /></p></div></div></ProfilePanel>

        {showProfileEdit && <ProfilePanel className="p-6 sm:p-7"><form onSubmit={saveProfile} className="grid gap-4 sm:grid-cols-2"><input name="full_name" defaultValue={profile.full_name} className="rounded border p-3" placeholder="Full name" /><input name="phone" defaultValue={profile.phone || ""} className="rounded border p-3" placeholder="Phone" /><input name="address" defaultValue={profile.address || ""} className="rounded border p-3 sm:col-span-2" placeholder="Address" /><input name="profile_photo_url" defaultValue={profile.profile_photo_url || ""} className="rounded border p-3 sm:col-span-2" placeholder="Profile photo URL" /><button className="rounded bg-[#4d2e91] px-5 py-3 font-semibold text-white">Save profile</button></form></ProfilePanel>}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]"><div className="space-y-6"><ProfilePanel className="p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><h2 className="font-serif text-2xl text-[#241f30]">Personal Information</h2><EditButton onClick={() => setShowProfileEdit(true)} /></div><dl className="mt-6 divide-y divide-[#24163f]/10">{personalDetails.map(([label, value]) => <div key={label} className="py-4 first:pt-0 last:pb-0"><dt className="text-sm font-semibold text-[#241f30]">{label}</dt><dd className="mt-2 text-sm text-[#3a3048]">{value}</dd></div>)}</dl></ProfilePanel></div><div className="space-y-6"><ProfilePanel className="p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><h2 className="font-serif text-2xl text-[#241f30]">Security</h2><EditButton onClick={() => setShowPasswordForm((value) => !value)} /></div><button type="button" onClick={() => setShowPasswordForm((value) => !value)} className="mt-7 flex w-full items-center justify-between gap-4 text-left"><span className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]"><Lock aria-hidden="true" className="size-5" /></span><span><span className="block font-semibold text-[#241f30]">Password</span><span className="mt-1 block text-sm text-[#665d70]">Change password with old password required</span></span></span></button>{showPasswordForm && <form onSubmit={changePassword} className="mt-5 grid gap-3"><input name="old_password" type="password" required className="rounded border p-3" placeholder="Old password" /><input name="new_password" type="password" required minLength={8} className="rounded border p-3" placeholder="New password" /><button className="rounded bg-[#4d2e91] px-5 py-3 font-semibold text-white">Update password</button></form>}</ProfilePanel><ProfilePanel className="p-6 sm:p-7"><div className="flex items-center justify-between gap-4"><h2 className="font-serif text-2xl text-[#241f30]">My Dogs</h2><EditButton onClick={() => setShowDogForm((value) => !value)} /></div><div className="mt-6 divide-y divide-[#24163f]/10">{dogs.map((dog) => <article key={dog.id} className="py-5 first:pt-0"><div className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4"><div className="relative size-16 overflow-hidden rounded-full ring-2 ring-[#ead9b8]"><Image src={dog.profile_photo_url || dogPlaceholderImage} alt={`${dog.name} profile photo`} fill sizes="64px" className="object-cover" /></div><div><h3 className="font-serif text-xl text-[#241f30]">{dog.name}</h3><p className="mt-1 text-sm text-[#665d70]">{dog.breed || "Breed not set"} - {formatDogAge(dog.birth_date)}</p><p className="mt-1 break-all text-xs text-[#817889]">Photo URL: {dog.profile_photo_url || "Not set"}</p></div><button type="button" onClick={() => setEditingDogId((current) => current === dog.id ? null : dog.id)} className="rounded-full bg-[#f0e8f8] px-4 py-1 text-xs font-semibold text-[#4d2e91]">Edit</button></div>{editingDogId === dog.id && <form onSubmit={(event) => saveDog(event, dog.id)} className="mt-5 grid gap-3"><input name="name" required defaultValue={dog.name} className="rounded border p-3" placeholder="Dog name" /><input name="breed" defaultValue={dog.breed || ""} className="rounded border p-3" placeholder="Breed" /><input name="birth_date" type="date" required defaultValue={dog.birth_date || ""} className="rounded border p-3" /><input name="profile_photo_url" defaultValue={dog.profile_photo_url || ""} className="rounded border p-3" placeholder="Dog profile photo URL" /><button className="rounded bg-[#4d2e91] px-5 py-3 font-semibold text-white">Save dog</button></form>}</article>)}</div>{showDogForm && <form onSubmit={addDog} className="mt-5 grid gap-3"><input name="name" required className="rounded border p-3" placeholder="Dog name" /><input name="breed" className="rounded border p-3" placeholder="Breed" /><input name="birth_date" type="date" required className="rounded border p-3" /><input name="profile_photo_url" className="rounded border p-3" placeholder="Profile photo URL" /><button className="rounded bg-[#4d2e91] px-5 py-3 font-semibold text-white">Save dog</button></form>}<button type="button" onClick={() => setShowDogForm((value) => !value)} className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded border border-[#4d2e91]/30 px-6 py-4 text-sm font-semibold text-[#4d2e91]"><Plus aria-hidden="true" className="size-5" />Add a Dog</button></ProfilePanel></div></div>

        <ProfilePanel className="p-6 sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><h2 className="font-serif text-2xl text-[#241f30]">Recent Activity</h2><a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4d2e91]">View all activity <ArrowRight aria-hidden="true" className="size-4" /></a></div><div className="mt-6 divide-y divide-[#24163f]/10">{recentActivity.length ? recentActivity.map(([Icon, title, detail, time]) => <article key={`${title}-${detail}`} className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center"><span className="grid size-10 place-items-center rounded-full bg-[#f4eef8] text-[#4d2e91]"><Icon aria-hidden="true" className="size-5" /></span><div><h3 className="font-semibold text-[#241f30]">{title}</h3><p className="mt-1 text-sm text-[#665d70]">{detail}</p></div><p className="text-sm text-[#665d70]">{time}</p></article>) : <p className="text-sm text-[#665d70]">Your bookings, invoices, and care updates will appear here.</p>}</div></ProfilePanel>

        <section className="flex flex-col gap-5 rounded-xl bg-[#f4eef8] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div className="flex gap-5"><span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#4d2e91] text-white"><PawPrint aria-hidden="true" className="size-8" /></span><div><h2 className="font-serif text-2xl text-[#241f30]">We&apos;re here for you and your pup.</h2><p className="mt-2 text-sm text-[#5f5769]">Need anything? Our team is just a message away.</p></div></div><Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded bg-[#4d2e91] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white">Send a message <PawPrint aria-hidden="true" className="size-4" /></Link></section>
      </div>
    </div>
  );
}

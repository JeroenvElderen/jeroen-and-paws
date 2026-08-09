"use client";

import { CalendarDays, CircleHelp, FileText, Home, ImageIcon, LogOut, PawPrint, Phone, ShieldCheck, User, UserPlus } from "lucide-react";
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

type PortalSession = {
  accessToken: string;
  refreshToken: string;
  email: string;
  expiresAt: number;
};

type SupabaseAuthResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: {
    email?: string;
  };
  msg?: string;
  error_description?: string;
  error?: string;
  delivery?: "email" | "phone";
  verificationRequired?: boolean;
};

const portalSessionStorageKey = "jeroen-and-paws-portal-session";

function getSupabaseAuthConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return { supabaseUrl, supabaseAnonKey };
}

function getSupabaseAuthError(payload: SupabaseAuthResponse, fallback: string) {
  return payload.msg ?? payload.error_description ?? payload.error ?? fallback;
}

async function getSupabaseAuthPayload(response: Response, fallback: string) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await response.json().catch(() => ({ error: fallback }))) as SupabaseAuthResponse;
  }

  const text = await response.text().catch(() => "");
  const error = text.trim().startsWith("<")
    ? `${fallback} The server returned an HTML error page instead of JSON.`
    : text || fallback;

  return { error } satisfies SupabaseAuthResponse;
}

async function refreshPortalSession(session: PortalSession) {
  const authConfig = getSupabaseAuthConfig();

  if (!authConfig) return null;

  const response = await fetch(`${authConfig.supabaseUrl}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      apikey: authConfig.supabaseAnonKey,
      Authorization: `Bearer ${authConfig.supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: session.refreshToken }),
  });
  const payload = await getSupabaseAuthPayload(response, "Unable to refresh your portal session.");

  if (!response.ok || !payload.access_token) {
    throw new Error(getSupabaseAuthError(payload, "Unable to refresh your portal session."));
  }

  return {
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token ?? session.refreshToken,
    email: payload.user?.email ?? session.email,
    expiresAt: Date.now() + ((payload.expires_in ?? 3600) * 1000),
  } satisfies PortalSession;
}

function PortalAuthPrompt({ inviteCode, onAuthenticated }: { inviteCode: string; onAuthenticated: (session: PortalSession) => void }) {
  const hasInvite = Boolean(inviteCode);
  const [mode, setMode] = useState<"signup" | "login">(inviteCode ? "signup" : "login");
  const [registrationMethod, setRegistrationMethod] = useState<"phone" | "email">("phone");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function saveSession(payload: { accessToken: string; refreshToken: string; expiresIn?: number; user?: { phone?: string; email?: string } }) {
    const session = { accessToken: payload.accessToken, refreshToken: payload.refreshToken, email: payload.user?.email || payload.user?.phone || loginIdentifier, expiresAt: Date.now() + ((payload.expiresIn ?? 3600) * 1000) };
    window.localStorage.setItem(portalSessionStorageKey, JSON.stringify(session));
    onAuthenticated(session);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setErrorMessage(null); setStatusMessage(null); setIsSubmitting(true);
    try {
      if (mode === "login") {
        const authConfig = getSupabaseAuthConfig();
        if (!authConfig) throw new Error("Portal authentication is not configured.");
        const isEmail = loginIdentifier.includes("@");
        const response = await fetch(`${authConfig.supabaseUrl}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: authConfig.supabaseAnonKey, Authorization: `Bearer ${authConfig.supabaseAnonKey}`, "Content-Type": "application/json" }, body: JSON.stringify(isEmail ? { email: loginIdentifier, password } : { phone: loginIdentifier.replace(/[\s().-]/g, ""), password }) });
        const payload = await getSupabaseAuthPayload(response, "Unable to log in.");
        if (!response.ok || !payload.access_token || !payload.refresh_token) throw new Error(getSupabaseAuthError(payload, "Unable to log in."));
        saveSession({ accessToken: payload.access_token, refreshToken: payload.refresh_token, expiresIn: payload.expires_in, user: payload.user });
        return;
      }

      const redirectTo = `${window.location.origin}/portal`;
      if (registrationMethod === "email") {
        const response = await fetch("/api/portal/auth/register-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ inviteCode, fullName, email, password, redirectTo }) });
        const payload = (await response.json()) as { error?: string };
        if (!response.ok) throw new Error(payload.error || "Unable to create the account.");
        setStatusMessage("Account created. Check your email to confirm it, then log in with your email and password.");
        setMode("login"); setLoginIdentifier(email); setPassword("");
        return;
      }

      const response = await fetch("/api/portal/auth/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ inviteCode, fullName, phone, email: email || undefined }) });
      const payload = (await response.json()) as { challengeId?: string; error?: string };
      if (!response.ok || !payload.challengeId) throw new Error(payload.error || "Unable to send the security code.");
      setChallengeId(payload.challengeId); setStatusMessage("We sent a one-time security code to your phone.");
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : "Unable to continue."); } finally { setIsSubmitting(false); }
  }

  async function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setErrorMessage(null); setIsSubmitting(true);
    try {
      const response = await fetch("/api/portal/auth/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ challengeId, code: verificationCode, password, redirectTo: `${window.location.origin}/portal` }) });
      const payload = (await response.json()) as { accessToken?: string; refreshToken?: string; expiresIn?: number; user?: { phone?: string }; error?: string };
      if (!response.ok || !payload.accessToken || !payload.refreshToken) throw new Error(payload.error || "Unable to verify the security code.");
      saveSession({ accessToken: payload.accessToken, refreshToken: payload.refreshToken, expiresIn: payload.expiresIn, user: payload.user });
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : "Unable to verify the code."); } finally { setIsSubmitting(false); }
  }

  return <main className="min-h-screen bg-[#f7f4ef] p-3 text-[#1d1728] sm:p-4"><section className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[94rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_80px_rgba(29,23,40,0.12)] lg:grid-cols-[1.05fr_1fr]">
    <div className="relative hidden min-h-[48rem] overflow-hidden bg-[#171406] text-white lg:block"><Image src="/images/dogs/walk.jpeg" alt="Dog walking on a woodland path" fill sizes="50vw" className="object-cover" priority /><div className="absolute inset-0 bg-[#151303]/55" /><div className="absolute inset-0 px-12 py-10"><Link href="/" className="font-serif text-4xl text-white">Jeroen<br />And Paws <PawPrint className="ml-2 inline size-6 text-[#c4a7ff]" /></Link><p className="mt-24 font-serif text-6xl leading-tight">Happy dogs,<br />better lives. <span className="text-[#c4a7ff]">♡</span></p><div className="mt-12 space-y-5"><p className="flex items-center gap-4 text-lg"><ShieldCheck className="size-7 text-[#c4a7ff]" />Private invite-only registration</p><p className="flex items-center gap-4 text-lg"><Phone className="size-7 text-[#c4a7ff]" />Register with phone or email</p></div></div></div>
    <div className="flex min-h-[48rem] items-center px-6 py-10 sm:px-10 lg:px-20"><div className="mx-auto w-full max-w-xl">
      {!challengeId && hasInvite && <div className="grid grid-cols-2 border-b text-center"><button type="button" onClick={() => setMode("signup")} className={`pb-5 text-lg font-bold ${mode === "signup" ? "border-b-4 border-[#4c1d95] text-[#4c1d95]" : "text-[#6f687a]"}`}><UserPlus className="mx-auto mb-2 size-7" />Register</button><button type="button" onClick={() => setMode("login")} className={`pb-5 text-lg font-bold ${mode === "login" ? "border-b-4 border-[#4c1d95] text-[#4c1d95]" : "text-[#6f687a]"}`}><PawPrint className="mx-auto mb-2 size-7" />Log in</button></div>}
      <h1 className="mt-10 font-serif text-4xl text-[#151b36]">{challengeId ? "Verify your phone" : mode === "signup" ? "Create your account" : "Welcome back"} <span className="text-[#9b5fd4]">♡</span></h1>
      {!challengeId && mode === "signup" && <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-[#f7f4fb] p-1"><button type="button" onClick={() => setRegistrationMethod("phone")} className={`rounded-lg p-3 font-bold ${registrationMethod === "phone" ? "bg-white text-[#4c1d95] shadow" : "text-[#6f687a]"}`}>Phone + password</button><button type="button" onClick={() => setRegistrationMethod("email")} className={`rounded-lg p-3 font-bold ${registrationMethod === "email" ? "bg-white text-[#4c1d95] shadow" : "text-[#6f687a]"}`}>Email + password</button></div>}
      <form onSubmit={challengeId ? verifyCode : submit} className="mt-7 space-y-4">
        {!challengeId && mode === "signup" && <Field label="Full name" value={fullName} onChange={setFullName} placeholder="Your full name" />}
        {!challengeId && mode === "signup" && registrationMethod === "phone" && <><Field label="Phone number" value={phone} onChange={setPhone} placeholder="+31612345678" type="tel" /><Field label="Email address (optional)" value={email} onChange={setEmail} placeholder="you@example.com" type="email" /></>}
        {!challengeId && mode === "signup" && registrationMethod === "email" && <Field label="Email address" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />}
        {!challengeId && mode === "login" && <Field label="Phone number or email" value={loginIdentifier} onChange={setLoginIdentifier} placeholder="+316… or you@example.com" />}
        {!challengeId && <Field label="Password" value={password} onChange={setPassword} placeholder="At least 8 characters" type="password" minLength={8} />}
        {challengeId && <Field label="SMS security code" value={verificationCode} onChange={(value) => setVerificationCode(value.replace(/\D/g, ""))} placeholder="000000" inputMode="numeric" />}
        {statusMessage && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">{statusMessage}</p>}{errorMessage && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{errorMessage}</p>}
        <button disabled={isSubmitting} className="w-full rounded-xl bg-[#4c1d95] px-6 py-5 text-lg font-bold text-white disabled:opacity-60">{isSubmitting ? "Please wait…" : challengeId ? "Verify and create account" : mode === "login" ? "Log in" : registrationMethod === "phone" ? "Send SMS code" : "Create account"}</button>
      </form>
    </div></div>
  </section></main>;
}

function Field({ label, value, onChange, placeholder, type = "text", minLength, inputMode }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; minLength?: number; inputMode?: "numeric" }) {
  return <label className="block text-sm font-bold text-[#151b36]">{label}<span className="mt-2 flex rounded-xl border border-[#e8dfe4] px-4 py-4"><input required={!label.includes("optional")} type={type} minLength={minLength} inputMode={inputMode} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-base outline-none" /></span></label>;
}

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

export function PortalShell({ inviteCode = "" }: { inviteCode?: string }) {
  const [portalSession, setPortalSession] = useState<PortalSession | null>(null);
  const [activeView, setActiveView] = useState<PortalView>("dashboard");

  useEffect(() => {
    queueMicrotask(() => {
      const storedSession = window.localStorage.getItem(portalSessionStorageKey);

      if (!storedSession) return;

      try {
        const parsedSession = JSON.parse(storedSession) as PortalSession;

        if (parsedSession.accessToken && parsedSession.email && parsedSession.refreshToken) {
          setPortalSession(parsedSession);
        } else {
          window.localStorage.removeItem(portalSessionStorageKey);
        }
      } catch {
        window.localStorage.removeItem(portalSessionStorageKey);
      }
    });
  }, []);

   useEffect(() => {
    if (!portalSession) return;

    const refreshDelay = Math.max(0, portalSession.expiresAt - Date.now() - 120_000);
    const refreshTimer = window.setTimeout(() => {
      refreshPortalSession(portalSession)
        .then((refreshedSession) => {
          if (!refreshedSession) return;
          window.localStorage.setItem(portalSessionStorageKey, JSON.stringify(refreshedSession));
          setPortalSession(refreshedSession);
        })
        .catch(() => {
          window.localStorage.removeItem(portalSessionStorageKey);
          setPortalSession(null);
        });
    }, refreshDelay);

    return () => window.clearTimeout(refreshTimer);
  }, [portalSession]);
  
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [activeView]);

  if (!portalSession) {
    return <PortalAuthPrompt inviteCode={inviteCode} onAuthenticated={setPortalSession} />;
  }

  const ActiveContent = (() => {
    if (activeView === "dashboard") return <Dashboard accessToken={portalSession.accessToken} />;
    if (activeView === "bookings") return <MyBookings accessToken={portalSession.accessToken} />;
    if (activeView === "photos") {
      return <SessionGalleries accessToken={portalSession.accessToken} onBackToDashboard={() => setActiveView("dashboard")} />;
    }
    if (activeView === "invoices") return <Invoices accessToken={portalSession.accessToken} />;
    if (activeView === "profile") {
      return <Profile accessToken={portalSession.accessToken} onBackToDashboard={() => setActiveView("dashboard")} />;
    }
    if (activeView === "faq") {
      return <FAQ accessToken={portalSession.accessToken} onBackToDashboard={() => setActiveView("dashboard")} />;
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

          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem(portalSessionStorageKey);
              setPortalSession(null);
              setActiveView("dashboard");
            }}
            className="mb-6 ml-8 inline-flex items-center gap-4 text-sm font-black uppercase tracking-[0.16em] text-[#f5e9d5]/90"
          >
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

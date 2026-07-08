import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

type SupabaseAuthUser = { email?: string; user?: { email?: string } };
type DogSummary = { name: string | null; profile_photo_url: string | null };
type BookingRow = { id: string; service_name: string | null; starts_at: string | null; ends_at: string | null; status: string | null; portal_clients: { full_name: string | null } | Array<{ full_name: string | null }> | null; portal_dogs: DogSummary | DogSummary[] | null };
type InvoiceRow = { amount_cents: number | null; currency: string | null; status: string | null; paid_on: string | null; revolut_transaction_id: string | null; line_items: Array<{ description?: string; quantity?: number; unitAmountCents?: number; unit_amount_cents?: number }> | null };
type PageVisitRow = { id: string; path: string | null; title: string | null; visitor_id: string | null; last_seen_at: string | null; created_at: string | null };

async function getVerifiedBackendAdminToken(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!accessToken || !supabaseUrl || !anonKey) return null;
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, { cache: "no-store", headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) return null;
  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  const email = payload?.email ?? payload?.user?.email;
  return email?.toLowerCase() === backendAdminEmail ? accessToken : null;
}

function pct(current: number, previous: number) { if (!previous && !current) return "0%"; if (!previous) return "100%"; return `${Math.round(((current - previous) / previous) * 100)}%`; }
function clientName(value: BookingRow["portal_clients"]) { const c = Array.isArray(value) ? value[0] : value; return c?.full_name?.trim() || "Client"; }
function dogList(value: BookingRow["portal_dogs"]) { return Array.isArray(value) ? value : value ? [value] : []; }
function minutes(start: string | null, end: string | null) { if (!start || !end) return "—"; const n = Math.max(0, Math.round((+new Date(end) - +new Date(start)) / 60000)); return n ? `${n} min` : "—"; }
function money(cents: number, currency = "EUR") { return new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(cents / 100); }

export async function GET(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);
  if (!adminAccessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const now = new Date(); const weekStart = new Date(now); weekStart.setDate(now.getDate() - 6); weekStart.setHours(0, 0, 0, 0); const prevWeekStart = new Date(weekStart); prevWeekStart.setDate(weekStart.getDate() - 7); const activeSince = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const [clients, dogs, bookings, invoices, visits] = await Promise.all([
      supabaseAdmin.from("portal_clients").select("id,created_at,status"),
      supabaseAdmin.from("portal_dogs").select("id,created_at,status"),
      supabaseAdmin.from("portal_bookings").select("id,service_name,starts_at,ends_at,status,portal_clients(full_name),portal_dogs(name,profile_photo_url)").order("starts_at", { ascending: true }),
      supabaseAdmin.from("portal_invoices").select("amount_cents,currency,status,paid_on,revolut_transaction_id,line_items"),
      supabaseAdmin.from("site_page_visits").select("id,path,title,visitor_id,last_seen_at,created_at").gte("last_seen_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()).order("last_seen_at", { ascending: false }).limit(200),
    ]);
    const firstError = [clients.error, dogs.error, bookings.error, invoices.error, visits.error].find(Boolean); if (firstError) throw firstError;
    const bookingRows = (bookings.data ?? []) as BookingRow[]; const invoiceRows = (invoices.data ?? []) as InvoiceRow[]; const visitRows = (visits.data ?? []) as PageVisitRow[];
    const currentBookings = bookingRows.filter((b) => b.starts_at && new Date(b.starts_at) >= weekStart); const previousBookings = bookingRows.filter((b) => b.starts_at && new Date(b.starts_at) >= prevWeekStart && new Date(b.starts_at) < weekStart);
    const paidInvoices = invoiceRows.filter((i) => i.status === "paid" && i.revolut_transaction_id); const currentRevenue = paidInvoices.filter((i) => i.paid_on && new Date(i.paid_on) >= weekStart).reduce((s, i) => s + (i.amount_cents ?? 0), 0); const previousRevenue = paidInvoices.filter((i) => i.paid_on && new Date(i.paid_on) >= prevWeekStart && new Date(i.paid_on) < weekStart).reduce((s, i) => s + (i.amount_cents ?? 0), 0);
    const pageMap = new Map<string, { path: string; title: string; activeVisitors: Set<string>; views24h: number; lastSeenAt: string | null }>();
    visitRows.forEach((v) => { const path = v.path || "/"; const item = pageMap.get(path) ?? { path, title: v.title || path, activeVisitors: new Set<string>(), views24h: 0, lastSeenAt: v.last_seen_at }; item.views24h += 1; if (v.last_seen_at && v.last_seen_at >= activeSince) item.activeVisitors.add(v.visitor_id || v.id); if ((v.last_seen_at || "") > (item.lastSeenAt || "")) item.lastSeenAt = v.last_seen_at; pageMap.set(path, item); });
    return NextResponse.json({ isFallback: false, stats: { bookings: { value: bookingRows.length, trend: pct(currentBookings.length, previousBookings.length) }, clients: { value: (clients.data ?? []).length, trend: "live" }, dogs: { value: (dogs.data ?? []).length, trend: "live" }, revenue: { value: money(currentRevenue, paidInvoices[0]?.currency || "EUR"), trend: pct(currentRevenue, previousRevenue) } }, pageTracker: Array.from(pageMap.values()).map((p) => ({ ...p, activeVisitors: p.activeVisitors.size })).sort((a, b) => b.activeVisitors - a.activeVisitors || b.views24h - a.views24h).slice(0, 8), topServices: Object.entries(currentBookings.reduce<Record<string, number>>((acc, b) => { const key = b.service_name || "Unknown service"; acc[key] = (acc[key] ?? 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 4), upcomingBookings: bookingRows.filter((b) => b.starts_at && new Date(b.starts_at) >= now).slice(0, 4).map((b) => ({ id: b.id, dog: dogList(b.portal_dogs).map((d) => d.name).filter(Boolean).join(", ") || clientName(b.portal_clients), service: b.service_name || "Booking", length: minutes(b.starts_at, b.ends_at), time: b.starts_at, status: b.status || "pending", image: dogList(b.portal_dogs)[0]?.profile_photo_url || null })), revenueByService: Object.entries(paidInvoices.reduce<Record<string, number>>((acc, invoice) => { (invoice.line_items?.length ? invoice.line_items : [{ description: "Revolut payments", quantity: 1, unitAmountCents: invoice.amount_cents ?? 0 }]).forEach((item) => { const key = item.description || "Revolut payments"; acc[key] = (acc[key] ?? 0) + Math.round((item.quantity ?? 1) * (item.unitAmountCents ?? item.unit_amount_cents ?? 0)); }); return acc; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 4) });
  } catch (error) { console.error("Dashboard overview unavailable", { route: "/api/dashboard/overview", error }); return NextResponse.json({ error: "Unable to load dashboard overview." }, { status: 502 }); }
}
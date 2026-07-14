import { NextResponse } from "next/server";

import { buildBookingIcs } from "@/utils/calendar-feed";
import { fallbackBookings, type BookingStatus } from "@/utils/bookings";
import { deleteOutlookEvent, getGraphCalendarConfig } from "@/utils/microsoft-graph-calendar";
import { getExistingBookingSyncRow, loadAdminBooking, outlookRemovalStatuses } from "@/utils/outlook-booking-sync";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";
const allowedStatuses = new Set<BookingStatus>(["requested", "pending_confirmation", "confirmed", "reschedule_requested", "cancelled", "completed", "no_show", "needs_review", "busy"]);

type SupabaseAuthUser = { email?: string; user?: { email?: string } };

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

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let booking = fallbackBookings.find((item) => item.id === id);

  if (!booking) {
    try {
      booking = await loadAdminBooking(id);
    } catch (error) {
      console.error("Booking ICS lookup failed", { route: "/api/calendar/booking/[id]", id, error });
    }
  }

  if (!booking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  return new Response(buildBookingIcs([booking], `Jeroen & Paws - ${booking.dogName}`), { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="jeroen-and-paws-${booking.id}.ics"` } });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ error: "Send booking updates as JSON." }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (typeof payload.status === "string" && allowedStatuses.has(payload.status as BookingStatus)) {
    updates.status = payload.status;
    updates.cancelled_at = outlookRemovalStatuses.has(payload.status as BookingStatus) ? new Date().toISOString() : null;
  }
  if (typeof payload.startsAt === "string") updates.starts_at = payload.startsAt;
  if (typeof payload.endsAt === "string") updates.ends_at = payload.endsAt;
  if (typeof payload.notes === "string") updates.notes = payload.notes;
  if (!Object.keys(updates).length) return NextResponse.json({ error: "No valid booking updates supplied." }, { status: 400 });

  let existing;
  try {
    existing = await getExistingBookingSyncRow(id);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load booking sync state." }, { status: 502 });
  }

  if (!existing) {
    const importUpdates: Record<string, unknown> = {};
    if (typeof updates.status === "string") importUpdates.status = updates.status;
    if (typeof updates.starts_at === "string") importUpdates.starts_at = updates.starts_at;
    if (typeof updates.ends_at === "string") importUpdates.ends_at = updates.ends_at;
    if (typeof updates.notes === "string") importUpdates.notes = updates.notes;
    const { error: importError } = await supabaseAdmin.from("portal_outlook_imports").update(importUpdates).eq("id", id);
    if (importError) return NextResponse.json({ error: importError.message }, { status: 502 });
    const booking = await loadAdminBooking(id);
    return NextResponse.json({ booking, outlookSyncError: null });
  }

  const { error } = await supabaseAdmin.from("portal_bookings").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  const booking = await loadAdminBooking(id);
  return NextResponse.json({ booking, outlookSyncError: null });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { data: existing, error: existingError } = await supabaseAdmin.from("portal_bookings").select("outlook_event_id").eq("id", id).maybeSingle();
  if (existingError) return NextResponse.json({ error: existingError.message }, { status: 502 });

  if (!existing) {
    const { error: importError } = await supabaseAdmin.from("portal_outlook_imports").delete().eq("id", id);
    if (importError) return NextResponse.json({ error: importError.message }, { status: 502 });
    return NextResponse.json({ ok: true });
  }

  const config = getGraphCalendarConfig();
  const outlookEventId = existing?.outlook_event_id;
  if (config && outlookEventId) await deleteOutlookEvent(config, outlookEventId);

  const { error } = await supabaseAdmin.from("portal_bookings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";

import { buildBookingIcs } from "@/utils/calendar-feed";
import { fallbackBookings, mapBookingRow, type BookingStatus, type CalendarBooking, type SupabaseBookingRow } from "@/utils/bookings";
import { createOutlookEvent, deleteOutlookEvent, getGraphCalendarConfig, updateOutlookEvent } from "@/utils/microsoft-graph-calendar";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";
const outlookRemovalStatuses = new Set<BookingStatus>(["cancelled", "no_show"]);
const allowedStatuses = new Set<BookingStatus>(["requested", "pending_confirmation", "confirmed", "reschedule_requested", "cancelled", "completed", "no_show", "needs_review", "busy"]);

type SupabaseAuthUser = { email?: string; user?: { email?: string } };
type BookingSyncColumns = SupabaseBookingRow & { outlook_event_id?: string | null };

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

function toOutlookInput(booking: CalendarBooking) {
  return {
    subject: `[JP] ${booking.dogName}`,
    body: [
      `Jeroen & Paws booking ${booking.id}`,
      `Client: ${booking.clientName}`,
      `Dogs: ${booking.dogName}`,
      `Status: ${booking.status}`,
      booking.notes ? `Notes: ${booking.notes}` : "",
    ].filter(Boolean).join("\n"),
    startsAt: booking.startsAt,
    endsAt: booking.endsAt,
    timezone: booking.timezone,
    location: booking.location,
  };
}

async function loadAdminBooking(id: string) {
  const { data, error } = await supabaseAdmin.from("admin_booking_calendar").select("*").eq("id", id).limit(1).single();
  if (error) throw error;
  return mapBookingRow(data as SupabaseBookingRow);
}

async function syncOutlookAfterBookingChange(booking: CalendarBooking, previousOutlookEventId?: string | null) {
  const config = getGraphCalendarConfig();
  const shouldHaveOutlookEvent = booking.status === "confirmed" || booking.status === "busy";
  const shouldRemoveOutlookEvent = outlookRemovalStatuses.has(booking.status) || !shouldHaveOutlookEvent;

  if (!config) {
    await supabaseAdmin.from("portal_bookings").update({ sync_status: shouldHaveOutlookEvent ? "failed" : "not_synced", sync_error: shouldHaveOutlookEvent ? "Microsoft Graph calendar is not configured." : null }).eq("id", booking.id);
    return shouldHaveOutlookEvent ? "Microsoft Graph calendar is not configured." : null;
  }

  try {
    if (previousOutlookEventId && shouldRemoveOutlookEvent) {
      await deleteOutlookEvent(config, previousOutlookEventId);
      await supabaseAdmin.from("portal_bookings").update({ outlook_event_id: null, outlook_ical_uid: null, outlook_change_key: null, outlook_web_link: null, sync_status: "not_synced", sync_error: null, outlook_last_synced_at: new Date().toISOString() }).eq("id", booking.id);
      return null;
    }

    if (!shouldHaveOutlookEvent) return null;

    const event = previousOutlookEventId ? await updateOutlookEvent(config, previousOutlookEventId, toOutlookInput(booking)) : await createOutlookEvent(config, toOutlookInput(booking));
    await supabaseAdmin.from("portal_bookings").update({ outlook_event_id: event.id, outlook_ical_uid: event.iCalUId ?? null, outlook_change_key: event.changeKey ?? null, outlook_web_link: event.webLink ?? null, sync_status: "synced", sync_error: null, outlook_last_synced_at: new Date().toISOString() }).eq("id", booking.id);
    return null;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Outlook sync failed.";
    await supabaseAdmin.from("portal_bookings").update({ sync_status: "failed", sync_error: message }).eq("id", booking.id);
    return message;
  }
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

  const { data: existing, error: existingError } = await supabaseAdmin.from("portal_bookings").select("outlook_event_id").eq("id", id).single();
  if (existingError) return NextResponse.json({ error: existingError.message }, { status: 502 });

  const { error } = await supabaseAdmin.from("portal_bookings").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  const booking = await loadAdminBooking(id);
  const outlookSyncError = await syncOutlookAfterBookingChange(booking, (existing as BookingSyncColumns | null)?.outlook_event_id ?? null);
  const syncedBooking = await loadAdminBooking(id);

  return NextResponse.json({ booking: syncedBooking, outlookSyncError });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const { data: existing, error: existingError } = await supabaseAdmin.from("portal_bookings").select("outlook_event_id").eq("id", id).single();
  if (existingError) return NextResponse.json({ error: existingError.message }, { status: 502 });

  const config = getGraphCalendarConfig();
  const outlookEventId = (existing as BookingSyncColumns | null)?.outlook_event_id;
  if (config && outlookEventId) await deleteOutlookEvent(config, outlookEventId);

  const { error } = await supabaseAdmin.from("portal_bookings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ ok: true });
}

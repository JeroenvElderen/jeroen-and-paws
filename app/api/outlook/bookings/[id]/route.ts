import { NextResponse } from "next/server";

import { mapBookingRow, type CalendarBooking, type SupabaseBookingRow } from "@/utils/bookings";
import { createOutlookEvent, deleteOutlookEvent, getGraphCalendarConfig, updateOutlookEvent } from "@/utils/microsoft-graph-calendar";
import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

function toOutlookInput(booking: CalendarBooking) {
  return {
    subject: `[JP] ${booking.serviceName} - ${booking.dogName} - ${booking.clientName}`,
    body: [
      `Jeroen & Paws booking ${booking.id}`,
      `Client: ${booking.clientName}`,
      `Dog: ${booking.dogName}`,
      `Status: ${booking.status}`,
      booking.notes ? `Notes: ${booking.notes}` : "",
    ].filter(Boolean).join("\n"),
    startsAt: booking.startsAt,
    endsAt: booking.endsAt,
    timezone: booking.timezone,
    location: booking.location,
  };
}

async function loadBooking(id: string) {
  const rows = (await supabaseRestFetch(`/rest/v1/admin_booking_calendar?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { cache: "no-store" })) as SupabaseBookingRow[];
  return rows[0] ? mapBookingRow(rows[0]) : null;
}

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const config = getGraphCalendarConfig();

  if (!config) return NextResponse.json({ message: "Microsoft Graph calendar is not configured." }, { status: 503 });

  const { id } = await params;
  const booking = await loadBooking(id);

  if (!booking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  try {
    if (booking.status === "cancelled" && booking.outlookEventId) {
      await deleteOutlookEvent(config, booking.outlookEventId);
      await supabaseRestFetch(`/rest/v1/portal_bookings?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify({ sync_status: "synced", outlook_last_synced_at: new Date().toISOString() }),
      });
      return NextResponse.json({ action: "deleted" });
    }

    const event = booking.outlookEventId
      ? await updateOutlookEvent(config, booking.outlookEventId, toOutlookInput(booking))
      : await createOutlookEvent(config, toOutlookInput(booking));

    await supabaseRestFetch(`/rest/v1/portal_bookings?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({
        outlook_event_id: event.id,
        outlook_ical_uid: event.iCalUId ?? null,
        outlook_change_key: event.changeKey ?? null,
        outlook_web_link: event.webLink ?? null,
        sync_status: "synced",
        sync_error: null,
        outlook_last_synced_at: new Date().toISOString(),
      }),
    });

    return NextResponse.json({ action: booking.outlookEventId ? "updated" : "created", eventId: event.id });
  } catch (error) {
    await supabaseRestFetch(`/rest/v1/portal_bookings?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify({ sync_status: "failed", sync_error: error instanceof Error ? error.message : "Outlook sync failed." }),
    });
    throw error;
  }
}
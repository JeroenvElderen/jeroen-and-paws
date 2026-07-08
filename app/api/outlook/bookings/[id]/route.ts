import { NextResponse } from "next/server";

import { mapBookingRow, type CalendarBooking, type SupabaseBookingRow } from "@/utils/bookings";
import { createOutlookEvent, deleteOutlookEvent, getGraphCalendarConfig, updateOutlookEvent } from "@/utils/microsoft-graph-calendar";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

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

async function loadBooking(id: string) {
  const { data: rows, error } = await supabaseAdmin
    .from("admin_booking_calendar")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) throw error;

  return rows?.[0] ? mapBookingRow(rows[0] as SupabaseBookingRow) : null;
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
      const { error: syncError } = await supabaseAdmin
        .from("portal_bookings")
        .update({ sync_status: "synced", outlook_last_synced_at: new Date().toISOString() })
        .eq("id", id);

      if (syncError) throw syncError;
      return NextResponse.json({ action: "deleted" });
    }

    const event = booking.outlookEventId
      ? await updateOutlookEvent(config, booking.outlookEventId, toOutlookInput(booking))
      : await createOutlookEvent(config, toOutlookInput(booking));

    const { error: syncError } = await supabaseAdmin
      .from("portal_bookings")
      .update({
        outlook_event_id: event.id,
        outlook_ical_uid: event.iCalUId ?? null,
        outlook_change_key: event.changeKey ?? null,
        outlook_web_link: event.webLink ?? null,
        sync_status: "synced",
        sync_error: null,
        outlook_last_synced_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (syncError) throw syncError;

    return NextResponse.json({ action: booking.outlookEventId ? "updated" : "created", eventId: event.id });
  } catch (error) {
    await supabaseAdmin
      .from("portal_bookings")
      .update({ sync_status: "failed", sync_error: error instanceof Error ? error.message : "Outlook sync failed." })
      .eq("id", id);
    throw error;
  }
}
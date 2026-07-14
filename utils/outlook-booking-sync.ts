import { mapBookingRow, type BookingStatus, type CalendarBooking, type SupabaseBookingRow } from "@/utils/bookings";
import { createOutlookEvent, deleteOutlookEvent, getGraphCalendarConfig, updateOutlookEvent } from "@/utils/microsoft-graph-calendar";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const outlookRemovalStatuses = new Set<BookingStatus>(["cancelled", "no_show"]);
export const outlookApprovedStatuses = new Set<BookingStatus>(["confirmed", "busy", "completed"]);

type ExistingBookingSyncRow = { outlook_event_id?: string | null } | null;

export type OutlookSyncResult = {
  bookingId: string;
  error: string | null;
};

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

export function shouldSyncBookingToOutlook(status: BookingStatus) {
  return outlookApprovedStatuses.has(status);
}

export async function loadAdminBooking(id: string) {
  const { data, error } = await supabaseAdmin
    .from("admin_booking_calendar")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) throw error;

  return mapBookingRow(data as SupabaseBookingRow);
}

export async function loadAdminBookings(ids: string[]) {
  if (!ids.length) return [];

  const { data, error } = await supabaseAdmin
    .from("admin_booking_calendar")
    .select("*")
    .in("id", ids);

  if (error) throw error;

  return ((data ?? []) as SupabaseBookingRow[]).map(mapBookingRow);
}

export async function getExistingBookingSyncRow(id: string) {
  const { data, error } = await supabaseAdmin
    .from("portal_bookings")
    .select("outlook_event_id")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data as ExistingBookingSyncRow;
}

export async function syncBookingToOutlook(booking: CalendarBooking, previousOutlookEventId?: string | null): Promise<OutlookSyncResult> {
  const config = getGraphCalendarConfig();
  const shouldHaveOutlookEvent = shouldSyncBookingToOutlook(booking.status);
  const shouldRemoveOutlookEvent = outlookRemovalStatuses.has(booking.status) || !shouldHaveOutlookEvent;

  if (!config) {
    if (!shouldHaveOutlookEvent) {
      return { bookingId: booking.id, error: null };
    }

    await supabaseAdmin
      .from("portal_bookings")
      .update({
        sync_status: "failed",
        sync_error: "Microsoft Graph calendar is not configured.",
      })
      .eq("id", booking.id);
    return { bookingId: booking.id, error: "Microsoft Graph calendar is not configured." };
  }

  try {
    if (previousOutlookEventId && shouldRemoveOutlookEvent) {
      await deleteOutlookEvent(config, previousOutlookEventId);
      await supabaseAdmin
        .from("portal_bookings")
        .update({
          outlook_event_id: null,
          outlook_ical_uid: null,
          outlook_change_key: null,
          outlook_web_link: null,
          sync_status: "not_synced",
          sync_error: null,
          outlook_last_synced_at: new Date().toISOString(),
        })
        .eq("id", booking.id);
      return { bookingId: booking.id, error: null };
    }

    if (!shouldHaveOutlookEvent) {
      return { bookingId: booking.id, error: null };
    }

    const event = previousOutlookEventId
      ? await updateOutlookEvent(config, previousOutlookEventId, toOutlookInput(booking))
      : await createOutlookEvent(config, toOutlookInput(booking));

    await supabaseAdmin
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
      .eq("id", booking.id);

    return { bookingId: booking.id, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Outlook sync failed.";
    await supabaseAdmin
      .from("portal_bookings")
      .update({ sync_status: "failed", sync_error: message })
      .eq("id", booking.id);
    return { bookingId: booking.id, error: message };
  }
}

export async function syncBookingsToOutlook(bookings: CalendarBooking[]) {
  const results: OutlookSyncResult[] = [];

  for (const booking of bookings) {
    const existing = await getExistingBookingSyncRow(booking.id);
    results.push(await syncBookingToOutlook(booking, existing?.outlook_event_id ?? null));
  }

  return results;
}

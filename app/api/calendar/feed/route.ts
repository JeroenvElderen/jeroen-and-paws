import { buildBookingIcs } from "@/utils/calendar-feed";
import { fallbackBookings, mapBookingRow, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const adminToken = url.searchParams.get("admin_token");
  const configuredAdminToken = process.env.ADMIN_CALENDAR_FEED_TOKEN;

  if (!token && (!configuredAdminToken || adminToken !== configuredAdminToken)) {
    return new Response("Calendar feed token is required.", { status: 401 });
  }

  let bookings = fallbackBookings;

  try {
    const query = token
      ? supabaseAdmin.from("portal_calendar_feed").select("*").eq("feed_token", token).order("starts_at", { ascending: true })
      : supabaseAdmin.from("admin_booking_calendar").select("*").order("starts_at", { ascending: true });
    const { data: rows, error } = await query;

    if (error) throw error;

    bookings = ((rows ?? []) as SupabaseBookingRow[]).map(mapBookingRow);
  } catch (error) {
    console.error("Calendar feed fallback", { route: "/api/calendar/feed", error });
  }

  return new Response(buildBookingIcs(bookings), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=jeroen-and-paws-bookings.ics",
    },
  });
}
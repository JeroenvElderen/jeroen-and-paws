import { buildBookingIcs } from "@/utils/calendar-feed";
import { fallbackBookings, mapBookingRow, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseRestFetch } from "@/utils/supabase-rest";

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
    const path = token
      ? `/rest/v1/portal_calendar_feed?select=*&feed_token=eq.${encodeURIComponent(token)}&order=starts_at.asc`
      : "/rest/v1/admin_booking_calendar?select=*&order=starts_at.asc";
    const rows = (await supabaseRestFetch(path, { cache: "no-store" })) as SupabaseBookingRow[];
    bookings = rows.map(mapBookingRow);
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
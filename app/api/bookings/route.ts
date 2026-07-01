import { NextResponse } from "next/server";

import { fallbackBookings, mapBookingRow, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") || "admin";
  const authHeader = request.headers.get("authorization") || undefined;
  const accessToken = authHeader?.replace(/^Bearer\s+/i, "");

  try {
    const path = scope === "portal"
      ? "/rest/v1/portal_booking_list?select=*&order=starts_at.asc"
      : "/rest/v1/admin_booking_calendar?select=*&order=starts_at.asc";
    const rows = (await supabaseRestFetch(path, { cache: "no-store" }, scope === "portal" ? accessToken : undefined)) as SupabaseBookingRow[];

    return NextResponse.json({ bookings: rows.map(mapBookingRow), isFallback: false });
  } catch (error) {
    console.error("Booking data fallback", { route: "/api/bookings", scope, error });
    return NextResponse.json({ bookings: fallbackBookings, isFallback: true });
  }
}
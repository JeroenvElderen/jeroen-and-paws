import { NextResponse } from "next/server";

import { buildBookingIcs } from "@/utils/calendar-feed";
import { fallbackBookings, mapBookingRow, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let booking = fallbackBookings.find((item) => item.id === id);

  if (!booking) {
    try {
      const rows = (await supabaseRestFetch(`/rest/v1/admin_booking_calendar?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, { cache: "no-store" })) as SupabaseBookingRow[];
      booking = rows[0] ? mapBookingRow(rows[0]) : undefined;
    } catch (error) {
      console.error("Booking ICS lookup failed", { route: "/api/calendar/booking/[id]", id, error });
    }
  }

  if (!booking) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  return new Response(buildBookingIcs([booking], `Jeroen & Paws - ${booking.dogName}`), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="jeroen-and-paws-${booking.id}.ics"`,
    },
  });
}
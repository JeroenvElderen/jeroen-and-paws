import { NextResponse } from "next/server";

import { buildBookingIcs } from "@/utils/calendar-feed";
import { fallbackBookings, mapBookingRow, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let booking = fallbackBookings.find((item) => item.id === id);

  if (!booking) {
    try {
      const { data: rows, error } = await supabaseAdmin
        .from("admin_booking_calendar")
        .select("*")
        .eq("id", id)
        .limit(1);

      if (error) throw error;

      booking = rows?.[0] ? mapBookingRow(rows[0] as SupabaseBookingRow) : undefined;
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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ error: "Send booking updates as JSON." }, { status: 400 });

  const allowedStatuses = new Set(["requested", "pending_confirmation", "confirmed", "reschedule_requested", "cancelled", "completed", "no_show", "needs_review", "busy"]);
  const updates: Record<string, unknown> = {};
  if (typeof payload.status === "string" && allowedStatuses.has(payload.status)) updates.status = payload.status;
  if (typeof payload.startsAt === "string") updates.starts_at = payload.startsAt;
  if (typeof payload.endsAt === "string") updates.ends_at = payload.endsAt;
  if (typeof payload.notes === "string") updates.notes = payload.notes;
  if (!Object.keys(updates).length) return NextResponse.json({ error: "No valid booking updates supplied." }, { status: 400 });

  const { data, error } = await supabaseAdmin.from("portal_bookings").update(updates).eq("id", id).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ booking: data });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { error } = await supabaseAdmin.from("portal_bookings").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ ok: true });
}
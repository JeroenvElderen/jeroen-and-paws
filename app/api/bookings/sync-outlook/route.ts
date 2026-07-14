import { NextResponse } from "next/server";

import { getExistingBookingSyncRow, loadAdminBooking, syncBookingToOutlook } from "@/utils/outlook-booking-sync";

export const runtime = "nodejs";

type SupabaseWebhookPayload = {
  record?: { id?: string };
  old_record?: { id?: string };
  id?: string;
};

function isAuthorized(request: Request) {
  const secret = process.env.BOOKING_SYNC_WEBHOOK_SECRET;

  if (!secret) return false;

  const bearerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const headerSecret = request.headers.get("x-booking-sync-secret");

  return bearerToken === secret || headerSecret === secret;
}

function getBookingId(payload: SupabaseWebhookPayload | null) {
  return payload?.record?.id || payload?.old_record?.id || payload?.id || null;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => null)) as SupabaseWebhookPayload | null;
  const bookingId = getBookingId(payload);

  if (!bookingId) {
    return NextResponse.json({ error: "Missing booking id." }, { status: 400 });
  }

  try {
    const existing = await getExistingBookingSyncRow(bookingId);

    if (!existing) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    const booking = await loadAdminBooking(bookingId);
    const result = await syncBookingToOutlook(booking, existing.outlook_event_id ?? null);

    return NextResponse.json({ bookingId, outlookSyncError: result.error });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sync booking to Outlook.";

    return NextResponse.json({ error: message }, { status: 502 });
  }
}

import { NextResponse } from "next/server";

import { getExistingBookingSyncRow, loadAdminBooking, syncBookingToOutlook } from "@/utils/outlook-booking-sync";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const existing = await getExistingBookingSyncRow(id);

  if (!existing) return NextResponse.json({ message: "Booking not found." }, { status: 404 });

  const booking = await loadAdminBooking(id);
  const result = await syncBookingToOutlook(booking, existing.outlook_event_id ?? null);

  return NextResponse.json({ action: result.error ? "failed" : "synced", outlookSyncError: result.error });
}

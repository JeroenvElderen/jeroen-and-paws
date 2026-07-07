import { NextResponse } from "next/server";
import { z } from "zod";

import { fallbackBookings, mapBookingRow, type BookingStatus, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

const createBookingSchema = z.object({
  dogId: z.string().uuid(),
  serviceName: z.string().trim().min(2),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  timezone: z.string().trim().min(1).default("Europe/Dublin"),
  location: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  status: z.enum(["requested", "pending_confirmation", "confirmed", "reschedule_requested", "cancelled", "completed", "no_show", "needs_review", "busy"]).default("confirmed"),
});

type SupabaseAuthUser = {
  email?: string;
  user?: { email?: string };
};

type BookingOptionDogRow = {
  id: string;
  name: string | null;
  client_id: string;
  profile_photo_url: string | null;
  portal_clients: { full_name: string | null } | null;
};

async function getVerifiedBackendAdminToken(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!accessToken || !supabaseUrl || !anonKey) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    cache: "no-store",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return null;

  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  const email = payload?.email ?? payload?.user?.email;

  return email?.toLowerCase() === backendAdminEmail ? accessToken : null;
}

async function getBookingOptions(accessToken: string) {
  const dogRows = (await supabaseRestFetch(
    "/rest/v1/portal_dogs?select=id,name,client_id,profile_photo_url,portal_clients(full_name)&order=name.asc",
    { cache: "no-store" },
    accessToken,
  )) as BookingOptionDogRow[];

  return dogRows.map((dog) => ({
    id: dog.id,
    name: dog.name?.trim() || "Unnamed dog",
    clientId: dog.client_id,
    clientName: dog.portal_clients?.full_name?.trim() || "Client to confirm",
    image: dog.profile_photo_url,
  }));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") || "admin";
  const authHeader = request.headers.get("authorization") || undefined;
  const accessToken = authHeader?.replace(/^Bearer\s+/i, "");

  if (scope === "admin") {
    const adminAccessToken = await getVerifiedBackendAdminToken(request);
    if (!adminAccessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const rows = (await supabaseRestFetch("/rest/v1/admin_booking_calendar?select=*&order=starts_at.asc", { cache: "no-store" }, adminAccessToken)) as SupabaseBookingRow[];
      const dogs = await getBookingOptions(adminAccessToken);

      return NextResponse.json({ bookings: rows.map(mapBookingRow), dogs, isFallback: false });
    } catch (error) {
      console.error("Booking data unavailable", { route: "/api/bookings", scope, error });
      return NextResponse.json({ error: "Unable to load bookings from Supabase." }, { status: 502 });
    }
  }

  try {
    const rows = (await supabaseRestFetch("/rest/v1/portal_booking_list?select=*&order=starts_at.asc", { cache: "no-store" }, accessToken)) as SupabaseBookingRow[];

    return NextResponse.json({ bookings: rows.map(mapBookingRow), isFallback: false });
  } catch (error) {
    console.error("Booking data fallback", { route: "/api/bookings", scope, error });
    return NextResponse.json({ bookings: fallbackBookings, isFallback: true });
  }
}

export async function POST(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);

  if (!adminAccessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = createBookingSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid booking payload." }, { status: 400 });

  if (new Date(payload.data.endsAt) <= new Date(payload.data.startsAt)) {
    return NextResponse.json({ error: "The booking end time must be after the start time." }, { status: 400 });
  }

  try {
    const dogRows = (await supabaseRestFetch(
      `/rest/v1/portal_dogs?select=id,client_id&id=eq.${encodeURIComponent(payload.data.dogId)}&limit=1`,
      { cache: "no-store" },
      adminAccessToken,
    )) as Array<{ id: string; client_id: string }>;
    const dog = dogRows[0];

    if (!dog) return NextResponse.json({ error: "Selected dog was not found." }, { status: 404 });

    const rows = (await supabaseRestFetch(
      "/rest/v1/portal_bookings?select=*",
      {
        method: "POST",
        body: JSON.stringify({
          client_id: dog.client_id,
          dog_id: dog.id,
          service_name: payload.data.serviceName,
          starts_at: payload.data.startsAt,
          ends_at: payload.data.endsAt,
          timezone: payload.data.timezone,
          location: payload.data.location || null,
          notes: payload.data.notes || null,
          status: payload.data.status satisfies BookingStatus,
          source: "admin_import",
          sync_status: "not_synced",
        }),
      },
      adminAccessToken,
    )) as SupabaseBookingRow[];

    return NextResponse.json({ booking: rows[0] ? mapBookingRow(rows[0]) : null }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create booking.";
    console.error("Booking create failed", { route: "/api/bookings", error });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
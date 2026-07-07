import { NextResponse } from "next/server";
import { z } from "zod";

import { fallbackBookings, mapBookingRow, type BookingStatus, type SupabaseBookingRow } from "@/utils/bookings";
import { supabaseAdmin } from "@/utils/supabase-admin";

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
  portal_clients: { full_name: string | null } | Array<{ full_name: string | null }> | null;
};

function getClientFullName(portalClients: BookingOptionDogRow["portal_clients"]) {
  const client = Array.isArray(portalClients) ? portalClients[0] : portalClients;

  return client?.full_name?.trim() || "Client to confirm";
}

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

async function getBookingOptions() {
  const { data: dogRows, error } = await supabaseAdmin
    .from("portal_dogs")
    .select("id,name,client_id,profile_photo_url,portal_clients(full_name)")
    .order("name", { ascending: true });

  if (error) throw error;

  return ((dogRows ?? []) as BookingOptionDogRow[]).map((dog) => ({
    id: dog.id,
    name: dog.name?.trim() || "Unnamed dog",
    clientId: dog.client_id,
    clientName: getClientFullName(dog.portal_clients),
    image: dog.profile_photo_url,
  }));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = url.searchParams.get("scope") || "admin";
  if (scope === "admin") {
    const adminAccessToken = await getVerifiedBackendAdminToken(request);
    if (!adminAccessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const { data: rows, error } = await supabaseAdmin
        .from("admin_booking_calendar")
        .select("*")
        .order("starts_at", { ascending: true });

      if (error) throw error;

      const dogs = await getBookingOptions();

      return NextResponse.json({ bookings: ((rows ?? []) as SupabaseBookingRow[]).map(mapBookingRow), dogs, isFallback: false });
    } catch (error) {
      console.error("Booking data unavailable", { route: "/api/bookings", scope, error });
      return NextResponse.json({ error: "Unable to load bookings from Supabase." }, { status: 502 });
    }
  }

  try {
    const { data: rows, error } = await supabaseAdmin
      .from("portal_booking_list")
      .select("*")
      .order("starts_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ bookings: ((rows ?? []) as SupabaseBookingRow[]).map(mapBookingRow), isFallback: false });
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
    const { data: dogRows, error: dogError } = await supabaseAdmin
      .from("portal_dogs")
      .select("id,client_id")
      .eq("id", payload.data.dogId)
      .limit(1);

    if (dogError) throw dogError;

    const dog = (dogRows as Array<{ id: string; client_id: string }> | null)?.[0];

    if (!dog) return NextResponse.json({ error: "Selected dog was not found." }, { status: 404 });

    const { data: rows, error: insertError } = await supabaseAdmin
      .from("portal_bookings")
      .insert({
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
      })
      .select("*");

    if (insertError) throw insertError;

    return NextResponse.json({ booking: rows?.[0] ? mapBookingRow(rows[0] as SupabaseBookingRow) : null }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create booking.";
    console.error("Booking create failed", { route: "/api/bookings", error });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
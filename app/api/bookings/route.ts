import { NextResponse } from "next/server";
import { z } from "zod";

import { fallbackBookings, mapBookingRow, type BookingStatus, type CalendarBooking, type SupabaseBookingRow } from "@/utils/bookings";
import { createOutlookEvent, getGraphCalendarConfig } from "@/utils/microsoft-graph-calendar";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

const createBookingSchema = z.object({
  clientId: z.string().uuid(),
  dogIds: z.array(z.string().uuid()).min(1, "Select at least one dog."),
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

async function loadAdminBookings(ids: string[]) {
  if (!ids.length) return [];

  const { data, error } = await supabaseAdmin
    .from("admin_booking_calendar")
    .select("*")
    .in("id", ids);

  if (error) throw error;

  return ((data ?? []) as SupabaseBookingRow[]).map(mapBookingRow);
}

async function syncConfirmedBookingsToOutlook(bookings: CalendarBooking[]) {
  const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed");
  const config = getGraphCalendarConfig();
  const errors: Array<{ bookingId: string; message: string }> = [];

  if (!confirmedBookings.length) return errors;

  if (!config) {
    const message = "Microsoft Graph calendar is not configured.";
    await supabaseAdmin
      .from("portal_bookings")
      .update({ sync_status: "failed", sync_error: message })
      .in("id", confirmedBookings.map((booking) => booking.id));

    return confirmedBookings.map((booking) => ({ bookingId: booking.id, message }));
  }

  for (const booking of confirmedBookings) {
    try {
      const event = await createOutlookEvent(config, toOutlookInput(booking));
      const { error } = await supabaseAdmin
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

      if (error) throw error;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Outlook sync failed.";
      errors.push({ bookingId: booking.id, message });

      await supabaseAdmin
        .from("portal_bookings")
        .update({ sync_status: "failed", sync_error: message })
        .eq("id", booking.id);
    }
  }

  return errors;
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
      return NextResponse.json({ bookings: fallbackBookings, dogs: [], isFallback: true, error: "Unable to load bookings from Supabase." });
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
      .in("id", payload.data.dogIds);

    if (dogError) throw dogError;

    const dogs = (dogRows as Array<{ id: string; client_id: string }> | null) ?? [];

    if (dogs.length !== payload.data.dogIds.length) return NextResponse.json({ error: "One or more selected dogs were not found." }, { status: 404 });
    if (dogs.some((dog) => dog.client_id !== payload.data.clientId)) return NextResponse.json({ error: "Selected dogs must belong to the selected client." }, { status: 400 });

    const orderedDogs = payload.data.dogIds.map((dogId) => dogs.find((dog) => dog.id === dogId)).filter((dog): dog is { id: string; client_id: string } => Boolean(dog));
    const primaryDog = orderedDogs[0];

    const { data: rows, error: insertError } = await supabaseAdmin
      .from("portal_bookings")
      .insert({
        client_id: payload.data.clientId,
        dog_id: primaryDog.id,
        dog_ids: orderedDogs.map((dog) => dog.id),
        service_name: payload.data.serviceName,
        starts_at: payload.data.startsAt,
        ends_at: payload.data.endsAt,
        timezone: payload.data.timezone,
        location: payload.data.location || null,
        notes: payload.data.notes || null,
        status: payload.data.status satisfies BookingStatus,
        source: "admin_import",
        sync_status: payload.data.status === "confirmed" ? "pending" : "not_synced",
      })
      .select("*");

    if (insertError) throw insertError;

    const createdBookingIds = ((rows ?? []) as SupabaseBookingRow[]).map((row) => row.id);
    const createdBookings = await loadAdminBookings(createdBookingIds);
    const outlookSyncErrors = await syncConfirmedBookingsToOutlook(createdBookings);
    const syncedBookings = await loadAdminBookings(createdBookingIds);

    return NextResponse.json({ bookings: syncedBookings, outlookSyncErrors }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create booking.";
    console.error("Booking create failed", { route: "/api/bookings", error });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
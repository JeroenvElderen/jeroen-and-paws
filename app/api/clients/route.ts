import { NextResponse } from "next/server";
import { z } from "zod";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";

const clientWriteSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
  status: z.string().trim().optional(),
});

const fallbackClients = [
  {
    id: "fallback-client",
    name: "Client data unavailable",
    email: "Reconnect Supabase to load clients",
    phone: "No phone available",
    address: "No address available",
    dogs: "0 Dogs",
    dogNames: "No dogs linked",
    bookings: 0,
    spent: "—",
    joinedDate: null,
    lastBookingDate: null,
    service: "No bookings yet",
    status: "Inactive",
    notes: "Live client data could not be loaded from Supabase.",
    image: null,
  },
];

type AdminClientRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  status: string | null;
  portal_dogs: Array<{ id: string; name: string | null; profile_photo_url: string | null }> | null;
  portal_bookings: Array<{ id: string; service_name: string | null; starts_at: string | null; status: string | null }> | null;
  portal_client_activity: Array<{ id: string; body: string | null; title: string | null }> | null;
};

type SupabaseAuthUser = {
  email?: string;
  user?: { email?: string };
};

function formatStatus(value: string | null) {
  if (!value) return "Active";
  return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (letter) => letter.toUpperCase());
}

function formatDogCount(count: number) {
  if (count === 1) return "1 Dog";
  return `${count} Dogs`;
}

function mapClient(row: AdminClientRow) {
  const dogs = row.portal_dogs ?? [];
  const bookings = row.portal_bookings ?? [];
  const latestBooking = bookings[0];
  const activeBooking = bookings.find((booking) => !["cancelled", "canceled"].includes((booking.status ?? "").toLowerCase()));

  return {
    id: row.id,
    name: row.full_name?.trim() || "Unnamed client",
    email: row.email?.trim() || "No email saved",
    phone: row.phone?.trim() || "No phone saved",
    address: row.address?.trim() || "No address saved",
    dogs: formatDogCount(dogs.length),
    dogNames: dogs.map((dog) => dog.name?.trim()).filter(Boolean).join(", ") || "No dogs linked",
    bookings: bookings.length,
    spent: "—",
    joinedDate: row.created_at,
    lastBookingDate: latestBooking?.starts_at || row.updated_at || row.created_at || null,
    service: latestBooking?.service_name?.trim() || "No bookings yet",
    status: formatStatus(row.status || activeBooking?.status || (bookings.length ? "active" : "inactive")),
    notes: row.portal_client_activity?.[0]?.body?.trim() || row.portal_client_activity?.[0]?.title?.trim() || "No notes saved yet.",
    image: row.avatar_url || null,
  };
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

export async function GET(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);

  if (!adminAccessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: rows, error } = await supabaseAdmin
      .from("portal_clients")
      .select("id,full_name,email,phone,address,avatar_url,created_at,updated_at,status,portal_dogs(id,name,profile_photo_url),portal_bookings(id,service_name,starts_at,status),portal_client_activity(id,title,body)")
      .order("starts_at", { referencedTable: "portal_bookings", ascending: false })
      .order("created_at", { referencedTable: "portal_client_activity", ascending: false })
      .limit(1, { referencedTable: "portal_client_activity" })
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ clients: ((rows ?? []) as AdminClientRow[]).map(mapClient), isFallback: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load clients from Supabase.";
    console.error("Client data unavailable", { route: "/api/clients", error });

    return NextResponse.json({
      clients: fallbackClients,
      isFallback: true,
      error: "Unable to load clients from Supabase.",
      details: process.env.NODE_ENV === "production" ? undefined : message,
    });
  }
}

export async function PATCH(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);
  if (!adminAccessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = clientWriteSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success || !payload.data.id) return NextResponse.json({ error: payload.success ? "Client id is required." : payload.error.issues[0]?.message || "Invalid client payload." }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (typeof payload.data.name === "string") updates.full_name = payload.data.name;
  if (typeof payload.data.email === "string") updates.email = payload.data.email;
  if (typeof payload.data.phone === "string") updates.phone = payload.data.phone;
  if (typeof payload.data.address === "string") updates.address = payload.data.address;
  if (typeof payload.data.status === "string") updates.status = payload.data.status.toLowerCase();

  if (!Object.keys(updates).length) return NextResponse.json({ error: "No valid client updates supplied." }, { status: 400 });

  const { data, error } = await supabaseAdmin.from("portal_clients").update(updates).eq("id", payload.data.id).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  return NextResponse.json({ client: data });
}
export async function POST(request: Request) {
  const adminAccessToken = await getVerifiedBackendAdminToken(request);
  if (!adminAccessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = clientWriteSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success || !payload.data.name || !payload.data.email) {
    return NextResponse.json({ error: payload.success ? "Client name and email are required." : payload.error.issues[0]?.message || "Invalid client payload." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("portal_clients")
    .insert({ full_name: payload.data.name, email: payload.data.email, phone: payload.data.phone || null, address: payload.data.address || null, status: payload.data.status?.toLowerCase() || "active" })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ client: data }, { status: 201 });
}

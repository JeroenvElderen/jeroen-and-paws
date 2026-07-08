import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const dogPlaceholderImage = "/images/dogs/kaiser.jpg";

type PortalClientRelation = {
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

type AdminDogRow = {
  id: string;
  name: string | null;
  breed: string | null;
  age: string | null;
  status: string | null;
  profile_photo_url: string | null;
  notes: string | null;
  created_at: string | null;
  portal_clients: PortalClientRelation | PortalClientRelation[] | null;
  portal_bookings: Array<{
    service_name: string | null;
    starts_at: string | null;
    status: string | null;
  }> | null;
  portal_session_updates: Array<{ id: string }> | null;
};

function formatStatus(value: string | null) {
  if (!value) return "Active";
  return value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (letter) => letter.toUpperCase());
}

function getPortalClient(relation: AdminDogRow["portal_clients"]) {
  return Array.isArray(relation) ? relation[0] : relation;
}

function mapDog(row: AdminDogRow) {
  const owner = getPortalClient(row.portal_clients);
  const latestBooking = row.portal_bookings?.[0];

  return {
  id: row.id,
  name: row.name?.trim() || "Unnamed dog",
  gender: "unknown",
  owner: owner?.full_name?.trim() || "No owner linked",
  phone: owner?.phone?.trim() || "No phone saved",
  email: owner?.email?.trim() || "No email saved",
  breed: row.breed?.trim() || "Breed unknown",
  age: row.age?.trim() || "Age unknown",
  status: formatStatus(row.status),
  lastDate: latestBooking?.starts_at || row.created_at || null,
  lastService: latestBooking?.service_name?.trim() || "No bookings yet",
  notes: row.portal_session_updates?.length ?? (row.notes ? 1 : 0),
  notesText: row.notes?.trim() || "No notes saved yet.",
  image: row.profile_photo_url || dogPlaceholderImage,
};
}

type SupabaseAuthUser = {
  email?: string;
  user?: { email?: string };
};

const backendAdminEmail = "jeroen@jeroenandpaws.com";

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
      .from("portal_dogs")
      .select("id,name,breed,age,status,profile_photo_url,notes,created_at,portal_clients(full_name,email,phone),portal_bookings(service_name,starts_at,status),portal_session_updates(id)")
      .order("starts_at", { referencedTable: "portal_bookings", ascending: false })
      .limit(10, { referencedTable: "portal_session_updates" })
      .order("created_at", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ dogs: ((rows ?? []) as AdminDogRow[]).map(mapDog), isFallback: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load dogs from Supabase.";
    console.error("Dog data unavailable", { route: "/api/dogs", error });

    return NextResponse.json(
      {
        error: "Unable to load dogs from Supabase.",
        details: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 502 },
    );
  }
}
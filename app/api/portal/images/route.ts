import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const storageBucket = "portal-images";
const maximumImageSize = 15 * 1024 * 1024;

type SupabaseAuthUser = { id?: string; user?: { id?: string } };

async function getAuthenticatedPortalUser(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!accessToken || !supabaseUrl || !anonKey) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    cache: "no-store",
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;

  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  return payload?.id ?? payload?.user?.id ?? null;
}

async function ensureStorageBucket() {
  const { data } = await supabaseAdmin.storage.getBucket(storageBucket);
  if (data) return;

  const { error } = await supabaseAdmin.storage.createBucket(storageBucket, {
    public: true,
    fileSizeLimit: maximumImageSize,
    allowedMimeTypes: ["image/*"],
  });
  // Another request may have created the bucket after getBucket completed.
  if (error && !/already exists/i.test(error.message)) throw error;
}

export async function POST(request: Request) {
  const authUserId = await getAuthenticatedPortalUser(request);
  if (!authUserId) return NextResponse.json({ error: "Please sign in before uploading an image." }, { status: 401 });

  const { data: client, error: clientError } = await supabaseAdmin.from("portal_clients").select("id").eq("auth_user_id", authUserId).maybeSingle();
  if (clientError) return NextResponse.json({ error: "Your portal profile could not be checked." }, { status: 502 });
  if (!client) return NextResponse.json({ error: "Your portal profile could not be found." }, { status: 404 });

  const form = await request.formData();
  const file = form.get("image");
  const folder = form.get("folder");
  if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "Please choose an image to upload." }, { status: 400 });
  if (folder !== "avatars" && folder !== "dogs") return NextResponse.json({ error: "Invalid image folder." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Please choose an image file." }, { status: 400 });
  if (file.size > maximumImageSize) return NextResponse.json({ error: "Please choose an image smaller than 15 MB." }, { status: 413 });

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${folder}/${client.id}/${crypto.randomUUID()}.${extension}`;

  try {
    await ensureStorageBucket();
    const { error } = await supabaseAdmin.storage.from(storageBucket).upload(path, Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;

    const publicUrl = supabaseAdmin.storage.from(storageBucket).getPublicUrl(path).data.publicUrl;
    return NextResponse.json({ publicUrl }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to upload image.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";
const storageBucket = "portal-images";

type SupabaseAuthUser = { email?: string; user?: { email?: string } };

const uploadRequestSchema = z.object({
  galleryId: z.string().uuid(),
  fileName: z.string().trim().min(1),
  contentType: z.string().trim().startsWith("image/"),
});

async function getVerifiedBackendAdminToken(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!accessToken || !supabaseUrl || !anonKey) return null;
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, { cache: "no-store", headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) return null;
  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  const email = payload?.email ?? payload?.user?.email;
  return email?.toLowerCase() === backendAdminEmail ? accessToken : null;
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

export async function POST(request: Request) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = uploadRequestSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid upload request." }, { status: 400 });

  const { data: gallery, error: galleryError } = await supabaseAdmin.from("portal_galleries").select("id").eq("id", payload.data.galleryId).single();
  if (galleryError || !gallery) return NextResponse.json({ error: galleryError?.message || "Gallery not found." }, { status: 404 });

  const path = `galleries/${payload.data.galleryId}/${Date.now()}-${crypto.randomUUID()}-${sanitizeFileName(payload.data.fileName)}`;
  const { data, error } = await supabaseAdmin.storage.from(storageBucket).createSignedUploadUrl(path);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  const publicUrl = supabaseAdmin.storage.from(storageBucket).getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ bucket: storageBucket, path, token: data.token, signedUrl: data.signedUrl, publicUrl, contentType: payload.data.contentType });
}
import { NextResponse } from "next/server";
import { z } from "zod";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const backendAdminEmail = "jeroen@jeroenandpaws.com";
const storageBucket = "portal-images";

type SupabaseAuthUser = { email?: string; user?: { email?: string } };

type GalleryRow = {
  id: string;
  client_id: string;
  dog_id: string;
  title: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
  portal_clients: { full_name: string | null; email: string | null; phone: string | null; avatar_url: string | null } | Array<{ full_name: string | null; email: string | null; phone: string | null; avatar_url: string | null }> | null;
  portal_dogs: { name: string | null; breed: string | null; age: string | null; profile_photo_url: string | null } | Array<{ name: string | null; breed: string | null; age: string | null; profile_photo_url: string | null }> | null;
  portal_gallery_items: Array<{ id: string; image_url: string; alt_text: string | null; created_at: string }> | null;
};

type ActivityRow = { id: string; gallery_id: string | null; action: string; body: string | null; created_at: string };

const gallerySchema = z.object({
  id: z.string().uuid().optional(),
  clientId: z.string().uuid(),
  dogId: z.string().uuid(),
  title: z.string().trim().min(1).optional(),
  imageUrls: z.array(z.string().trim().url()).optional(),
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

function mapGallery(row: GalleryRow) {
  const images = row.portal_gallery_items ?? [];
  const client = Array.isArray(row.portal_clients) ? row.portal_clients[0] : row.portal_clients;
  const dog = Array.isArray(row.portal_dogs) ? row.portal_dogs[0] : row.portal_dogs;
  return {
    id: row.id,
    clientId: row.client_id,
    dogId: row.dog_id,
    title: row.title || `${dog?.name || "Dog"} gallery`,
    status: row.status.replace(/^./, (letter) => letter.toUpperCase()),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    client: { name: client?.full_name || "Unnamed client", email: client?.email || "No email saved", phone: client?.phone || "No phone saved", avatarUrl: client?.avatar_url || null },
    dog: { name: dog?.name || "Unnamed dog", breed: dog?.breed || "Breed unknown", age: dog?.age || "Age unknown", photoUrl: dog?.profile_photo_url || null },
    photos: images.map((image) => ({ id: image.id, imageUrl: image.image_url, altText: image.alt_text, createdAt: image.created_at })),
  };
}

async function insertActivity(galleryId: string, action: string, body: string) {
  await supabaseAdmin.from("portal_gallery_activity").insert({ gallery_id: galleryId, action, body });
}

export async function GET(request: Request) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");
  const dogId = searchParams.get("dogId");
  const status = searchParams.get("status");

  let query = supabaseAdmin
    .from("portal_galleries")
    .select("id,client_id,dog_id,title,status,created_at,updated_at,published_at,portal_clients(full_name,email,phone,avatar_url),portal_dogs(name,breed,age,profile_photo_url),portal_gallery_items(id,image_url,alt_text,created_at)")
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "portal_gallery_items", ascending: true });
  if (clientId && clientId !== "all") query = query.eq("client_id", clientId);
  if (dogId && dogId !== "all") query = query.eq("dog_id", dogId);
  if (status && status !== "all") query = query.eq("status", status.toLowerCase());

  const [{ data: rows, error }, { data: clients }, { data: dogs }, { data: activities }] = await Promise.all([
    query,
    supabaseAdmin.from("portal_clients").select("id,full_name,email").order("full_name"),
    supabaseAdmin.from("portal_dogs").select("id,name,client_id").order("name"),
    supabaseAdmin.from("portal_gallery_activity").select("id,gallery_id,action,body,created_at").order("created_at", { ascending: false }).limit(12),
  ]);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ galleries: ((rows ?? []) as unknown as GalleryRow[]).map(mapGallery), clients: clients ?? [], dogs: dogs ?? [], activities: (activities ?? []) as ActivityRow[] });
}

function getImageContentType(file: File) {
  if (file.type?.startsWith("image/")) return file.type;

  const extension = file.name.split(".").pop()?.toLowerCase();
  const extensionTypes: Record<string, string> = {
    avif: "image/avif",
    bmp: "image/bmp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    tif: "image/tiff",
    tiff: "image/tiff",
    webp: "image/webp",
  };

  return extension ? extensionTypes[extension] : undefined;
}

async function uploadOriginal(file: File, galleryId: string) {
  const contentType = getImageContentType(file);
  if (!contentType) throw new Error(`Unsupported image type for ${file.name}. Please upload a standard image file.`);

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const path = `galleries/${galleryId}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { error } = await supabaseAdmin.storage.from(storageBucket).upload(path, Buffer.from(await file.arrayBuffer()), { contentType, upsert: false });
  if (error) throw error;
  const { data } = supabaseAdmin.storage.from(storageBucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function POST(request: Request) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const payload = gallerySchema.safeParse({ clientId: form.get("clientId"), dogId: form.get("dogId"), title: form.get("title") || undefined, imageUrls: form.getAll("imageUrls").filter((v): v is string => typeof v === "string" && Boolean(v.trim())) });
  if (!payload.success) return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid gallery payload." }, { status: 400 });

  const { data: gallery, error } = await supabaseAdmin.from("portal_galleries").insert({ client_id: payload.data.clientId, dog_id: payload.data.dogId, title: payload.data.title || "New gallery", status: "draft" }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  const galleryId = gallery.id as string;
  let uploadedUrls: string[];
  try {
    uploadedUrls = await Promise.all(form.getAll("photos").filter((value): value is File => value instanceof File && value.size > 0).map((file) => uploadOriginal(file, galleryId)));
  } catch (uploadError) {
    await supabaseAdmin.from("portal_galleries").delete().eq("id", galleryId);
    const message = uploadError instanceof Error ? uploadError.message : "Unable to upload original gallery photos.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
  const imageUrls = [...(payload.data.imageUrls ?? []), ...uploadedUrls];
  if (imageUrls.length) await supabaseAdmin.from("portal_gallery_items").insert(imageUrls.map((image_url) => ({ gallery_id: galleryId, client_id: payload.data.clientId, dog_id: payload.data.dogId, image_url, alt_text: payload.data.title || "Session gallery photo" })));
  await insertActivity(galleryId, "created", `Gallery created as draft with ${imageUrls.length} photos`);
  return NextResponse.json({ id: galleryId }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const id = String(form.get("id") || "");
  const action = String(form.get("action") || "save");
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: "Gallery id is required." }, { status: 400 });

  if (action === "publish") {
    const { error } = await supabaseAdmin.from("portal_galleries").update({ status: "published", published_at: new Date().toISOString() }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 502 });
    await supabaseAdmin.from("portal_gallery_items").update({ delivered_at: new Date().toISOString() }).eq("gallery_id", id);
    await insertActivity(id, "published", "Gallery published to the client portal");
    return NextResponse.json({ ok: true });
  }

  const title = String(form.get("title") || "").trim();
  const imageUrls = form.getAll("imageUrls").filter((value): value is string => typeof value === "string" && Boolean(value.trim()));
  if (title) await supabaseAdmin.from("portal_galleries").update({ title }).eq("id", id);
  const gallery = await supabaseAdmin.from("portal_galleries").select("client_id,dog_id,title").eq("id", id).single();
  if (gallery.error) return NextResponse.json({ error: gallery.error.message }, { status: 502 });
  let uploadedUrls: string[];
  try {
    uploadedUrls = await Promise.all(form.getAll("photos").filter((value): value is File => value instanceof File && value.size > 0).map((file) => uploadOriginal(file, id)));
  } catch (uploadError) {
    const message = uploadError instanceof Error ? uploadError.message : "Unable to upload original gallery photos.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
  const allImageUrls = [...imageUrls, ...uploadedUrls];
  if (allImageUrls.length) await supabaseAdmin.from("portal_gallery_items").insert(allImageUrls.map((image_url) => ({ gallery_id: id, client_id: gallery.data.client_id, dog_id: gallery.data.dog_id, image_url, alt_text: title || gallery.data.title || "Session gallery photo" })));
  await insertActivity(id, "updated", allImageUrls.length ? `${allImageUrls.length} original photos added` : "Gallery details updated");
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!(await getVerifiedBackendAdminToken(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Gallery id is required." }, { status: 400 });
  const { error } = await supabaseAdmin.from("portal_galleries").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });
  return NextResponse.json({ ok: true });
}
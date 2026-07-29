import { NextResponse } from "next/server";
import { z } from "zod";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";
const backendAdminEmail = "jeroen@jeroenandpaws.com";
const inviteSchema = z.object({});
type SupabaseAuthUser = { email?: string; user?: { email?: string } };

async function isBackendAdmin(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!accessToken || !supabaseUrl || !anonKey) return false;
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, { cache: "no-store", headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) return false;
  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  return (payload?.email ?? payload?.user?.email)?.toLowerCase() === backendAdminEmail;
}

export async function POST(request: Request) {
  if (!(await isBackendAdmin(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = inviteSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return NextResponse.json({ error: payload.error.issues[0]?.message || "Invalid invite request." }, { status: 400 });

  const { data: invite, error: inviteError } = await supabaseAdmin.from("portal_invites").insert({}).select("code,expires_at").single();
  if (inviteError) return NextResponse.json({ error: inviteError.message }, { status: 502 });

  const origin = new URL(request.url).origin;
  return NextResponse.json({ inviteUrl: `${origin}/portal?invite=${encodeURIComponent(invite.code)}`, expiresAt: invite.expires_at }, { status: 201 });
}
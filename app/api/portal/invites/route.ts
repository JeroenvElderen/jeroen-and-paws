import { NextResponse } from "next/server";
import { z } from "zod";

import { supabaseAdmin } from "@/utils/supabase-admin";
import { createPortalRegistrationCode } from "@/utils/portal-registration-code";

export const runtime = "nodejs";
const backendAdminEmail = "jeroen@jeroenandpaws.com";
const inviteSchema = z.object({
  dogNames: z.string().trim().min(1, "Enter at least one dog name.").max(100).refine((value) => {
    try {
      createPortalRegistrationCode(value);
      return true;
    } catch {
      return false;
    }
  }, "Enter at least one dog name using letters or numbers."),
});
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

  const code = createPortalRegistrationCode(payload.data.dogNames);
  const { data: invite, error: inviteError } = await supabaseAdmin.from("portal_invites").insert({ code }).select("code,expires_at").single();
  if (inviteError?.code === "23505") return NextResponse.json({ error: "A registration code for these dog names already exists." }, { status: 409 });
  if (inviteError) return NextResponse.json({ error: inviteError.message }, { status: 502 });

  return NextResponse.json({ code: invite.code, expiresAt: invite.expires_at }, { status: 201 });
}

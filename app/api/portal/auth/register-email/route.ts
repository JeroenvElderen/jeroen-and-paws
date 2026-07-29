import { NextResponse } from "next/server";
import { z } from "zod";

import { renderConfirmationEmail } from "@/utils/confirmation-email-template";
import { generateEmailSignupLink, hashSensitiveValue } from "@/utils/portal-phone-auth";
import { sendResendEmail } from "@/utils/resend-email";
import { supabaseAdmin } from "@/utils/supabase-admin";

const schema = z.object({ inviteCode: z.string().trim().min(8), fullName: z.string().trim().min(1).max(120), email: z.string().trim().email(), password: z.string().min(8).max(128), redirectTo: z.string().url() });

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const ipHash = hashSensitiveValue(ip);
    const since = new Date(Date.now() - 10 * 60_000).toISOString();
    const { count, error: rateError } = await supabaseAdmin.from("portal_registration_attempts").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
    if (rateError) throw rateError;
    if ((count ?? 0) >= 10) return NextResponse.json({ error: "Too many attempts. Wait 10 minutes and try again." }, { status: 429 });
    const { data: invite } = await supabaseAdmin.from("portal_invites").select("id,expires_at,used_at").eq("code", input.inviteCode).maybeSingle();
    if (!invite || invite.used_at || new Date(invite.expires_at) <= new Date()) return NextResponse.json({ error: "This invite is invalid, expired, or already used." }, { status: 400 });
    const { error: attemptError } = await supabaseAdmin.from("portal_registration_attempts").insert({ invite_id: invite.id, ip_hash: ipHash });
    if (attemptError) throw attemptError;
    const inviteClaimedAt = new Date().toISOString();
    const { data: claimedInvite } = await supabaseAdmin.from("portal_invites").update({ used_at: inviteClaimedAt }).eq("id", invite.id).is("used_at", null).select("id").maybeSingle();
    if (!claimedInvite) return NextResponse.json({ error: "This invite has already been used." }, { status: 409 });
    let userId: string | null = null;
    try {
      const { user, actionLink } = await generateEmailSignupLink({ email: input.email, password: input.password, fullName: input.fullName, redirectTo: input.redirectTo });
      userId = user.id;
      await sendResendEmail({ to: input.email, subject: "Confirm your Jeroen & Paws account", html: await renderConfirmationEmail(actionLink) });
      const { error } = await supabaseAdmin.from("portal_invites").update({ used_by_auth_user_id: user.id }).eq("id", invite.id).eq("used_at", inviteClaimedAt);
      if (error) throw error;
    } catch (signupError) {
      if (userId) await supabaseAdmin.auth.admin.deleteUser(userId);
      await supabaseAdmin.from("portal_invites").update({ used_at: null }).eq("id", invite.id).eq("used_at", inviteClaimedAt).is("used_by_auth_user_id", null);
      throw signupError;
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Portal email registration failed", { error });
    return NextResponse.json({ error: error instanceof z.ZodError ? error.issues[0]?.message : "Unable to create the account right now." }, { status: 400 });
  }
}
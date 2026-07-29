import { NextResponse } from "next/server";
import { z } from "zod";

import { sendBirdOtp } from "@/utils/bird-verify";
import { hashSensitiveValue, normalizeE164 } from "@/utils/portal-phone-auth";
import { supabaseAdmin } from "@/utils/supabase-admin";

const schema = z.object({
  phone: z.string(),
  email: z.string().trim().email().optional().or(z.literal("")),
  fullName: z.string().trim().min(1).max(120),
  inviteCode: z.string().trim().min(8),
});
const genericError = "Unable to start registration. Check your invite and details, then try again.";

function requestIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const phone = normalizeE164(input.phone);
    const phoneHash = hashSensitiveValue(phone);
    const ipHash = hashSensitiveValue(requestIp(request));
    const since = new Date(Date.now() - 10 * 60_000).toISOString();
    await supabaseAdmin.from("portal_auth_challenges").delete().lt("created_at", new Date(Date.now() - 24 * 60 * 60_000).toISOString());

    const [phoneLimit, ipLimit] = await Promise.all([
      supabaseAdmin.from("portal_auth_challenges").select("id", { count: "exact", head: true }).eq("phone_hash", phoneHash).gte("created_at", since),
      supabaseAdmin.from("portal_auth_challenges").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since),
    ]);
    if (phoneLimit.error || ipLimit.error) throw phoneLimit.error || ipLimit.error;
    if ((phoneLimit.count ?? 0) >= 3 || (ipLimit.count ?? 0) >= 10) return NextResponse.json({ error: "Too many attempts. Wait 10 minutes and try again." }, { status: 429 });

    const { data: invite } = await supabaseAdmin.from("portal_invites").select("id,expires_at,used_at").eq("code", input.inviteCode).maybeSingle();
    if (!invite || invite.used_at || new Date(invite.expires_at) <= new Date()) return NextResponse.json({ error: genericError }, { status: 400 });

    const { data: challenge, error } = await supabaseAdmin.from("portal_auth_challenges").insert({
      invite_id: invite.id,
      phone,
      email: input.email || null,
      phone_hash: phoneHash,
      ip_hash: ipHash,
      full_name: input.fullName,
    }).select("id,expires_at").single();
    if (error) throw error;
    const birdVerificationId = await sendBirdOtp(phone);
    const { error: updateError } = await supabaseAdmin.from("portal_auth_challenges").update({ bird_verification_id: birdVerificationId }).eq("id", challenge.id);
    if (updateError) throw updateError;
    return NextResponse.json({ challengeId: challenge.id, expiresAt: challenge.expires_at });
  } catch (error) {
    console.error("Portal phone registration start failed", { error });
    return NextResponse.json({ error: error instanceof z.ZodError ? error.issues[0]?.message : genericError }, { status: 400 });
  }
}
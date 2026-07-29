import { NextResponse } from "next/server";
import { z } from "zod";

import { renderConfirmationEmail } from "@/utils/confirmation-email-template";
import { verifyOtp } from "@/utils/portal-otp";
import { createVerifiedPhoneUser, generateEmailConfirmationLink, signInPhoneUser } from "@/utils/portal-phone-auth";
import { sendResendEmail } from "@/utils/resend-email";
import { supabaseAdmin } from "@/utils/supabase-admin";

const schema = z.object({ challengeId: z.string().uuid(), code: z.string().regex(/^\d{6}$/), password: z.string().min(8).max(128), redirectTo: z.string().url() });

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const { data: challenge, error } = await supabaseAdmin.from("portal_auth_challenges").select("*").eq("id", input.challengeId).maybeSingle();
    if (error) throw error;
    if (!challenge || !challenge.otp_code_hash || !challenge.otp_expires_at || challenge.consumed_at || new Date(challenge.otp_expires_at) <= new Date() || challenge.attempts >= 5) return NextResponse.json({ error: "This verification has expired. Request a new code." }, { status: 400 });
    const { error: attemptError } = await supabaseAdmin.from("portal_auth_challenges").update({ attempts: challenge.attempts + 1 }).eq("id", challenge.id);
    if (attemptError) throw attemptError;
    if (!verifyOtp(input.code, challenge.otp_code_hash, challenge.otp_expires_at)) return NextResponse.json({ error: "The verification code is incorrect." }, { status: 400 });

    const { data: claimed } = await supabaseAdmin.from("portal_auth_challenges").update({ consumed_at: new Date().toISOString() }).eq("id", challenge.id).is("consumed_at", null).select("id").maybeSingle();
    if (!claimed) return NextResponse.json({ error: "This verification code has already been used." }, { status: 409 });

    const inviteClaimedAt = new Date().toISOString();
    const { data: claimedInvite } = await supabaseAdmin.from("portal_invites").update({ used_at: inviteClaimedAt }).eq("id", challenge.invite_id).is("used_at", null).select("id").maybeSingle();
    if (!claimedInvite) return NextResponse.json({ error: "This invite has already been used." }, { status: 409 });

    let user;
    try {
      user = await createVerifiedPhoneUser({ phone: challenge.phone, email: challenge.email || undefined, password: input.password, fullName: challenge.full_name });
    } catch (accountError) {
      await supabaseAdmin.from("portal_invites").update({ used_at: null }).eq("id", challenge.invite_id).eq("used_at", inviteClaimedAt).is("used_by_auth_user_id", null);
      throw accountError;
    }
    const session = await signInPhoneUser(challenge.phone, input.password);
    let emailConfirmationSent = false;
    if (challenge.email) {
      try {
        const confirmationUrl = await generateEmailConfirmationLink(challenge.email, input.redirectTo);
        await sendResendEmail({ to: challenge.email, subject: "Confirm your Jeroen & Paws email", html: await renderConfirmationEmail(confirmationUrl) });
        emailConfirmationSent = true;
      } catch (emailError) {
        console.error("Optional portal email confirmation failed", { error: emailError, userId: user.id });
      }
    }
    const { error: inviteError } = await supabaseAdmin.from("portal_invites").update({ used_by_auth_user_id: user.id }).eq("id", challenge.invite_id).eq("used_at", inviteClaimedAt);
    if (inviteError) throw inviteError;
    await supabaseAdmin.from("portal_auth_challenges").delete().eq("id", challenge.id);
    return NextResponse.json({ accessToken: session.access_token, refreshToken: session.refresh_token, expiresIn: session.expires_in, user: { phone: challenge.phone, emailConfirmationSent } });
  } catch (error) {
    console.error("Portal phone registration verification failed", { error });
    return NextResponse.json({ error: error instanceof z.ZodError ? error.issues[0]?.message : "Unable to complete registration right now." }, { status: 400 });
  }
}
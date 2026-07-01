import { NextResponse } from "next/server";
import { z } from "zod";

import { renderConfirmationEmail } from "@/utils/confirmation-email-template";
import { sendResendEmail } from "@/utils/resend-email";
import { generateSupabaseSignupLink } from "@/utils/supabase-auth-admin";

const signupSchema = z.object({
  fullName: z.string().trim().min(1, "Please enter your full name.").max(120, "Please keep your name under 120 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(254, "Please keep your email address under 254 characters."),
  password: z.string().min(6, "Please use at least 6 characters.").max(128, "Please keep your password under 128 characters."),
  redirectTo: z.string().url("Please provide a valid redirect URL."),
});

export async function POST(request: Request) {
  try {
    const data = signupSchema.parse(await request.json());
    const confirmationUrl = await generateSupabaseSignupLink(data);
    const html = await renderConfirmationEmail(confirmationUrl);

    await sendResendEmail({
      to: data.email,
      subject: "Confirm your Jeroen & Paws account",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message : error instanceof Error ? error.message : "Unable to create your account right now.";

    console.error("Portal signup failed", { error });

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

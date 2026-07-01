import { NextResponse } from "next/server";
import { z } from "zod";

import { renderConfirmationEmail } from "@/utils/confirmation-email-template";
import { sendResendEmail } from "@/utils/resend-email";
import { generateSupabaseMagicLink } from "@/utils/supabase-auth-admin";

const resendSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(254, "Please keep your email address under 254 characters."),
  redirectTo: z.string().url("Please provide a valid redirect URL."),
});

export async function POST(request: Request) {
  try {
    const data = resendSchema.parse(await request.json());
    const confirmationUrl = await generateSupabaseMagicLink(data);
    const html = await renderConfirmationEmail(confirmationUrl);

    await sendResendEmail({
      to: data.email,
      subject: "Confirm your Jeroen & Paws account",
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message : error instanceof Error ? error.message : "Unable to resend the confirmation email right now.";

    console.error("Portal confirmation resend failed", { error });

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

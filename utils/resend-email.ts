type ResendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

type ResendErrorResponse = {
  message?: string;
  error?: string;
};

export async function sendResendEmail({ to, subject, html }: ResendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "Jeroen & Paws <onboarding@resend.dev>";

  if (!apiKey) {
    throw new Error("Resend is not configured. Add RESEND_API_KEY to send confirmation emails.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as ResendErrorResponse;
    throw new Error(payload.message || payload.error || "Resend could not send the confirmation email.");
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";

import { sendMicrosoftGraphEmail } from "@/utils/microsoft-graph-email";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  petName: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  service: z.string().trim().optional(),
  petInfo: z.string().trim().optional(),
  message: z.string().trim().min(1, "Please add a short message."),
  selectedServiceName: z.string().trim().optional(),
  selectedServicePrice: z.string().trim().optional(),
  selectedServiceUnit: z.string().trim().optional(),
  selectedServiceDescription: z.string().trim().optional(),
  selectedServiceFeatures: z.string().trim().optional(),
  company: z.string().trim().optional(),
});

const getGraphConfig = () => {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const senderEmail =
    process.env.BOOKING_NOTIFICATION_EMAIL ||
    process.env.JEROEN_AND_PAWS_EMAIL ||
    process.env.NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL;

  if (!tenantId || !clientId || !clientSecret || !senderEmail) return null;

  return { tenantId, clientId, clientSecret, senderEmail };
};

const getNotificationEmail = () =>
  process.env.CONTACT_NOTIFICATION_EMAIL ||
  process.env.ADMIN_EMAIL ||
  process.env.JEROEN_AND_PAWS_EMAIL ||
  "jeroen@jeroenandpaws.com";

const getServiceLine = (value?: string) => value || "Not specified";

const buildEmailBody = (data: z.infer<typeof contactSchema>) =>
  [
    "New website booking request",
    "",
    `Name: ${data.name}`,
    `Pet name: ${getServiceLine(data.petName)}`,
    `Email: ${data.email}`,
    `Phone: ${getServiceLine(data.phone)}`,
    `Service selected: ${getServiceLine(data.service)}`,
    "",
    "Selected card details",
    `Service: ${getServiceLine(data.selectedServiceName)}`,
    `Price: ${getServiceLine(
      data.selectedServicePrice
        ? `${data.selectedServicePrice}${data.selectedServiceUnit ? ` ${data.selectedServiceUnit}` : ""}`
        : undefined,
    )}`,
    `Description: ${getServiceLine(data.selectedServiceDescription)}`,
    `Features: ${getServiceLine(data.selectedServiceFeatures)}`,
    "",
    "Pet information",
    data.petInfo || "Not provided",
    "",
    "Message",
    data.message,
  ].join("\n");

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message || "Please check the form." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ message: "Thanks, your message has been sent." });
  }

  const graphConfig = getGraphConfig();

  if (!graphConfig) {
    return NextResponse.json(
      {
        message:
          "Email sending is not configured yet. Please add the Azure app and notification email environment variables.",
      },
      { status: 503 },
    );
  }

  const subjectService = data.selectedServiceName || data.service || "website request";

  try {
    await sendMicrosoftGraphEmail(graphConfig, {
      to: getNotificationEmail(),
      replyTo: data.email,
      replyToName: data.name,
      subject: `New booking request: ${subjectService}`,
      text: buildEmailBody(data),
    });

    return NextResponse.json({ message: "Thanks, your message has been sent." });
  } catch (error) {
    console.error("Contact form email failed", error);

    return NextResponse.json(
      { message: "Sorry, we could not send your message right now." },
      { status: 500 },
    );
  }
}

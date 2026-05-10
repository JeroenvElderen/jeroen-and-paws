import { NextResponse } from "next/server";
import { z } from "zod";

import { businessInfo } from "@/components/site/data";
import { sendMicrosoftGraphEmail } from "@/utils/microsoft-graph-email";

export const runtime = "nodejs";

const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

const requestCounts = new Map<string, { count: number; resetAt: number }>();

const boundedText = (max: number, message: string) =>
  z.string().trim().max(max, message);

const contactSchema = z.object({
  name: boundedText(120, "Please keep your name under 120 characters.").min(
    1,
    "Please enter your name.",
  ),
  petName: boundedText(
    120,
    "Please keep your pet's name under 120 characters.",
  ).optional(),
  email: z
    .string()
    .trim()
    .max(254, "Please keep your email address under 254 characters.")
    .email("Please enter a valid email address."),
  phone: boundedText(
    60,
    "Please keep your phone number under 60 characters.",
  ).optional(),
  service: boundedText(
    80,
    "Please select a shorter service option.",
  ).optional(),
  petInfo: boundedText(
    2000,
    "Please keep pet information under 2,000 characters.",
  ).optional(),
  message: boundedText(
    3000,
    "Please keep your message under 3,000 characters.",
  ).min(1, "Please add a short message."),
  selectedServiceName: boundedText(
    120,
    "Please keep the selected service name shorter.",
  ).optional(),
  selectedServicePrice: boundedText(
    60,
    "Please keep the selected service price shorter.",
  ).optional(),
  selectedServiceUnit: boundedText(
    60,
    "Please keep the selected service unit shorter.",
  ).optional(),
  selectedServiceDescription: boundedText(
    500,
    "Please keep the selected service description shorter.",
  ).optional(),
  selectedServiceFeatures: boundedText(
    1000,
    "Please keep the selected service features shorter.",
  ).optional(),
  company: z.string().trim().max(120).optional(),
});

const getGraphConfig = () => {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const senderEmail =
    process.env.BOOKING_NOTIFICATION_EMAIL ||
    process.env.JEROEN_AND_PAWS_EMAIL ||
    process.env.OUTLOOK_CALENDAR_EMAIL ||
    process.env.NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL;

  if (!tenantId || !clientId || !clientSecret || !senderEmail) return null;

  return { tenantId, clientId, clientSecret, senderEmail };
};

const getNotificationEmail = () =>
  process.env.CONTACT_NOTIFICATION_EMAIL ||
  process.env.ADMIN_EMAIL ||
  process.env.JEROEN_AND_PAWS_EMAIL ||
  businessInfo.email;

const getServiceLine = (value?: string) => value || "Not specified";

const normalizeLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

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

const buildConfirmationBody = (name: string) =>
  [
    `Hi ${name},`,
    "",
    "Thanks for contacting Jeroen & Paws. Your enquiry has been received, and Jeroen aims to reply within 24 hours.",
    "",
    "If anything is urgent or you need to add care notes, you can reply to this email or call/text +353 87 247 3099.",
    "",
    "Jeroen & Paws",
  ].join("\n");

const getClientKey = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (request: Request) => {
  const key = getClientKey(request);
  const now = Date.now();
  const record = requestCounts.get(key);

  if (!record || record.resetAt <= now) {
    requestCounts.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) return true;

  record.count += 1;
  return false;
};

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      {
        message:
          "Too many messages were sent in a short time. Please wait a little, or call/text Jeroen directly.",
      },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Please submit the form again with valid details." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message || "Please check the form." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({
      message: "Thanks, your message has been sent.",
    });
  }

  const graphConfig = getGraphConfig();

  if (!graphConfig) {
    console.error("Contact form email is not configured", {
      route: "/api/contact",
      reason: "missing_graph_config",
    });

    return NextResponse.json(
      {
        message:
          "Sorry, online messages are not available right now. Please call, WhatsApp, or email Jeroen directly.",
      },
      { status: 503 },
    );
  }

  const subjectService = normalizeLine(
    data.selectedServiceName || data.service || "website request",
  );

  try {
    await sendMicrosoftGraphEmail(graphConfig, {
      to: getNotificationEmail(),
      replyTo: data.email,
      replyToName: data.name,
      subject: `New booking request: ${subjectService}`,
      text: buildEmailBody(data),
    });

    try {
      await sendMicrosoftGraphEmail(graphConfig, {
        to: data.email,
        replyTo: getNotificationEmail(),
        replyToName: businessInfo.name,
        subject: "Jeroen & Paws received your enquiry",
        text: buildConfirmationBody(data.name),
      });
    } catch (error) {
      console.error("Contact form confirmation email failed", {
        route: "/api/contact",
        service: subjectService,
        error,
      });
    }

    return NextResponse.json({
      message: "Thanks, your message has been sent.",
    });
  } catch (error) {
    console.error("Contact form email failed", {
      route: "/api/contact",
      service: subjectService,
      error,
    });

    return NextResponse.json(
      {
        message:
          "Sorry, we could not send your message right now. Please call, WhatsApp, or email Jeroen directly.",
      },
      { status: 500 },
    );
  }
}

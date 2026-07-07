import { NextResponse } from "next/server";

import { getGraphCalendarConfig, listOutlookEvents } from "@/utils/microsoft-graph-calendar";
import { supabaseRestFetch } from "@/utils/supabase-rest";

export const runtime = "nodejs";

const OUTLOOK_BOOKING_PREFIX = "[JP]";

function defaultWindow() {
  const start = new Date();
  start.setDate(start.getDate() - 14);
  const end = new Date();
  end.setDate(end.getDate() + 180);
  return { start: start.toISOString(), end: end.toISOString() };
}

function parseSubject(subject = "") {
  const clean = subject.replace(OUTLOOK_BOOKING_PREFIX, "").trim();
  const [serviceName, dogName, clientName] = clean.split(" - ").map((part) => part.trim());

  return {
    serviceName: serviceName || "Outlook booking",
    dogName: dogName || "Dog to confirm",
    clientName: clientName || "Client to confirm",
    needsReview: !serviceName || !dogName || !clientName,
  };
}

async function importOutlookEvent(event: Awaited<ReturnType<typeof listOutlookEvents>>[number]) {
  const parsed = parseSubject(event.subject);
  const startsAt = event.start?.dateTime;
  const endsAt = event.end?.dateTime;

  if (!event.id || !startsAt || !endsAt) return { eventId: event.id, skipped: "missing time" };

  const rows = await supabaseRestFetch(
    `/rest/v1/portal_outlook_imports?outlook_event_id=eq.${encodeURIComponent(event.id)}&limit=1`,
    { cache: "no-store" },
  ) as { id: string }[];

  const payload = {
    outlook_event_id: event.id,
    outlook_ical_uid: event.iCalUId ?? null,
    outlook_change_key: event.changeKey ?? null,
    outlook_web_link: event.webLink ?? null,
    subject: event.subject ?? "Outlook booking",
    service_name: parsed.serviceName,
    dog_name: parsed.dogName,
    client_name: parsed.clientName,
    starts_at: startsAt,
    ends_at: endsAt,
    timezone: event.start?.timeZone ?? "Europe/Dublin",
    location: event.location?.displayName ?? null,
    notes: event.bodyPreview ?? null,
    sensitivity: event.sensitivity ?? null,
    status: event.isCancelled ? "cancelled" : "needs_review",
    needs_review: parsed.needsReview || event.sensitivity === "private",
    updated_at: new Date().toISOString(),
  };

  if (rows[0]?.id) {
    await supabaseRestFetch(`/rest/v1/portal_outlook_imports?id=eq.${encodeURIComponent(rows[0].id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return { eventId: event.id, action: "updated" };
  }

  await supabaseRestFetch("/rest/v1/portal_outlook_imports", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return { eventId: event.id, action: "created" };
}

export async function POST(request: Request) {
  const config = getGraphCalendarConfig();

  if (!config) {
    return NextResponse.json({ message: "Microsoft Graph calendar is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({})) as { start?: string; end?: string };
  const window = { ...defaultWindow(), ...body };
  const events = await listOutlookEvents(config, window.start, window.end);
  console.log("Outlook sync scanned subjects", {
    calendarEmail: config.calendarEmail,
    window,
    subjects: events.map((event) => ({
      id: event.id,
      subject: event.subject,
      startsAt: event.start?.dateTime,
      matchesBookingPrefix: event.subject?.trim().startsWith(OUTLOOK_BOOKING_PREFIX) ?? false,
    })),
  });
  const bookingEvents = events.filter((event) => event.subject?.trim().startsWith(OUTLOOK_BOOKING_PREFIX));
  const imported = [];

  for (const event of bookingEvents) {
    imported.push(await importOutlookEvent(event));
  }

  return NextResponse.json({ imported, scanned: events.length, matched: bookingEvents.length });
}

export async function GET() {
  return POST(new Request("https://local.outlook-sync", { method: "POST", body: JSON.stringify(defaultWindow()) }));
}
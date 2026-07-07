import { NextResponse } from "next/server";

import { getGraphCalendarConfig, listOutlookEvents } from "@/utils/microsoft-graph-calendar";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const OUTLOOK_BOOKING_PREFIX = "[JP]";

type ClientDogMatch = {
  clientId: string;
  clientName: string;
  clientEmail: string | null;
  dogId: string;
  dogName: string;
  source: "portal_dogs" | "admin_booking_calendar";
};

type PortalDogMatchRow = {
  id: string;
  name: string | null;
  client_id: string | null;
  portal_clients: {
    id: string;
    full_name: string | null;
    email: string | null;
  } | null;
};

type AdminCalendarMatchRow = {
  client_id: string | null;
  client_name: string | null;
  client_email: string | null;
  dog_id: string | null;
  dog_name: string | null;
};

function normalizeMatchText(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function isPlaceholderName(value: string) {
  const normalized = normalizeMatchText(value);
  return !normalized || normalized === "dog to confirm" || normalized === "client to confirm";
}

function escapePostgrestLike(value: string) {
  return value.replace(/[\\%*_]/g, (match) => `\\${match}`);
}

function namesMatch(left: string | null | undefined, right: string | null | undefined) {
  return normalizeMatchText(left) === normalizeMatchText(right);
}

function uniqueMatches(matches: ClientDogMatch[]) {
  const seen = new Set<string>();
  return matches.filter((match) => {
    const key = `${match.clientId}:${match.dogId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function findConnectedClient(dogName: string, clientName: string) {
  if (isPlaceholderName(dogName) || isPlaceholderName(clientName)) return null;

  const dogFilter = `%${escapePostgrestLike(dogName.trim())}%`;
  const clientFilter = `%${escapePostgrestLike(clientName.trim())}%`;

  const [dogResult, calendarResult] = await Promise.all([
    supabaseAdmin
      .from("portal_dogs")
      .select("id,name,client_id,portal_clients(id,full_name,email)")
      .ilike("name", dogFilter)
      .ilike("portal_clients.full_name", clientFilter)
      .limit(25),
    supabaseAdmin
      .from("admin_booking_calendar")
      .select("client_id,client_name,client_email,dog_id,dog_name")
      .ilike("dog_name", dogFilter)
      .ilike("client_name", clientFilter)
      .not("client_id", "is", null)
      .not("dog_id", "is", null)
      .limit(25),
  ]);

  if (dogResult.error) throw dogResult.error;
  if (calendarResult.error) throw calendarResult.error;

  const dogRows = (dogResult.data ?? []) as PortalDogMatchRow[];
  const calendarRows = (calendarResult.data ?? []) as AdminCalendarMatchRow[];

  const matches = uniqueMatches([
    ...dogRows
      .filter((row) => row.client_id && row.portal_clients && namesMatch(row.name, dogName) && namesMatch(row.portal_clients.full_name, clientName))
      .map((row) => ({
        clientId: row.client_id as string,
        clientName: row.portal_clients?.full_name?.trim() || clientName,
        clientEmail: row.portal_clients?.email ?? null,
        dogId: row.id,
        dogName: row.name?.trim() || dogName,
        source: "portal_dogs" as const,
      })),
    ...calendarRows
      .filter((row) => row.client_id && row.dog_id && namesMatch(row.dog_name, dogName) && namesMatch(row.client_name, clientName))
      .map((row) => ({
        clientId: row.client_id as string,
        clientName: row.client_name?.trim() || clientName,
        clientEmail: row.client_email ?? null,
        dogId: row.dog_id as string,
        dogName: row.dog_name?.trim() || dogName,
        source: "admin_booking_calendar" as const,
      })),
  ]);

  return matches.length === 1 ? matches[0] : null;
}

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

  const { data: rows, error: lookupError } = await supabaseAdmin
    .from("portal_outlook_imports")
    .select("id")
    .eq("outlook_event_id", event.id)
    .limit(1);

  if (lookupError) throw lookupError;

  const connectedClient = await findConnectedClient(parsed.dogName, parsed.clientName);
  const needsManualReview = parsed.needsReview || event.sensitivity === "private" || !connectedClient;

  const payload = {
    outlook_event_id: event.id,
    outlook_ical_uid: event.iCalUId ?? null,
    outlook_change_key: event.changeKey ?? null,
    outlook_web_link: event.webLink ?? null,
    subject: event.subject ?? "Outlook booking",
    service_name: parsed.serviceName,
    dog_name: connectedClient?.dogName ?? parsed.dogName,
    client_name: connectedClient?.clientName ?? parsed.clientName,
    client_id: connectedClient?.clientId ?? null,
    dog_id: connectedClient?.dogId ?? null,
    starts_at: startsAt,
    ends_at: endsAt,
    timezone: event.start?.timeZone ?? "Europe/Dublin",
    location: event.location?.displayName ?? null,
    notes: event.bodyPreview ?? null,
    sensitivity: event.sensitivity ?? null,
    status: event.isCancelled ? "cancelled" : needsManualReview ? "needs_review" : "confirmed",
    needs_review: needsManualReview,
    updated_at: new Date().toISOString(),
  };

  if (rows?.[0]?.id) {
    const { error: updateError } = await supabaseAdmin
      .from("portal_outlook_imports")
      .update(payload)
      .eq("id", rows[0].id);

    if (updateError) throw updateError;
    return { eventId: event.id, action: "updated" };
  }

  const { error: insertError } = await supabaseAdmin
    .from("portal_outlook_imports")
    .insert(payload);

  if (insertError) throw insertError;

  return { eventId: event.id, action: "created" };
}

export async function POST(request: Request) {
  try {
    const config = getGraphCalendarConfig();

    if (!config) {
      return NextResponse.json({ message: "Microsoft Graph calendar is not configured." }, { status: 503 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ message: "Supabase service role key is required to import Outlook events." }, { status: 503 });
    }

    const body = await request.json().catch(() => ({})) as { start?: string; end?: string };
    const window = { ...defaultWindow(), ...body };
    const events = await listOutlookEvents(config, window.start, window.end);
    const bookingEvents = events.filter((event) => event.subject?.trim().startsWith(OUTLOOK_BOOKING_PREFIX));

    console.log("Outlook sync scan complete", {
      calendarEmail: config.calendarEmail,
      window,
      scanned: events.length,
      matched: bookingEvents.length,
      matchedSubjects: bookingEvents.map((event) => ({
        id: event.id,
        subject: event.subject,
        startsAt: event.start?.dateTime,
      })),
    });

    const imported = [];

    for (const event of bookingEvents) {
      imported.push(await importOutlookEvent(event));
    }

    return NextResponse.json({ imported, scanned: events.length, matched: bookingEvents.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Outlook sync failed.";
    console.error("Outlook sync failed", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  return POST(new Request("https://local.outlook-sync", { method: "POST", body: JSON.stringify(defaultWindow()) }));
}
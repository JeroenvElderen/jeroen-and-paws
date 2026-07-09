import { NextResponse } from "next/server";
import { z } from "zod";

import { businessInfo } from "@/components/site/data";
import { sendMicrosoftGraphEmail } from "@/utils/microsoft-graph-email";
import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

const notificationEmail = "jeroen@jeroenandpaws.com";

const bookingRequestSchema = z.object({
  dogIds: z.array(z.string().uuid()).min(1, "Please choose at least one dog for this booking request."),
  serviceName: z.string().trim().min(2, "Please add the service you would like."),
  startsAt: z.string().datetime("Please choose a valid start date and time."),
  endsAt: z.string().datetime("Please choose a valid end date and time."),
  timezone: z.string().trim().min(1).default("Europe/Dublin"),
  location: z.string().trim().max(240, "Please keep the location shorter.").optional(),
  notes: z.string().trim().max(1200, "Please keep notes under 1,200 characters.").optional(),
});

type SupabaseAuthUser = {
  id?: string;
  email?: string;
  user?: { id?: string; email?: string };
};

type PortalClientRow = {
  id: string;
  full_name: string | null;
  email: string | null;
};

type PortalDogRow = {
  id: string;
  name: string | null;
  client_id: string;
};

function getGraphConfig() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const senderEmail = process.env.BOOKING_NOTIFICATION_EMAIL || process.env.JEROEN_AND_PAWS_EMAIL || process.env.OUTLOOK_CALENDAR_EMAIL || process.env.NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL;

  if (!tenantId || !clientId || !clientSecret || !senderEmail) return null;

  return { tenantId, clientId, clientSecret, senderEmail };
}

async function getAuthenticatedPortalUser(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!accessToken || !supabaseUrl || !anonKey) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    cache: "no-store",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) return null;

  const payload = (await response.json().catch(() => null)) as SupabaseAuthUser | null;
  const id = payload?.id ?? payload?.user?.id;
  const email = payload?.email ?? payload?.user?.email;

  return id ? { id, email: email ?? null } : null;
}

function buildNotificationBody(input: {
  client: PortalClientRow;
  dogs: PortalDogRow[];
  serviceName: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  location?: string;
  notes?: string;
}) {
  return [
    "A client requested a new portal booking. It has been added with status: needs review.",
    "",
    `Client: ${input.client.full_name || "Portal client"}`,
    `Client email: ${input.client.email || "Not available"}`,
    `Dogs: ${input.dogs.map((dog) => dog.name || "Dog to confirm").join(", ")}`,
    `Service: ${input.serviceName}`,
    `Starts: ${input.startsAt}`,
    `Ends: ${input.endsAt}`,
    `Timezone: ${input.timezone}`,
    `Location: ${input.location || "To be confirmed"}`,
    "",
    "Notes",
    input.notes || "No notes provided.",
  ].join("\n");
}

export async function POST(request: Request) {
  const user = await getAuthenticatedPortalUser(request);

  if (!user) return NextResponse.json({ error: "Please sign in before requesting a booking." }, { status: 401 });

  const payload = bookingRequestSchema.safeParse(await request.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ error: payload.error.issues[0]?.message || "Please check the booking request." }, { status: 400 });
  }

  if (new Date(payload.data.endsAt) <= new Date(payload.data.startsAt)) {
    return NextResponse.json({ error: "The booking end time must be after the start time." }, { status: 400 });
  }

  try {
    const { data: client, error: clientError } = await supabaseAdmin.from("portal_clients").select("id,full_name,email").eq("auth_user_id", user.id).maybeSingle();

    if (clientError) throw clientError;
    if (!client) return NextResponse.json({ error: "Your portal profile could not be found." }, { status: 404 });

    const requestedDogIds = Array.from(new Set(payload.data.dogIds));
    const { data: dogRows, error: dogError } = await supabaseAdmin.from("portal_dogs").select("id,name,client_id").in("id", requestedDogIds).eq("client_id", (client as PortalClientRow).id);

    if (dogError) throw dogError;

    const dogs = ((dogRows ?? []) as PortalDogRow[]).sort((a, b) => requestedDogIds.indexOf(a.id) - requestedDogIds.indexOf(b.id));

    if (dogs.length !== requestedDogIds.length) return NextResponse.json({ error: "Please choose only dogs from your portal profile." }, { status: 400 });

    const primaryDog = dogs[0];

    const { data: booking, error: insertError } = await supabaseAdmin
      .from("portal_bookings")
      .insert({
        client_id: (client as PortalClientRow).id,
        dog_id: primaryDog.id,
        dog_ids: dogs.map((dog) => dog.id),
        service_name: payload.data.serviceName,
        starts_at: payload.data.startsAt,
        ends_at: payload.data.endsAt,
        timezone: payload.data.timezone,
        location: payload.data.location || null,
        notes: payload.data.notes || null,
        status: "needs_review",
        source: "website",
        sync_status: "needs_review",
        needs_review: true,
      })
      .select("id")
      .single();

    if (insertError) throw insertError;

    const graphConfig = getGraphConfig();

    if (graphConfig) {
      try {
        await sendMicrosoftGraphEmail(graphConfig, {
          to: notificationEmail,
          replyTo: (client as PortalClientRow).email || businessInfo.email,
          replyToName: (client as PortalClientRow).full_name || "Portal client",
          subject: `New portal booking request: ${payload.data.serviceName}`,
          text: buildNotificationBody({ client: client as PortalClientRow, dogs, ...payload.data }),
        });
      } catch (error) {
        console.error("Portal booking request email failed", { route: "/api/portal/booking-requests", bookingId: booking?.id, error });
      }
    } else {
      console.error("Portal booking request email is not configured", { route: "/api/portal/booking-requests", bookingId: booking?.id });
    }

    return NextResponse.json({ bookingId: booking?.id, message: "Your booking request has been sent for review." }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to request this booking.";
    console.error("Portal booking request failed", { route: "/api/portal/booking-requests", error });
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
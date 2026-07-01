export type BookingStatus =
  | "requested"
  | "pending_confirmation"
  | "confirmed"
  | "reschedule_requested"
  | "cancelled"
  | "completed"
  | "no_show"
  | "needs_review"
  | "busy";

export type BookingSyncStatus =
  | "not_synced"
  | "pending"
  | "synced"
  | "failed"
  | "conflict"
  | "needs_review";

export type BookingSource = "website" | "outlook" | "admin_import" | "calendar_feed";

export type CalendarBooking = {
  id: string;
  clientId: string | null;
  clientName: string;
  clientEmail: string | null;
  dogId: string | null;
  dogName: string;
  serviceName: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  location: string;
  status: BookingStatus;
  source: BookingSource;
  syncStatus: BookingSyncStatus;
  outlookEventId: string | null;
  outlookWebLink: string | null;
  needsReview: boolean;
  coverImageUrl: string | null;
  notes: string | null;
  calendarFeedToken: string | null;
};

export type SupabaseBookingRow = {
  id: string;
  client_id: string | null;
  client_name: string | null;
  client_email: string | null;
  dog_id: string | null;
  dog_name: string | null;
  service_name: string | null;
  starts_at: string;
  ends_at: string;
  timezone: string | null;
  location: string | null;
  status: BookingStatus | null;
  source: BookingSource | null;
  sync_status: BookingSyncStatus | null;
  outlook_event_id: string | null;
  outlook_web_link: string | null;
  needs_review: boolean | null;
  cover_image_url: string | null;
  notes: string | null;
  calendar_feed_token?: string | null;
  feed_token?: string | null;
};

export const fallbackBookings: CalendarBooking[] = [
  {
    id: "fallback-1",
    clientId: "fallback-client-sarah",
    clientName: "Sarah",
    clientEmail: "sarah@example.com",
    dogId: "fallback-dog-teddy",
    dogName: "Teddy",
    serviceName: "Adventure Walk",
    startsAt: "2026-07-12T10:00:00+01:00",
    endsAt: "2026-07-12T12:00:00+01:00",
    timezone: "Europe/Dublin",
    location: "Greystones, County Wicklow",
    status: "confirmed",
    source: "website",
    syncStatus: "synced",
    outlookEventId: "preview-outlook-event",
    outlookWebLink: null,
    needsReview: false,
    coverImageUrl: "/images/dogs/ace.jpg",
    notes: "Preview booking until Supabase is connected.",
    calendarFeedToken: null,
  },
  {
    id: "fallback-2",
    clientId: "fallback-client-lola",
    clientName: "Emma",
    clientEmail: "emma@example.com",
    dogId: "fallback-dog-lola",
    dogName: "Lola",
    serviceName: "Meadow Social Walk",
    startsAt: "2026-07-26T09:30:00+01:00",
    endsAt: "2026-07-26T11:00:00+01:00",
    timezone: "Europe/Dublin",
    location: "Powerscourt Estate",
    status: "needs_review",
    source: "outlook",
    syncStatus: "needs_review",
    outlookEventId: "preview-imported-outlook-event",
    outlookWebLink: null,
    needsReview: true,
    coverImageUrl: "/images/dogs/lola/lola1.jpeg",
    notes: "Imported from Outlook and waiting for review.",
    calendarFeedToken: null,
  },
  {
    id: "fallback-3",
    clientId: "fallback-client-nola",
    clientName: "Mark",
    clientEmail: "mark@example.com",
    dogId: "fallback-dog-nola",
    dogName: "Nola",
    serviceName: "Golden Hour Beach Walk",
    startsAt: "2026-08-09T18:00:00+01:00",
    endsAt: "2026-08-09T19:30:00+01:00",
    timezone: "Europe/Dublin",
    location: "Greystones South Beach",
    status: "confirmed",
    source: "website",
    syncStatus: "pending",
    outlookEventId: null,
    outlookWebLink: null,
    needsReview: false,
    coverImageUrl: "/images/dogs/nola.jpg",
    notes: null,
    calendarFeedToken: null,
  },
];

export function mapBookingRow(row: SupabaseBookingRow): CalendarBooking {
  return {
    id: row.id,
    clientId: row.client_id,
    clientName: row.client_name?.trim() || "Client to confirm",
    clientEmail: row.client_email,
    dogId: row.dog_id,
    dogName: row.dog_name?.trim() || "Dog to confirm",
    serviceName: row.service_name?.trim() || "Care booking",
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    timezone: row.timezone || "Europe/Dublin",
    location: row.location?.trim() || "Location to be confirmed",
    status: row.status || "confirmed",
    source: row.source || "website",
    syncStatus: row.sync_status || "not_synced",
    outlookEventId: row.outlook_event_id,
    outlookWebLink: row.outlook_web_link,
    needsReview: Boolean(row.needs_review),
    coverImageUrl: row.cover_image_url,
    notes: row.notes,
    calendarFeedToken: row.calendar_feed_token || row.feed_token || null,
  };
}

export function formatBookingDate(value: string, options: Intl.DateTimeFormatOptions = { dateStyle: "full" }) {
  return new Intl.DateTimeFormat("en-IE", options).format(new Date(value));
}

export function formatBookingTime(value: string) {
  return new Intl.DateTimeFormat("en-IE", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(value));
}
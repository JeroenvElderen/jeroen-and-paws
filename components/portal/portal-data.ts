export const dogPlaceholderImage =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80";

export const portalDashboardData = {
  clientName: "Sarah",
  dogName: "Teddy",
  dogPhotoUrl: dogPlaceholderImage,
  heroPhotoUrl: dogPlaceholderImage,
  upcomingBooking: {
    serviceName: "Premium",
    startsAt: "2026-07-12T10:00:00+01:00",
    endsAt: "2026-07-12T12:00:00+01:00",
    location: "Greystones, County Wicklow",
    imageUrl: dogPlaceholderImage,
    status: "Confirmed",
  },
  latestSession: {
    serviceName: "Premium",
    sessionDate: "2026-06-18T10:00:00+01:00",
    imageUrl: dogPlaceholderImage,
    status: "Gallery delivered ✓",
  },
  latestUpdate:
    "You will receive live notes, photos, and arrival updates here as soon as Jeroen shares them from Supabase.",
};

export type PortalDashboardData = typeof portalDashboardData;

export type PortalDashboardViewRow = {
  client_name: string | null;
  dog_name: string | null;
  dog_photo_url: string | null;
  hero_photo_url: string | null;
  service_name: string | null;
  starts_at: string | null;
  ends_at: string | null;
  location: string | null;
  booking_status: string | null;
  booking_image_url: string | null;
  latest_update_title: string | null;
  latest_update_body: string | null;
  latest_update_image_url: string | null;
  latest_update_shared_at: string | null;
};

export function mapPortalDashboardRow(row: PortalDashboardViewRow): PortalDashboardData {
  const dogName = row.dog_name?.trim() || "your dog";
  const serviceName = row.service_name?.trim() || "Upcoming care";
  const startsAt = row.starts_at || new Date().toISOString();
  const endsAt = row.ends_at || startsAt;
  const imageUrl = row.booking_image_url || row.dog_photo_url || dogPlaceholderImage;

  return {
    clientName: firstName(row.client_name) || "there",
    dogName,
    dogPhotoUrl: row.dog_photo_url || dogPlaceholderImage,
    heroPhotoUrl: row.hero_photo_url || row.dog_photo_url || dogPlaceholderImage,
    upcomingBooking: {
      serviceName,
      startsAt,
      endsAt,
      location: row.location?.trim() || "Location to be confirmed",
      imageUrl,
      status: formatStatus(row.booking_status) || "Confirmed",
    },
    latestSession: {
      serviceName: row.latest_update_title?.trim() || serviceName,
      sessionDate: row.latest_update_shared_at || startsAt,
      imageUrl: row.latest_update_image_url || imageUrl,
      status: row.latest_update_title ? "Update shared ✓" : "Awaiting first update",
    },
    latestUpdate:
      row.latest_update_body?.trim() ||
      "You will receive live notes, photos, and arrival updates here as soon as Jeroen shares them.",
  };
}

function firstName(value: string | null) {
  return value?.trim().split(/\s+/)[0] ?? "";
}

function formatStatus(value: string | null) {
  if (!value) return "";
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}
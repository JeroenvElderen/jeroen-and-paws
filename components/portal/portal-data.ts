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
export type ServiceItem = {
  title: string;
  price: string;
  duration: string;
  description: string;
};

export type ServiceCategory = {
  category: string;
  items: ServiceItem[];
};

export const homepageHighlights = [
  { label: "Active service options", value: "27" },
  { label: "Registered owners", value: "2" },
  { label: "Registered dogs", value: "3" },
  { label: "Bookings already captured", value: "2" },
];

export const serviceCategories: ServiceCategory[] = [
  {
    category: "Daily Strolls",
    items: [
      {
        title: "Standard stroll",
        price: "€18/visit",
        duration: "30 min",
        description:
          "A refreshing 30-minute stroll — ideal for movement, fresh air, and enrichment during the day.",
      },
      {
        title: "Extended stroll",
        price: "€28/visit",
        duration: "60 min",
        description:
          "A longer outing with extra time for sniffing, exploring, and enjoying the neighbourhood.",
      },
      {
        title: "Custom Care",
        price: "Custom quote",
        duration: "Flexible",
        description:
          "Personalised walking plans for unique schedules, preferred routes, and special requests.",
      },
    ],
  },
  {
    category: "Daytime Care",
    items: [
      {
        title: "Half-day stay",
        price: "€25/day",
        duration: "4 hrs",
        description:
          "A relaxed daytime stay with gentle activity, rest, and attention before heading home.",
      },
      {
        title: "Full-day care",
        price: "€40/day",
        duration: "8 hrs",
        description:
          "A complete day of calm supervision, enrichment, and rest while you are occupied.",
      },
      {
        title: "Tailored daytime care",
        price: "Custom quote",
        duration: "Flexible",
        description:
          "A daytime schedule perfectly matched to timing, pick-up, and enrichment preferences.",
      },
    ],
  },
  {
    category: "Overnight & Adventures",
    items: [
      {
        title: "Standard Overnight Stay",
        price: "€70/night",
        duration: "Overnight",
        description:
          "Overnight care in a calm home setting with routines designed around your companion.",
      },
      {
        title: "Half-Day Adventure",
        price: "€75",
        duration: "4 hrs",
        description:
          "Steady interaction, relaxed walks, and restful pauses in a guided group setting.",
      },
      {
        title: "Full-Day Solo Journey",
        price: "€120/journey",
        duration: "6 hrs",
        description:
          "A full day exploring together at your dog's pace — unhurried and deeply engaging.",
      },
    ],
  },
  {
    category: "Training & Support",
    items: [
      {
        title: "Introductory Training Session",
        price: "€35/session",
        duration: "30 min",
        description:
          "A short focused session to build confidence and create early momentum.",
      },
      {
        title: "Puppy training",
        price: "€65",
        duration: "60 min",
        description:
          "One-to-one puppy support for socialisation, potty routines, and foundational cues.",
      },
      {
        title: "Bespoke Care Plan",
        price: "Custom quote",
        duration: "Flexible",
        description:
          "Tailored plans for behaviour, medical needs, and long-term care routines.",
      },
    ],
  },
];

export const dataModelImprovements = [
  "Keep `services` as your public catalogue and add `is_featured` to control homepage cards.",
  "Store price in cents (`price_cents`) + currency code (`currency`) instead of formatted text for cleaner sorting/filtering.",
  "Keep `bookings` and `booking_pets` separate, and add `booking_status_history` for auditability.",
  "Add `service_category` lookup table to avoid category typos and manage ordering centrally.",
];
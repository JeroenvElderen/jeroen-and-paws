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
  { label: "Core services", value: "5" },
  { label: "Happy owners", value: "100+" },
  { label: "Walks and visits", value: "5k+" },
  { label: "Years of care", value: "7+" },
];

export const serviceCategories: ServiceCategory[] = [
  {
    category: "Walking Services",
    items: [
      {
        title: "Daily Stroll",
        price: "From £18",
        duration: "30 min",
        description:
          "A reliable daily walk focused on exercise, enrichment, and consistency.",
      },
      {
        title: "Extended Stroll",
        price: "From £28",
        duration: "60 min",
        description:
          "Extra time for active dogs who benefit from longer routes and exploration.",
      },
      {
        title: "Solo Journey",
        price: "Custom quote",
        duration: "Flexible",
        description:
          "One-to-one sessions for dogs who prefer focused individual attention.",
      },
    ],
  },
  {
    category: "Day Care & Home Visits",
    items: [
      {
        title: "Half-Day Day Care",
        price: "From £25",
        duration: "4 hrs",
        description:
          "A calm supervised stay with play, rest, and regular comfort breaks.",
      },
      {
        title: "Full-Day Day Care",
        price: "From £40",
        duration: "8 hrs",
        description:
          "A full day of structured care while you're at work or away.",
      },
      {
        title: "Home Check-In",
        price: "Custom quote",
        duration: "20-30 min",
        description:
          "A short home visit for feeding, toilet breaks, companionship, and updates.",
      },
    ],
  },
  {
    category: "Boarding",
    items: [
      {
        title: "Overnight Stay",
        price: "From £70",
        duration: "Overnight",
        description:
          "Safe, home-style overnight care with your dog's routine followed closely.",
      },
      {
        title: "Weekend Boarding",
        price: "Custom quote",
        duration: "2-3 days",
        description:
          "Support for short trips with regular walks, mealtimes, and personal attention.",
      },
      {
        title: "Holiday Boarding",
        price: "Custom quote",
        duration: "Multi-day",
        description:
          "Longer-stay care for holidays with clear communication and daily updates.",
      },
    ],
  },
  {
    category: "Training Support",
    items: [
      {
        title: "Behaviour Basics",
        price: "From £35",
        duration: "30 min",
        description:
          "Foundational support for recall, lead walking, and calm daily behaviour.",
      },
      {
        title: "Puppy Training",
        price: "From £65",
        duration: "60 min",
        description:
          "Structured one-to-one puppy sessions for confidence and healthy habits.",
      },
      {
        title: "Custom Plan",
        price: "Custom quote",
        duration: "Flexible",
        description:
          "A tailored program for dogs with special routines, needs, or sensitivities.",
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

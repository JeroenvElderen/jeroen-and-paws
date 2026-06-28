// Pricing cards for daytime care services. Editing this file changes that visible website content.
import { CalendarCheck, CloudSun } from "lucide-react";
import type { PricingPlan } from "./types";

export const daytimeCarePlans: PricingPlan[] = [
  {
    title: "Half-day stay",
    description:
      "A relaxed daytime stay — ideal for companions who need a few hours of gentle activity, rest, and attention before heading home.",
    price: "€25",
    unit: "/ day",
    icon: CloudSun,
    features: [
      "4 hours",
      "Recurring available",
      "Gentle activity",
      "Rest and attention",
      "Calm supervision",
    ],
  },
  {
    title: "Full-day care",
    description:
      "A complete day of calm supervision, enrichment, and rest — perfect when you’re at work or occupied and want your companion genuinely supported throughout the day.",
    price: "€40",
    unit: "/ day",
    icon: CalendarCheck,
    featured: false,
    features: [
      "8 hours",
      "Recurring available",
      "Enrichment and rest",
      "Calm supervision",
      "Regular updates",
    ],
  },
];

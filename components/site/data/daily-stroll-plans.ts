// Pricing cards for dog walking and daily stroll services. Editing this file changes that visible website content.
import { Dog, Timer } from "lucide-react";
import type { PricingPlan } from "./types";

export const dailyStrollImages = {
  serviceCard: "/images/dogs/Nola/Nola-1.jpg",
  hero: "/images/dogs/Nola/Nola-1.jpg",
  feature: "/images/dogs/ace.jpg",
} as const;

export const dailyStrollPlans: PricingPlan[] = [
  {
    title: "Standard stroll",
    description:
      "A refreshing 30-minute stroll — ideal for movement, fresh air, and a little enrichment during the day.",
    price: "€18",
    unit: "/ visit",
    icon: Timer,
    features: [
      "30 minutes",
      "Recurring available",
      "Fresh air and enrichment",
      "Photo updates",
      "Matched to routine",
    ],
  },
  {
    title: "Extended stroll",
    description:
      "A longer outing with extra time for sniffing, exploring, and enjoying the neighbourhood — perfect for companions who love a fuller adventure.",
    price: "€28",
    unit: "/ visit",
    icon: Dog,
    featured: true,
    features: [
      "60 minutes",
      "Recurring available",
      "Extra sniffing time",
      "Neighbourhood exploring",
      "Photo updates",
    ],
  },
];

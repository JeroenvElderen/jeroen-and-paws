// Pricing cards for solo journey/adventure services. Editing this file changes that visible website content.
import { CloudSun, Route } from "lucide-react";
import type { PricingPlan } from "./types";

export const soloJourneyPlans: PricingPlan[] = [
  {
    title: "Half-Day Solo Journey",
    description: "A half-day outing paced around your companion.",
    price: "€70",
    unit: "/ journey",
    icon: Route,
    features: [
      "3 hours",
      "One-to-one care",
      "Paced around your dog",
      "Focused attention",
      "Photo updates",
    ],
  },
  {
    title: "Full-Day Solo Journey",
    description: "A full day exploring together — unhurried and engaging.",
    price: "€120",
    unit: "/ journey",
    icon: CloudSun,
    featured: false,
    features: [
      "6 hours",
      "One-to-one care",
      "Unhurried exploring",
      "Engaging activities",
      "Multi-day support available",
    ],
  },
];

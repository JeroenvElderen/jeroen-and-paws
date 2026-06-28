// Pricing cards for overnight support services. Editing this file changes that visible website content.
import { Moon } from "lucide-react";
import type { PricingPlan } from "./types";

export const overnightSupportPlans: PricingPlan[] = [
  {
    title: "Standard Overnight Stay",
    description: "Overnight care in a calm home setting.",
    price: "€50",
    unit: "/ night",
    icon: Moon,
    featured: true,
    features: [
      "Overnight support",
      "Calm home setting",
      "Familiar routines",
      "24-hour duration",
      "Peace of mind",
    ],
  },
];

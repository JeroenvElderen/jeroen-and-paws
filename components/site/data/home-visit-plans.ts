// Pricing cards for home check-in services. Editing this file changes that visible website content.
import { HandHeart, Home } from "lucide-react";
import type { PricingPlan } from "./types";

export const homeVisitImages = {
  serviceCard: "/images/dogs/lola/lola1.jpeg",
  hero: "/images/dogs/lola/lola1.jpeg",
  feature: "/images/dogs/kaiser.jpg",
} as const;

export const homeVisitPlans: PricingPlan[] = [
  {
    title: "Essential Home Visit",
    description:
      "Fresh water, feeding if required, outdoor break, and calm interaction.",
    price: "€18",
    unit: "/ visit",
    icon: HandHeart,
    features: [
      "30 minutes",
      "Recurring available",
      "Fresh water",
      "Feeding if required",
      "Outdoor break",
    ],
  },
  {
    title: "Extended Home Visit",
    description:
      "A longer, unhurried visit offering additional time and reassurance.",
    price: "€28",
    unit: "/ visit",
    icon: Home,
    featured: true,
    features: [
      "60 minutes",
      "Recurring available",
      "Additional reassurance",
      "Calm interaction",
      "Photo updates",
    ],
  },
];

// Pricing cards for group walk and adventure services. Editing this file changes that visible website content.
import { CloudSun, Route, Users } from "lucide-react";
import type { PricingPlan } from "./types";

export const groupAdventureImages = {
  serviceCard: "/images/dogs/Johnny/Johnny.jpeg",
  hero: "/images/dogs/Johnny/Johnny.jpeg",
  feature: "/images/dogs/lakta/lakta1.jpg",
} as const;

export const groupAdventurePlans: PricingPlan[] = [
  {
    title: "2-Hour Adventure",
    description:
      "An extended group outing with time for movement and gentle social engagement.",
    price: "€45",
    unit: "/ outing",
    icon: Users,
    features: [
      "2 hours",
      "Guided activity",
      "Gentle social engagement",
      "Movement and play",
      "Small-group care",
    ],
  },
  {
    title: "Half-Day Adventure",
    description:
      "Additional time outdoors for steady interaction, relaxed walks, and restful pauses.",
    price: "€75",
    unit: "/ outing",
    icon: Route,
    featured: true,
    features: [
      "4 hours",
      "Relaxed walks",
      "Restful pauses",
      "Steady interaction",
      "Guided group outing",
    ],
  },
  {
    title: "Full-Day Adventure",
    description:
      "A full day of guided activity — varied walks, purposeful play, and downtime.",
    price: "€120",
    unit: "/ outing",
    icon: CloudSun,
    features: [
      "8 hours",
      "Varied walks",
      "Purposeful play",
      "Downtime included",
      "Guided activity",
    ],
  },
];

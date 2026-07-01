// Pricing cards for custom care services. Editing this file changes that visible website content.
import { ShieldCheck } from "lucide-react";
import type { PricingPlan } from "./types";

export const customCareImages = {
  hero: "/images/dogs/leia1.jpg",
  feature: "/images/dogs/nola.jpg",
} as const;

export const customCarePlans: PricingPlan[] = [
  {
    title: "Custom & tailored care",
    description:
      "One flexible option for unique schedules, preferred routes, multiple visits, medication, late pickup, extra nights, behavioural goals, specialist support, and bespoke care plans.",
    price: "Custom",
    unit: "",
    icon: ShieldCheck,
    featured: true,
    priceNote:
      "Quoted around your companion’s routine, goals, and care requirements.",
    features: [
      "One card for all custom and tailored services",
      "Walking, home, daytime, overnight, adventure, and training support",
      "Behaviour consultations and specialist support",
      "Medical or unique care needs",
      "Multi-day support available",
    ],
  },
];

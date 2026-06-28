// Pricing cards for dog training services. Editing this file changes that visible website content.
import { Dog, GraduationCap, PawPrint, Timer } from "lucide-react";
import type { PricingPlan } from "./types";

export const trainingPlans: PricingPlan[] = [
  {
    title: "Introductory Training Session",
    description: "A short, focused training session.",
    price: "€35",
    unit: "/ session",
    icon: GraduationCap,
    features: [
      "30 minutes",
      "Focused support",
      "Multi-day support available",
      "Foundational guidance",
      "Clear next steps",
    ],
  },
  {
    title: "Standard Training Session",
    description: "A structured session to reinforce behaviours.",
    price: "€60",
    unit: "/ session",
    icon: Dog,
    featured: true,
    features: [
      "60 minutes",
      "Recurring available",
      "Behaviour reinforcement",
      "Structured session",
      "Multi-day support available",
    ],
  },
  {
    title: "Puppy training",
    description:
      "One-to-one puppy training focused on socialisation, potty routines, and foundational cues like sit, stay, and leash manners.",
    price: "€65",
    unit: "/ session",
    icon: PawPrint,
    features: [
      "60 minutes",
      "Recurring available",
      "Socialisation",
      "Potty routines",
      "Foundational cues",
    ],
  },
  {
    title: "Extended Training Session",
    description: "An extended session for slower pacing.",
    price: "€100",
    unit: "/ session",
    icon: Timer,
    features: [
      "120 minutes",
      "Recurring available",
      "Slower pacing",
      "More practice time",
      "Multi-day support available",
    ],
  },
];

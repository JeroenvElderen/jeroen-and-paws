// Shared data types used by website content files. Editing this changes TypeScript shapes only, not visible page copy.
import type { LucideIcon } from "lucide-react";

export type PageName = "home" | "about" | "services" | "contact" | "policies";

export type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PricingPlan = {
  title: string;
  description: string;
  price: string;
  unit: string;
  icon: LucideIcon;
  features: string[];
  featured?: boolean;
  badge?: string;
  pricePrefix?: string;
  priceNote?: string;
};

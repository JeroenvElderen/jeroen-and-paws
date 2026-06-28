// Combined pricing cards shown on the dog walking service detail page. Editing this file changes that visible website content.
import type { PricingPlan } from "./types";
import { dailyStrollPlans } from "./daily-stroll-plans";
import { soloJourneyPlans } from "./solo-journey-plans";

export const walksAndSoloAdventurePlans: PricingPlan[] = [
  ...dailyStrollPlans,
  ...soloJourneyPlans,
];

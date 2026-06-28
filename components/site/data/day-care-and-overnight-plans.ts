// Combined pricing cards shown on the daytime care and overnight service detail page. Editing this file changes that visible website content.
import type { PricingPlan } from "./types";
import { daytimeCarePlans } from "./daytime-care-plans";
import { overnightSupportPlans } from "./overnight-support-plans";

export const dayCareAndOvernightPlans: PricingPlan[] = [
  ...daytimeCarePlans,
  ...overnightSupportPlans,
];

import type { MetadataRoute } from "next";

import { businessInfo } from "@/components/site/data";
import { serviceDetails } from "@/components/site/service-details";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;
const routes = [
  "/",
  "/services",
  ...serviceDetails.map((service) => `/services/${service.slug}`),
  "/about",
  "/contact",
  "/privacy",
  "/policies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "/" ? 1 : route.startsWith("/services") ? 0.9 : 0.7,
  }));
}

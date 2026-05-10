import type { MetadataRoute } from "next";

import { businessInfo } from "@/components/site/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;
const routes = ["/", "/services", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "/" ? 1 : 0.7,
  }));
}

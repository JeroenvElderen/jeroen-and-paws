import type { MetadataRoute } from "next";

import { businessInfo } from "@/components/site/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

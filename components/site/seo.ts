import type { Metadata } from "next";

import { businessInfo } from "@/components/site/data";
import type { ServiceDetail } from "@/components/site/service-details";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;

export const localKeywords = [
  "dog walking Bray",
  "dog walker Bray",
  "dog training Bray",
  "dog boarding Bray",
  "dog day care Bray",
  "dog home visits Bray",
  "dog care Dublin",
  "dog walker Dublin",
  "dog boarding Dublin",
  "dog care County Meath",
  "dog walker County Meath",
  "dog care County Wicklow",
  "dog walker Greystones",
  "dog walking Greystones",
  "pet services Leinster",
  "Jeroen and Paws",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  image = "/images/dogs/lakta/lakta1.jpg",
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...localKeywords, ...keywords],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: businessInfo.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${businessInfo.name} dog care in Bray` }],
      locale: "en_IE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function serviceKeywords(service: ServiceDetail) {
  return [
    `${service.title} Bray`,
    `${service.title} Dublin`,
    `${service.title} County Dublin`,
    `${service.title} County Wicklow`,
    `${service.title} County Meath`,
    `${service.title} County Kildare`,
    `${service.title} Greystones`,
    `${service.title} Wicklow`,
    ...service.perfectFor.map((item) => `${service.title} for dogs who ${item.toLowerCase()}`),
  ];
}
import type { Metadata, Viewport } from "next";

import { businessInfo } from "@/components/site/data";
import { localKeywords } from "@/components/site/seo";
import { StructuredData } from "@/components/site/structured-data";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;

export const viewport: Viewport = {
  themeColor: "#080b10",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jeroen & Paws | Personalised Dog Care & Training",
    template: "%s | Jeroen & Paws",
  },
  description:
    "Jeroen & Paws offers personalised dog walking, training, day care, home check-ins, and boarding with warm, dependable care by appointment in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
  applicationName: businessInfo.name,
  authors: [{ name: businessInfo.name, url: siteUrl }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  category: "Pet services",
  keywords: localKeywords,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Jeroen & Paws | Personalised Dog Care & Training",
    description:
      "Personalised dog walking, training, day care, home check-ins, and boarding by appointment in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
    url: siteUrl,
    siteName: businessInfo.name,
    images: [
      {
        url: "/images/dogs/lakta/lakta1.jpg",
        width: 1200,
        height: 630,
        alt: "A happy dog enjoying Jeroen & Paws care",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeroen & Paws | Personalised Dog Care & Training",
    description:
      "Personalised dog walking, training, day care, home check-ins, and boarding by appointment in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
    images: ["/images/dogs/lakta/lakta1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

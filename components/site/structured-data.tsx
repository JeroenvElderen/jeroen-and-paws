import { businessInfo, faqs, serviceAreas } from "@/components/site/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PetService",
        name: businessInfo.name,
        url: siteUrl,
        email: businessInfo.email,
        telephone: businessInfo.phoneDisplay,
        areaServed: serviceAreas.map((area) => ({
          "@type": "Place",
          name: area,
        })),
        openingHours: "Mo-Su 08:00-22:00",
        priceRange: "€€",
        description: businessInfo.serviceAreaSummary,
        serviceType: [
          "Dog walking",
          "Dog training",
          "Dog day care",
          "Dog boarding",
          "Home check-ins",
          "Custom dog care",
        ],
        sameAs: [businessInfo.instagramUrl],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

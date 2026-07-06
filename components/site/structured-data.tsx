import { businessInfo, faqs, serviceAreas } from "@/components/site/data";
import { serviceDetails } from "@/components/site/service-details";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.siteUrl;
const logoUrl = `${siteUrl}/logo4.svg`;
const imageUrl = `${siteUrl}/images/dogs/lakta/lakta1.jpg`;

export function StructuredData() {
  const services = serviceDetails.map((service) => ({
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    name: `${service.title} in Bray, Dublin and Leinster`,
    url: `${siteUrl}/services/${service.slug}`,
    description: service.intro,
    provider: { "@id": `${siteUrl}#business` },
    areaServed: serviceAreas.map((area) => ({ "@type": "Place", name: area })),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: service.priceFrom.replace(/[^0-9.]/g, ""),
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/contact`,
    },
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: businessInfo.name,
        url: siteUrl,
        inLanguage: "en-IE",
      },
      {
        "@type": ["LocalBusiness", "PetService"],
        "@id": `${siteUrl}#business`,
        name: businessInfo.name,
        url: siteUrl,
        logo: logoUrl,
        image: imageUrl,
        email: businessInfo.email,
        telephone: businessInfo.phoneDisplay,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: businessInfo.phoneDisplay,
          email: businessInfo.email,
          contactType: "customer service",
          areaServed: "IE",
          availableLanguage: ["English"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bray",
          addressRegion: "County Wicklow",
          addressCountry: "IE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.2009,
          longitude: -6.1111,
        },
        areaServed: serviceAreas.map((area) => ({
          "@type": "Place",
          name: area,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "08:00",
            closes: "22:00",
          },
        ],
        priceRange: "€€",
        description: businessInfo.serviceAreaSummary,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Dog care services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@id": service["@id"] },
          })),
        },
        sameAs: [businessInfo.instagramUrl],
      },
      ...services,
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
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

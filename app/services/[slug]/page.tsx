import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/site/pages/service-detail-page";
import { buildPageMetadata, serviceKeywords } from "@/components/site/seo";
import { getServiceDetail, serviceDetails } from "@/components/site/service-details";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    return {};
  }

  return buildPageMetadata({
    title: `${service.title} in Bray, Dublin & Leinster`,
    description: `${service.intro} Available from ${service.priceFrom}${service.priceUnit} with Jeroen & Paws in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.`,
    path: `/services/${service.slug}`,
    image: service.heroImage,
    keywords: serviceKeywords(service),
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}

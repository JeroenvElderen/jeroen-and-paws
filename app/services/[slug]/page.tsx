import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/site/pages/service-detail-page";
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

  return {
    title: service.title,
    description: service.intro,
  };
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

import { ContactPageContent } from "@/components/site/pages/contact-page";
import type { SelectedServiceDetails } from "@/components/site/sections/contact-form";

export const metadata = {
  title: "Contact - Jeroen & Paws",
  description:
    "Contact Jeroen & Paws to talk about training, walks, day care, boarding, home check-ins, and personalised care for your dog.",
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getFirstParam = (
  params: Record<string, string | string[] | undefined>,
  key: keyof SelectedServiceDetails,
) => {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = (await searchParams) || {};
  const selectedService: SelectedServiceDetails = {
    service: getFirstParam(params, "service"),
    price: getFirstParam(params, "price"),
    unit: getFirstParam(params, "unit"),
    description: getFirstParam(params, "description"),
    features: getFirstParam(params, "features"),
  };

  return <ContactPageContent selectedService={selectedService} />;
}

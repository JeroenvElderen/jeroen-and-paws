import { ContactPageContent } from "@/components/site/pages/contact-page";
import type { SelectedServiceDetails } from "@/components/site/sections/contact-form";

export const metadata = {
  title: "Contact & Book a Free Meet and Greet",
  description:
    "Contact Jeroen & Paws to talk about training, walks, day care, boarding, home check-ins, and personalised care for your dog.",
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const maxParamLengths: Record<keyof SelectedServiceDetails, number> = {
  service: 120,
  price: 60,
  unit: 60,
  description: 500,
  features: 1000,
};

const getFirstParam = (
  params: Record<string, string | string[] | undefined>,
  key: keyof SelectedServiceDetails,
) => {
  const value = params[key];
  const firstValue = Array.isArray(value) ? value[0] : value;

  if (!firstValue) return undefined;

  return firstValue.trim().slice(0, maxParamLengths[key]);
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

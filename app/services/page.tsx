import { ServicesPageContent } from "@/components/site/pages/services-page";
import { buildPageMetadata } from "@/components/site/seo";

export const metadata = buildPageMetadata({
  title: "Dog Walking, Boarding, Day Care & Training Services in Bray",
  description:
    "Explore Jeroen & Paws dog walking, home check-ins, day care, overnight boarding, group walks, dog training, and tailored care in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
  path: "/services",
  keywords: ["dog services Bray", "dog boarding Wicklow", "dog boarding Dublin", "dog services County Meath", "home dog visits Bray"],
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}

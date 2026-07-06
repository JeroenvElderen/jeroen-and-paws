import { AboutPageContent } from "@/components/site/pages/about-page";
import { buildPageMetadata } from "@/components/site/seo";

export const metadata = buildPageMetadata({
  title: "About Jeroen | Dog Trainer, Walker & Boarding in Bray",
  description:
    "Meet Jeroen, a dog trainer, walker, and boarding provider offering calm, personalised care for dogs and families in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
  path: "/about",
  keywords: ["about Jeroen and Paws", "Bray dog care provider", "Wicklow dog trainer", "Dublin dog trainer", "Meath dog trainer"],
});

export default function AboutPage() {
  return <AboutPageContent />;
}

import { HomePage } from "@/components/site/pages/home-page";
import { buildPageMetadata } from "@/components/site/seo";

export const metadata = buildPageMetadata({
  title: "Dog Walking, Training, Day Care & Boarding in Bray",
  description:
    "Book a free meet-and-greet for personalised dog walking, training, day care, boarding, home check-ins, and custom dog care in Bray, Dublin, County Wicklow, County Meath, and nearby Leinster areas.",
  path: "/",
  keywords: ["premium dog care Bray", "trusted dog walker Wicklow", "dog care Dublin", "dog care County Meath", "positive dog training Wicklow"],
});

export default function Home() {
  return <HomePage />;
}

import { labels, sittingPlans, walkPlans } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageHero } from "@/components/site/sections/page-hero";
import { PricingCards, GuaranteeBanner } from "@/components/site/sections/pricing-section";
import { ProcessSection } from "@/components/site/sections/process-section";
import { SectionHeader } from "@/components/site/sections/section-header";
import { ServiceArea } from "@/components/site/sections/service-area";

export function ServicesPageContent() {
  return (
    <SiteShell activePage="services">
      <PageHero icon={labels.services} label="Services & Pricing" title="Simple Pricing, No Surprises" text="Choose the care that fits your pet's routine. Every service includes updates, photos, and a walker who treats your pet like family." />
      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.dog} label="Dog Walking" title="Daily Walks" text="Solo walks through local parks and trails. Every walk includes GPS tracking, a photo update, and a summary report." />
          <PricingCards plans={walkPlans} />
        </div>
      </section>
      <section className="bg-[#f8f3ff] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.sitting} label="Pet Sitting" title="In-Home Pet Care" text="Your pet stays comfortable at home while we handle the rest. Perfect for travel, long work days, or recovery periods." />
          <PricingCards plans={sittingPlans} />
        </div>
      </section>
      <section className="bg-white px-6 py-16 sm:px-8"><GuaranteeBanner /></section>
      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.process} label="How It Works" title="Getting Started Is Easy" text="No confusing contracts. Just a simple process that helps us learn your pet and care for them well." />
          <ProcessSection />
        </div>
      </section>
      <section className="bg-[#f8f3ff] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.area} label="Service Area" title="Where We Walk" text="We serve local neighborhoods and nearby parks. Don't see your area? Ask us anyway—we may be able to help." />
          <ServiceArea />
        </div>
      </section>
      <CtaSection title="Ready to Book?" text="Start with a free meet-and-greet. We'll come to you, meet your pet, and build a care plan together." />
    </SiteShell>
  );
}

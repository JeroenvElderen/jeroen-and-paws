import { labels, sittingPlans, walkPlans } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageHero } from "@/components/site/sections/page-hero";
import {
  PricingCards,
  GuaranteeBanner,
} from "@/components/site/sections/pricing-section";
import { ProcessSection } from "@/components/site/sections/process-section";
import { SectionHeader } from "@/components/site/sections/section-header";
import { ServiceArea } from "@/components/site/sections/service-area";

export function ServicesPageContent() {
  return (
    <SiteShell activePage="services">
      <PageHero
        icon={labels.services}
        label="Our services"
        title="Pick the perfect fit"
        text="Choose flexible walking, home check-ins, training, day care, boarding, and custom care shaped around your companion’s personality and lifestyle."
      />
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.dog}
            label="Walking options"
            title="Daily strolls, solo journeys, and group adventures"
            text="Personalised outings matched to your companion’s pace, confidence, social needs, and routine."
          />
          <PricingCards plans={walkPlans} />
        </div>
      </section>
      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.sitting}
            label="Care options"
            title="Home check-ins, daytime care, and overnight stays"
            text="Comforting, structured care that keeps your companion relaxed, supported, and safe."
          />
          <PricingCards plans={sittingPlans} />
        </div>
      </section>
      <section className="bg-[#111821] px-6 py-16 sm:px-8">
        <GuaranteeBanner />
      </section>
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.process}
            label="How It Works"
            title="A calm start for every companion"
            text="A thoughtful meet-and-greet helps Jeroen understand your dog’s routine, personality, and needs before care begins."
          />
          <ProcessSection />
        </div>
      </section>
      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.area}
            label="Service Area"
            title="Complete care for your companion"
            text="From energising walks to reassuring overnight stays, each service is shaped around your companion’s routine and personality."
          />
          <ServiceArea />
        </div>
      </section>
      <CtaSection
        title="Welcome to your companion’s second home"
        text="Reach out and let’s explore the walking, training, day care, boarding, or custom options that suit your dog best."
      />
    </SiteShell>
  );
}

import { labels, sittingPlans, specialtyPlans, walkPlans } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageHero } from "@/components/site/sections/page-hero";
import { GuaranteeBanner, PricingCards } from "@/components/site/sections/pricing-section";
import { ProcessSection } from "@/components/site/sections/process-section";
import { SectionHeader } from "@/components/site/sections/section-header";
import { ServiceArea } from "@/components/site/sections/service-area";

export function ServicesPageContent() {
  return (
    <SiteShell activePage="services">
      <PageHero icon={labels.services} label="Our services" title="Pick the perfect fit" text="Walking, training, day care, boarding, home check-ins, and custom solutions are shaped around your companion’s personality, routine, and comfort." />
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.dog} label="Dog walking" title="Daily strolls, solo journeys, and group adventures" text="Choose a calm one-to-one outing, dependable daily routine, or safe social adventure matched to your companion." />
          <PricingCards plans={walkPlans} />
        </div>
      </section>
      <section className="bg-slate-950 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.sitting} label="Day care and boarding" title="Home check-ins, daytime care, and overnight stays" text="Comforting visits, structured days, and cosy overnight care help your dog feel safe even when you’re away." />
          <PricingCards plans={sittingPlans} />
        </div>
      </section>
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.trust} label="Training and custom care" title="Support built around your dog" text="Build confidence, improve habits, or mix services into a flexible plan that fits your companion’s lifestyle." />
          <PricingCards plans={specialtyPlans} />
        </div>
      </section>
      <section className="bg-slate-950 px-6 py-16 sm:px-8"><GuaranteeBanner /></section>
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.process} label="How it works" title="Simple, reassuring, and personal" text="We start by understanding your dog, then choose the care style that helps them feel supported and happy." />
          <ProcessSection />
        </div>
      </section>
      <section className="bg-slate-950 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.area} label="Service area" title="Local neighbourhoods and surrounding areas" text="If you’re unsure whether your address is included, just ask and I’ll confirm availability." />
          <ServiceArea />
        </div>
      </section>
      <CtaSection title="Explore the option that suits them best" text="Start with a quick message and we’ll find the right care plan for your companion." />
    </SiteShell>
  );
}

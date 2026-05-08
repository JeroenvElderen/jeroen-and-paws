import { labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { FeatureGrid } from "@/components/site/sections/feature-grid";
import { HomeHero } from "@/components/site/sections/home-hero";
import { SectionHeader } from "@/components/site/sections/section-header";
import { ServicesPreview } from "@/components/site/sections/services-preview";
import { Testimonials } from "@/components/site/sections/testimonials";

export function HomePage() {
  return (
    <SiteShell activePage="home">
      <HomeHero />
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.trust}
            label="Why Jeroen & Paws"
            title="Where Your Companion’s Comfort Comes First"
            text="Reliable walks, enriching daycare, personalised training, and safe overnight stays — everything your companion needs to feel supported, happy, and secure."
          />
          <FeatureGrid />
        </div>
      </section>
      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.services}
            label="What We Offer"
            title="Thoughtful care for your companion"
            text="Explore personalised care and training services thoughtfully designed to support your beloved companion."
          />
          <ServicesPreview />
        </div>
      </section>
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.testimonials}
            label="Happy Clients"
            title="What our clients say"
            text="Discover how our personalised dog care services have made a difference for pet owners like you."
          />
          <Testimonials />
        </div>
      </section>
      <CtaSection
        title="Caring for your companion like family"
        text="Personalised training, dependable daily walks, and safe boarding or daytime care are all delivered with genuine heart."
      />
    </SiteShell>
  );
}

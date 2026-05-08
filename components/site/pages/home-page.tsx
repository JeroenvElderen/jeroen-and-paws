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
      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.trust} label="Why Jeroen & Paws" title="Pet Care You Can Count On" text="We built this business because we saw too many dog walkers treat it like a side gig. This is our full-time commitment to your pet's wellbeing." />
          <FeatureGrid />
        </div>
      </section>
      <section className="bg-[#fefce8] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.services} label="What We Offer" title="Services for Every Pet" text="From daily walks to overnight stays, we have the right care plan for your pet's needs and your schedule." />
          <ServicesPreview />
        </div>
      </section>
      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.testimonials} label="Happy Clients" title="Pet Parents Love Us" text="Our clients count on us for dependable, thoughtful care every week." />
          <Testimonials />
        </div>
      </section>
      <CtaSection title="Ready to Give Your Pet the Best?" text="Book a free meet-and-greet and see why hundreds of local families trust Jeroen & Paws with their pets." />
    </SiteShell>
  );
}

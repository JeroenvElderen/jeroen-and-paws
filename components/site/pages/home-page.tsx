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
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.comfort} label="Where comfort comes first" title="Thoughtful care for your companion" text="Reliable walks, enriching daycare, personalised training, and safe overnight stays — everything your companion needs to feel supported, happy, and secure." />
          <FeatureGrid />
        </div>
      </section>
      <section className="bg-slate-950 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.services} label="Complete care" title="Services for every companion" text="From energising walks to reassuring overnight stays, care is shaped around your companion’s routine and personality." />
          <ServicesPreview />
        </div>
      </section>
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.testimonials} label="What clients say" title="Care you can trust" text="Discover how personalised dog care services have made a difference for pet owners just like you." />
          <Testimonials />
        </div>
      </section>
      <CtaSection title="Caring for your companion like family" text="Personalised training, dependable daily walks, and safe boarding/day care are ready when your companion needs them." />
    </SiteShell>
  );
}

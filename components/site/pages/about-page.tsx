import { labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { PageHero } from "@/components/site/sections/page-hero";
import { SectionHeader } from "@/components/site/sections/section-header";
import { StorySection } from "@/components/site/sections/story-section";
import { TeamSection } from "@/components/site/sections/team-section";
import { ValuesSection } from "@/components/site/sections/values-section";

export function AboutPageContent() {
  return (
    <SiteShell activePage="about">
      <PageHero icon={labels.story} label="Our Story" title="Built by Pet People, for Pet People" text="We started Jeroen & Paws because we couldn't find the kind of pet care we'd trust with our own animals. So we built it ourselves." />
      <StorySection />
      <section className="bg-[#fefce8] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.team} label="The Team" title="Meet Your Pet's New Best Friends" text="Every walker and sitter on our team is pet first aid certified, background-checked, and genuinely loves animals. No exceptions." />
          <TeamSection />
        </div>
      </section>
      <section className="bg-emerald-700 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.values} label="What We Stand For" title="Our Values" text="These aren't just words on a wall. They shape every decision we make, from who we hire to how we walk your dog." light />
          <ValuesSection />
        </div>
      </section>
      <CtaSection title="Want to Join the Pack?" text="Schedule a free meet-and-greet so we can get to know your pet. No commitment, no pressure." />
    </SiteShell>
  );
}

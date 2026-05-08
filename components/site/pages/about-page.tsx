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
      <PageHero icon={labels.story} label="About me" title="Certified care with genuine heart" text="Hi, I’m Jeroen — a certified canine specialist with over seven years of experience supporting companion and working dogs with ethical, personalised care." />
      <StorySection />
      <section className="bg-slate-950 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.team} label="Why work with me" title="Real experience, calm structure, and peace of mind" text="From police, sled, and guide dogs to family companions, every dog receives patient, clear, consistent support." />
          <TeamSection />
        </div>
      </section>
      <section className="bg-violet-700 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.values} label="What I stand for" title="Safety, understanding, and communication" text="These principles shape every walk, check-in, stay, training session, and update." light />
          <ValuesSection />
        </div>
      </section>
      <CtaSection title="Ready to book an appointment?" text="Let’s meet, understand your companion, and build a thoughtful care plan around their needs." />
    </SiteShell>
  );
}

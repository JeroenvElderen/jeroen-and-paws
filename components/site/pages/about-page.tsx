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
      <PageHero
        icon={labels.story}
        label="About me"
        title="Certified care shaped around your dog"
        text="Hi, I'm Jeroen — a certified canine specialist with over seven years of experience, providing personalised training, thoughtful care, and a safe, enriching environment."
      />
      <StorySection />
      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.team}
            label="Why work with me"
            title="Expert care that helps dogs thrive"
            text="From customised walks to structured day care and boarding, your dog receives the same consistency, dedication, and care Jeroen gives his own."
          />
          <TeamSection />
        </div>
      </section>
      <section className="border-y border-[#d1a34d]/20 bg-[#0c1017] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.values}
            label="What We Stand For"
            title="Why dogs feel supported"
            text="Training and care are built on experience, calm structure, and clear communication so every companion can feel safe and understood."
            light
          />
          <ValuesSection />
        </div>
      </section>
      <CtaSection
        title="Exceptional care starts with understanding"
        text="Book an appointment so Jeroen can learn your dog’s needs and help them feel happy, relaxed, and thriving."
      />
    </SiteShell>
  );
}

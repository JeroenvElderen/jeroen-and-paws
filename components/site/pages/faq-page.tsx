import { labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { CtaSection } from "@/components/site/sections/cta-section";
import { FaqSection } from "@/components/site/sections/faq-section";
import { PageHero } from "@/components/site/sections/page-hero";
import { SectionHeader } from "@/components/site/sections/section-header";

export function FaqPageContent() {
  return (
    <SiteShell activePage="faq">
      <PageHero
        icon={labels.faq}
        label="Questions"
        title="Expert care for dogs of every kind"
        text="Expert dog training, walks, and loving care — tailored for your best friend. Explore clear, friendly answers about training, walks, boarding, and everything in between."
      />
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.faq} label="FAQ" title="Guidance and support for every dog owner" text="Have questions? I’m here to help with practical answers before your first booking." />
          <FaqSection />
        </div>
      </section>
      <CtaSection title="Still wondering what your dog needs?" text="Send a quick message and I’ll help you choose the service or care plan that fits best." />
    </SiteShell>
  );
}

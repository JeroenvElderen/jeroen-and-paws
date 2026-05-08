import { labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { ContactForm } from "@/components/site/sections/contact-form";
import { ContactInfo } from "@/components/site/sections/contact-info";
import { CtaSection } from "@/components/site/sections/cta-section";
import { FaqSection } from "@/components/site/sections/faq-section";
import { PageHero } from "@/components/site/sections/page-hero";
import { SectionHeader } from "@/components/site/sections/section-header";

export function ContactPageContent() {
  return (
    <SiteShell activePage="contact">
      <PageHero icon={labels.process} label="Contact" title="Let’s talk about what your dog needs" text="Considering training, walks, day care, or boarding? I’m here to help your dog feel understood, supported, and set up for success." />
      <section className="bg-slate-900 px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
      <section className="bg-slate-950 px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.faq} label="Questions" title="Quick answers before you book" text="Need more detail? Email or call any time and I’ll respond within 24 hours." />
          <FaqSection />
        </div>
      </section>
      <CtaSection title="Prefer a quick hello?" text="Email or call any time, and I’ll respond within 24 hours." />
    </SiteShell>
  );
}

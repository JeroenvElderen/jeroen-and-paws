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
      <PageHero icon={labels.process} label="Get in Touch" title="Let's Talk About Your Pet" text="Tell us what your pet needs, and we'll help you choose the right care plan. First meet-and-greet is always free." />
      <section className="bg-white px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
      <section className="bg-[#fefce8] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader icon={labels.faq} label="FAQ" title="Common Questions" text="Quick answers to things pet owners ask most. Don't see your question? Reach out and we'll help." />
          <FaqSection />
        </div>
      </section>
      <CtaSection title="Your Pet Is Going to Love This" text="Book a free meet-and-greet today. No commitment, no pressure. Just a chance for us to meet your best friend." />
    </SiteShell>
  );
}

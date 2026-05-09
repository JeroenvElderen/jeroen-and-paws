import { labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import {
  ContactForm,
  type SelectedServiceDetails,
} from "@/components/site/sections/contact-form";
import { ContactInfo } from "@/components/site/sections/contact-info";
import { CtaSection } from "@/components/site/sections/cta-section";
import { FaqSection } from "@/components/site/sections/faq-section";
import { PageHero } from "@/components/site/sections/page-hero";
import { SectionHeader } from "@/components/site/sections/section-header";

export function ContactPageContent({
  selectedService,
}: {
  selectedService?: SelectedServiceDetails;
}) {
  return (
    <SiteShell activePage="contact">
      <PageHero
        icon={labels.process}
        label="Get in Touch"
        title="Let’s talk about what your dog needs"
        text="Considering training, walks, day care, or boarding? Reach out and let’s explore the options that help your dog feel understood and supported."
      />
      <section className="bg-[#111821] px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm selectedService={selectedService} />
          <ContactInfo />
        </div>
      </section>
      <section className="bg-[#080b10] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            icon={labels.faq}
            label="FAQ"
            title="Expert care for dogs of every kind"
            text="Explore clear, friendly answers about training, walks, boarding, home check-ins, and everything in between."
          />
          <FaqSection />
        </div>
      </section>
      <CtaSection
        title="Guidance and support for every dog owner"
        text="Have questions? Get in touch and Jeroen will help you choose care that suits your companion."
      />
    </SiteShell>
  );
}

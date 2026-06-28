import {
  Camera,
  CheckCircle2,
  Heart,
  PawPrint,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

import { businessInfo, labels } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import {
  ContactForm,
  type SelectedServiceDetails,
} from "@/components/site/sections/contact-form";
import { ContactInfo } from "@/components/site/sections/contact-info";
import { FaqSection } from "@/components/site/sections/faq-section";
import { ButtonLink } from "@/components/site/ui/button-link";
import { SectionLabel } from "@/components/site/ui/section-label";
import { ScrollReveal } from "@/components/site/ui/scroll-reveal";

const reassuranceItems = [
  {
    title: "Experienced",
    text: "Years of hands-on experience caring for dogs of every age, breed, and temperament.",
    icon: PawPrint,
  },
  {
    title: "Personal",
    text: "Every dog is treated with patience, kindness, and genuine one-to-one attention.",
    icon: Heart,
  },
  {
    title: "Detail Focused",
    text: "From photo updates to personalised care, every detail is considered.",
    icon: Camera,
  },
  {
    title: "Safety first",
    text: "Calm introductions, secure handling, and your dog's wellbeing always come first.",
    icon: ShieldCheck,
  },
];

export function ContactPageContent({
  selectedService,
}: {
  selectedService?: SelectedServiceDetails;
}) {
  return (
    <SiteShell activePage="contact">
      <section className="premium-hero-orb relative isolate min-h-[calc(100svh-9rem)] overflow-hidden bg-[#080b10] px-5 py-12 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:py-24 lg:flex lg:items-center lg:py-28">
        <Image
          src="/images/dogs/walkaslan.jpg"
          alt="Happy dog enjoying a calm outdoor session with Jeroen & Paws"
          fill
          priority
          sizes="100vw"
          className="premium-hero-image object-cover object-[center_74%] opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,0.9)_0%,rgba(8,11,16,0.66)_38%,rgba(8,11,16,0.18)_74%,rgba(8,11,16,0.46)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080b10] to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-xl">
            <SectionLabel icon={labels.process}>Get in touch</SectionLabel>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#fff7e8] sm:text-6xl lg:text-7xl">
              Let&apos;s get to know{" "}
              <span className="text-[#a78bfa]">your dog.</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-white sm:text-lg sm:leading-8">
              Tell me a little about your dog and what you&apos;re
              looking for. Together we&apos;ll find the care that&apos;s
              the right fit.
            </p>
            <ButtonLink href="#message" className="mt-8 sm:mt-9">
              Start the conversation
            </ButtonLink>
          </div>
        </div>
      </section>

      <section
        id="message"
        className="premium-cream-texture bg-[#f8f6f2] px-5 py-14 text-[#241832] sm:px-8 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <ScrollReveal>
            <ContactForm selectedService={selectedService} />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <ContactInfo />
          </ScrollReveal>
        </div>
      </section>
      
      <section className="premium-dark-section relative overflow-hidden bg-[#160f25] px-5 py-12 text-center sm:px-8 sm:py-16">
        <div className="absolute -right-12 bottom-0 text-[#8b5cf6]/10">
          <PawPrint aria-hidden="true" className="h-56 w-56" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#c4b5fd]">
            WHY FAMILIES CHOOSE JEROEN & PAWS
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {reassuranceItems.map(({ title, text, icon: Icon }, index) => (
              <ScrollReveal key={title} delay={index * 80}>
              <article
                key={title}
                className="motion-card motion-card-dark border-[#8b5cf6]/25 px-6 md:border-l md:first:border-l-0"
              >
                <Icon
                  aria-hidden="true"
                  className="motion-icon mx-auto h-12 w-12 text-[#a78bfa]"
                />
                <h2 className="mt-6 text-sm font-extrabold uppercase tracking-[0.2em] text-white">
                  {title}
                </h2>
                <p className="mx-auto mt-4 max-w-48 text-sm leading-7 text-[#efe7ff]">
                  {text}
                </p>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="premium-dark-section bg-[#080b10] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
              Common questions
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl">
              Helpful details before a first booking.
            </h2>
          </div>
          <ScrollReveal>
            <FaqSection />
          </ScrollReveal>
        </div>
      </section>

      <section className="premium-dark-section grid bg-[#080b10] lg:grid-cols-2">
        <ScrollReveal className="flex items-center px-5 py-12 sm:px-8 sm:py-16 lg:justify-end lg:py-24">
          <div className="w-full max-w-xl lg:pr-16">
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#fff7e8] sm:text-5xl">
              Not sure what&apos;s right for{" "}
              <span className="text-[#a78bfa]">your dog.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[#f5ead8]">
              Every dog is unique. We&apos;ll talk about their personality, routine, and what you&apos;re looking for so I can recommend the care that suits them best.
            </p>
            <ul className="mt-8 space-y-3 text-sm font-semibold text-[#f5ead8]">
              {[
                "No pressure or commitment",
                "Personal recommendations",
                "Tailored around your dog's routine",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-4 w-4 text-[#a78bfa]"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={`https://wa.me/${businessInfo.whatsappNumber}`}
              className="mt-8 sm:mt-9"
            >
              Start the Conversation
            </ButtonLink>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={120} className="motion-media premium-image-reveal relative min-h-[300px] sm:min-h-[420px] lg:min-h-[560px]">
          <Image
            src="/images/dogs/pancho/pancho2.jpeg"
            alt="Dog sitting peacefully outdoors during a Jeroen & Paws care session"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080b10]/20 to-transparent" />
        </ScrollReveal>
      </section>
    </SiteShell>
  );
}

import { CalendarDays, Heart, PawPrint } from "lucide-react";
import Image from "next/image";

import { type ServiceDetail } from "@/components/site/service-details";
import { SiteShell } from "@/components/site/layout/site-shell";
import { PricingCards } from "@/components/site/sections/pricing-section";
import { ButtonLink } from "@/components/site/ui/button-link";
import { ScrollReveal } from "@/components/site/ui/scroll-reveal";

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <SiteShell activePage="services">
      <section className="premium-hero-orb relative isolate min-h-[calc(100svh-9rem)] overflow-hidden bg-[#080b10] px-5 py-12 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:py-24 lg:py-32">
        <Image
          src={service.heroImage}
          alt={service.heroAlt}
          fill
          priority
          sizes="100vw"
          className="premium-hero-image object-cover opacity-60"
          style={{
            objectPosition: service.heroImagePosition ?? "center",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.96),rgba(8,11,16,.58),rgba(8,11,16,.18))]" />
        <div className="relative mx-auto max-w-6xl pt-0 sm:pt-8">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#c4b5fd]">
            {service.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-7xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-[#c4b5fd] sm:text-4xl">
            {service.headline}
          </p>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#f5e9d5] sm:text-lg sm:leading-8">
            {service.intro}
          </p>
          <ButtonLink href="/contact" className="mt-8 sm:mt-9">
            {service.ctaLabel}
          </ButtonLink>
        </div>
      </section>

      <section className="premium-cream-texture bg-[#f7f4ef] px-5 py-14 text-[#1d1728] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
                What&apos;s included
              </p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                {service.includedTitle}
              </h2>
              <p className="mt-5 leading-8 text-[#4f4857]">
                {service.includedIntro}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.included.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={index * 80}>
                  <article
                    className="motion-card motion-card-light rounded-3xl bg-white p-6 text-center shadow-xl shadow-black/5 ring-1 ring-[#1d1728]/5"
                  >
                    <div className="motion-icon mx-auto grid size-16 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                      <Icon aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4f4857]">
                      {item.text}
                    </p>
                  </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="premium-cream-texture bg-white px-5 py-14 text-[#1d1728] sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 border-y border-[#1d1728]/10 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
              What to expect
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              From hello to happy tails.
            </h2>
            <p className="mt-5 leading-8 text-[#4f4857]">
              Here&apos;s how {service.title.toLowerCase()} works, step by step.
            </p>
            <ol className="mt-10 space-y-7">
              {service.steps.map((step, index) => (
                <li key={step.title} className="flex gap-5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eee8f7] text-xs font-black text-[#7c3aed]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#4f4857]">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <ScrollReveal delay={120}>
            <div className="motion-media premium-image-reveal relative min-h-[300px] sm:min-h-[420px] overflow-hidden rounded-3xl shadow-2xl shadow-black/10">
              <Image
                src={service.featureImage}
                alt={service.featureAlt}
                fill
                sizes="(min-width: 1024px) 620px, 100vw"
                className="object-cover"
                style={{
                  objectPosition: service.featureImagePosition ?? "center",
                }}
              />
            </div>
            </ScrollReveal>
            <div className="motion-card motion-card-light mt-5 flex items-center gap-5 rounded-3xl bg-[#f3edf8] p-6">
              <div className="motion-icon grid size-14 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-white">
                <PawPrint aria-hidden="true" />
              </div>
              <p className="text-xl font-semibold leading-8">
                {service.subheadline}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-cream-texture bg-[#f7f4ef] px-5 py-14 text-[#1d1728] sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
              Is this service right for your dog?
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Perfect for dogs who...
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.perfectFor.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-[#4f4857]"
                >
                  <span className="grid size-5 place-items-center rounded-full bg-[#8b5cf6] text-white">
                    <Heart aria-hidden="true" className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="motion-card motion-card-light rounded-3xl border border-[#8b5cf6]/20 bg-white p-5 sm:p-8 shadow-xl shadow-black/5">
            <Heart aria-hidden="true" className="motion-icon text-[#7c3aed]" />
            <p className="mt-5 leading-8 text-[#4f4857]">
              {service.reassurance}
            </p>
            <ButtonLink
              href="/contact"
              variant="outline"
              className="mt-7 border-[#7c3aed] text-[#2d2140] hover:bg-[#eee8f7]"
            >
              Let&apos;s chat
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="premium-dark-section bg-[#080b10] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl bg-[#130f1f] shadow-2xl shadow-black/20 lg:grid lg:grid-cols-[1fr_.95fr]">
            <div className="p-5 text-[#fff7e8] sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#c4b5fd]">
                Ready to book?
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                {service.closingTitle}
              </h2>
              <p className="mt-5 max-w-lg leading-8 text-[#d8cab8]">
                {service.closingText}
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="flex gap-4">
                  <CalendarDays className="text-[#c4b5fd]" />
                  <p className="text-sm leading-6 text-[#d8cab8]">
                    <strong className="block text-[#fff7e8]">
                      Flexible scheduling
                    </strong>
                    Options available around your dog&apos;s rhythm.
                  </p>
                </div>
                <div className="flex gap-4">
                  <PawPrint className="text-[#c4b5fd]" />
                  <p className="text-sm leading-6 text-[#d8cab8]">
                    <strong className="block text-[#fff7e8]">
                      Trusted & reliable
                    </strong>
                    Professional, attentive, and experienced care.
                  </p>
                </div>
              </div>
              <ButtonLink href="/contact" className="mt-8">
                {service.ctaLabel}
              </ButtonLink>
            </div>
            <div className="bg-[#f7f4ef] p-5 sm:p-10">
              <div className="motion-card motion-card-light mb-7 rounded-3xl bg-white p-5 sm:p-7 shadow-xl shadow-black/10">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8b5cf6]">
                  Starting from
                </p>
                <p className="mt-3 text-5xl font-semibold text-[#1d1728]">
                  {service.priceFrom}
                  <span className="text-base font-medium text-[#4f4857]">
                    {" "}
                    {service.priceUnit}
                  </span>
                </p>
              </div>
              <PricingCards plans={service.plans} variant="compact" />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

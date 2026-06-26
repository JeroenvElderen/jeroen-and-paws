import { CalendarCheck, Heart, PawPrint } from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ServicesPreview } from "@/components/site/sections/services-preview";
import { Testimonials } from "@/components/site/sections/testimonials";
import { ButtonLink } from "@/components/site/ui/button-link";

const carePromises = [
  "Qualified & Experienced Care",
  "Personalised Services for Every Dog",
  "Complimentary Meet & Greet",
  "Regular Photo Updates",
];

const steps = [
  [PawPrint, "01", "Meet & Greet", "We begin with a complimentary meet-and-greet, giving us time to get to know each other and understand your dog's personality, routine, and individual needs."],
  [CalendarCheck, "02", "Plan", "Together we'll create a personalised care plan, choosing the services that best suit your dog's routine, personality, and lifestyle."],
  [Heart, "03", "Care", "While your dog enjoys calm, attentive care, you'll receive regular updates, photos, and the confidence that they're in trusted hands."],
] as const;

export function HomePage() {
  return (
    <SiteShell activePage="home">
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#080b10] px-6 py-10 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:py-10 lg:h-[calc(100svh-5rem)] lg:max-h-[calc(100svh-5rem)] lg:py-12">
        <Image
          src="/images/dogs/lakta.jpg"
          alt="A happy dog enjoying personalised care with Jeroen & Paws"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,16,.94),rgba(8,11,16,.58),rgba(8,11,16,.22))]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            Jeroen &amp; Paws
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl lg:text-6xl">
            Premium dog care for calmer days and happier tails.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#f5e9d5] sm:text-lg sm:leading-8">
            A boutique dog walking, home visit, day care, boarding, and training service shaped around your dog&apos;s character, comfort, and routine—with thoughtful updates every step of the way.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ButtonLink href="/contact">Book a Complimentary Meet &amp; Greet</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </div>
          <ul className="mt-8 grid max-w-3xl gap-3 text-sm font-bold text-[#fff7e8] sm:mt-10 sm:grid-cols-2">
            {carePromises.map((promise) => (
              <li key={promise} className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
                <PawPrint aria-hidden="true" className="h-4 w-4 shrink-0 text-[#a78bfa]" />
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[440px] overflow-hidden rounded-xl shadow-2xl shadow-black/10">
            <Image
              src="/images/dogs/ace.jpg"
              alt="Dog enjoying a calm Jeroen & Paws walk"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
              THE JEROEN & PAWS DIFFERENCE
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Considered care, designed around your dog&apos;s world.
            </h2>
            <p className="mt-6 leading-8 text-[#4f4857]">
              Every detail matters: the route we choose, the pace we set, the way your dog prefers to be greeted, and the updates you receive afterwards. Jeroen & Paws offers calm, premium care for dogs who deserve more than a standard service—and for owners who want complete confidence while they&apos;re away.
            </p>
            <ButtonLink href="/about" className="mt-8">
              Meet Jeroen
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#100d19] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
                SERVICES
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-[#fff7e8] sm:text-5xl">
                Boutique services for every kind of care day.
              </h2>
            </div>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </div>
          <div className="mt-10">
            <ServicesPreview />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-20 text-[#1d1728] sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8b5cf6]">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            Simple booking, elevated care, thoughtful updates.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map(([Icon, number, title, text]) => (
              <article key={title}>
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon aria-hidden="true" />
                </div>
                <p className="mt-5 text-xs font-black text-[#8b5cf6]">{number}</p>
                <h3 className="mt-2 font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#4f4857]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#100d19] px-6 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
              Trusted by dog owners
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-[#fff7e8] sm:text-5xl">
              Trusted by dogs. Recommended by discerning owners.
            </h2>
          </div>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

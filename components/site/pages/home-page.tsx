import {
  CalendarDays,
  Camera,
  Heart,
  MessageCircle,
  PawPrint,
  ShieldCheck,
  TreePine,
  Dog,
} from "lucide-react";
import Image from "next/image";

import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

const walkBenefits = [
  [TreePine, "Adventure", "Nature-filled walks that stimulate body and mind."],
  [ShieldCheck, "Safety First", "Leash safety, secure handling, and constant supervision."],
  [Heart, "Care & Trust", "Every dog is unique. We build real bonds with every walk."],
  [Camera, "Photo Updates", "You'll receive photos and little moments from their adventure."],
] as const;

const steps = [
  [MessageCircle, "01", "Let's Chat", "Tell me about your dog and their needs."],
  [CalendarDays, "02", "Plan Together", "We create a plan that fits your dog."],
  [Dog, "03", "Walk & Train", "Enriching walks with purpose."],
  [Heart, "04", "Happy Pup", "A tired dog, a calm mind, a happy heart."],
] as const;

export function HomePage() {
  return (
    <SiteShell activePage="home">
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#080b10] px-6 py-14 sm:min-h-[calc(100svh-5rem)] sm:px-8 lg:min-h-[760px] lg:py-20">
        <Image
          src="/images/dogs/lakta.jpg"
          alt="A happy dog enjoying personalised care with Jeroen & Paws"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] opacity-60 sm:object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(167,139,250,.26),transparent_30%),linear-gradient(90deg,rgba(8,11,16,.96),rgba(8,11,16,.72)_45%,rgba(8,11,16,.28)),linear-gradient(180deg,rgba(8,11,16,.18),rgba(8,11,16,.72))]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center pt-6 sm:pt-0">
          <p className="max-w-[15rem] text-xs font-black uppercase leading-6 tracking-[0.35em] text-[#a78bfa]">
            Dog walking &amp; training in nature
          </p>
          <h1 className="mt-6 max-w-[19rem] text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#fff7e8] sm:max-w-3xl sm:text-6xl lg:text-7xl">
            More than a walk. A <span className="text-[#a78bfa]">better life</span> for your dog.
          </h1>
          <p className="mt-7 max-w-[20rem] text-base leading-8 text-[#f5e9d5] sm:max-w-xl sm:text-lg">
            Enriching walks and training tailored to your dog&apos;s needs. Built on trust, structure, and adventure.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ButtonLink href="/contact">Book a Walk</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-14 text-[#1d1728] sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <PawPrint aria-hidden="true" className="mx-auto h-5 w-5 text-[#8b5cf6]" />
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="hidden h-px w-24 bg-[#d9d0e6] sm:block" />
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#5f5967]">
              What makes our walks different
            </p>
            <span className="hidden h-px w-24 bg-[#d9d0e6] sm:block" />
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {walkBenefits.map(([Icon, title, text]) => (
              <article key={title} className="px-4 lg:border-l lg:border-[#d9d0e6] lg:first:border-l-0">
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon aria-hidden="true" className="h-9 w-9" />
                </div>
                <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
                <p className="mx-auto mt-3 max-w-48 text-sm leading-7 text-[#4f4857]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#100d19] px-6 py-16 sm:px-8 lg:py-24">
        <Image
          src="/images/dogs/shadow.jpg"
          alt="Happy dog ready for a tailored walk"
          fill
          sizes="100vw"
          className="object-cover object-[72%_center] opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,13,25,.96),rgba(16,13,25,.72)_46%,rgba(16,13,25,.22)),linear-gradient(180deg,rgba(16,13,25,.15),rgba(16,13,25,.68))]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-[#a78bfa]">
            Tailored to your dog
          </p>
          <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-tight text-[#fff7e8] sm:text-5xl">
            Happy dogs. Balanced lives.
          </h2>
          <p className="mt-6 max-w-md text-base leading-8 text-[#f5e9d5]">
            Whether your dog needs more exercise, help with manners, or just a friend to explore with — I&apos;m here to help them thrive.
          </p>
          <ButtonLink href="/about" className="mt-8">
            Discover More
          </ButtonLink>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-6 py-14 text-[#1d1728] sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <PawPrint aria-hidden="true" className="mx-auto h-5 w-5 text-[#8b5cf6]" />
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="hidden h-px w-24 bg-[#d9d0e6] sm:block" />
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#5f5967]">
              How it works
            </p>
            <span className="hidden h-px w-24 bg-[#d9d0e6] sm:block" />
          </div>
          <div className="mt-10 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(([Icon, number, title, text]) => (
              <article key={title}>
                <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon aria-hidden="true" className="h-8 w-8" />
                </div>
                <p className="mt-5 text-xs font-black text-[#8b5cf6]">{number}</p>
                <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                <p className="mx-auto mt-3 max-w-44 text-sm leading-6 text-[#4f4857]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

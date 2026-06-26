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
      <section className="relative isolate flex min-h-[690px] overflow-hidden bg-[#080b10] px-8 pb-8 pt-36 sm:min-h-[calc(100svh-5rem)] sm:px-8 sm:py-14 lg:min-h-[760px] lg:py-20">
        <Image
          src="/images/dogs/lakta.jpg"
          alt="A happy dog enjoying personalised care with Jeroen & Paws"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] opacity-70 sm:object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(167,139,250,.26),transparent_30%),linear-gradient(90deg,rgba(8,11,16,.98),rgba(8,11,16,.74)_42%,rgba(8,11,16,.24)),linear-gradient(180deg,rgba(8,11,16,.08),rgba(8,11,16,.78))]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center pt-0">
          <p className="max-w-[17rem] whitespace-pre-line text-[13px] font-black uppercase leading-6 tracking-[0.28em] text-[#a78bfa] sm:text-xs sm:tracking-[0.35em]">
            Dog walking &amp; training
            in nature
          </p>
          <h1 className="mt-7 max-w-[20rem] whitespace-pre-line text-[2.9rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[#fff7e8] sm:max-w-3xl sm:text-6xl lg:text-7xl">
            More than
            a walk.
            A <span className="text-[#a78bfa]">better life</span>
            for your dog.
          </h1>
          <p className="mt-7 max-w-[20rem] text-[15px] leading-8 text-[#f5e9d5] sm:max-w-xl sm:text-lg">
            Enriching walks and training tailored to your dog&apos;s needs. Built on trust, structure, and adventure.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <ButtonLink href="/contact" className="w-auto rounded-[4px] bg-[#6f45ad] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl shadow-black/25 hover:bg-[#7c55ba] sm:rounded-full sm:px-7 sm:py-3 sm:text-base sm:normal-case sm:tracking-normal">Book a Walk <PawPrint aria-hidden="true" className="ml-3 h-4 w-4" /></ButtonLink>
            <ButtonLink href="/services" variant="outline" className="hidden sm:inline-flex">
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] px-8 py-14 text-[#1d1728] sm:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <PawPrint aria-hidden="true" className="mx-auto h-5 w-5 text-[#8b5cf6]" />
          <div className="mt-4 flex items-center justify-center gap-6">
            <span className="hidden h-px w-24 bg-[#d9d0e6] sm:block" />
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#5f5967]">
              What makes us different
            </p>
            <span className="hidden h-px w-24 bg-[#d9d0e6] sm:block" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-0 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {walkBenefits.map(([Icon, title, text]) => (
              <article key={title} className="border-l border-[#d9d0e6] px-3 first:border-l-0 odd:border-l-0 sm:odd:border-l sm:first:border-l-0 lg:first:border-l-0">
                <div className="mx-auto grid size-16 sm:size-20 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon aria-hidden="true" className="h-9 w-9" />
                </div>
                <h2 className="mt-5 text-xl font-semibold sm:text-2xl">{title}</h2>
                <p className="mx-auto mt-3 max-w-40 text-xs leading-6 text-[#4f4857] sm:max-w-48 sm:text-sm sm:leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[430px] overflow-hidden bg-[#100d19] px-8 py-16 sm:px-8 lg:py-24">
        <Image
          src="/images/dogs/shadow.jpg"
          alt="Happy dog ready for a tailored walk"
          fill
          sizes="100vw"
          className="object-cover object-[72%_center] opacity-60"
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
          <ButtonLink href="/about" className="mt-8 w-auto rounded-[4px] bg-[#6f45ad] px-8 py-5 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-[#7c55ba] sm:rounded-full sm:px-7 sm:py-3 sm:text-base sm:normal-case sm:tracking-normal">
            Discover More <PawPrint aria-hidden="true" className="ml-3 h-4 w-4" />
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
          <div className="mt-10 grid grid-cols-4 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(([Icon, number, title, text]) => (
              <article key={title}>
                <div className="mx-auto grid size-16 sm:size-20 place-items-center rounded-full bg-[#eee8f7] text-[#6d4b9b]">
                  <Icon aria-hidden="true" className="h-8 w-8" />
                </div>
                <p className="mt-5 text-xs font-black text-[#8b5cf6]">{number}</p>
                <h3 className="mt-3 text-base font-semibold sm:text-xl">{title}</h3>
                <p className="mx-auto mt-3 max-w-32 text-xs leading-6 text-[#4f4857] sm:max-w-44 sm:text-sm">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

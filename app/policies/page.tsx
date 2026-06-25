import { PawPrint } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { policySections } from "@/components/site/data";
import { SiteShell } from "@/components/site/layout/site-shell";
import { ButtonLink } from "@/components/site/ui/button-link";

export const metadata = {
  title: "Policies",
  description:
    "Clear booking, rescheduling, weather, image-use, gallery-delivery, and cancellation policies for Jeroen & Paws sessions.",
};

export default function PoliciesPage() {
  return (
    <SiteShell activePage="policies">
      <section className="relative isolate min-h-[560px] overflow-hidden bg-[#080b10] px-6 py-24 sm:px-8 lg:py-32">
        <Image
          src="/images/dogs/Nola/nola2.jpg"
          alt="Happy dog in a warm outdoor setting"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,11,16,0.96)_0%,rgba(8,11,16,0.82)_36%,rgba(8,11,16,0.34)_70%,rgba(8,11,16,0.72)_100%)]" />
        <div className="mx-auto flex min-h-[360px] max-w-6xl items-center">
          <div className="max-w-xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-[#a78bfa]">
              Policies
            </p>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-[#fff7e8] sm:text-6xl">
              Clear policies.
              <span className="block text-[#a78bfa]">Happy tails.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#fff7e8]">
              These policies help make each session smooth, respectful, and
              enjoyable for you and your dog.
            </p>
            <PawPrint
              className="mt-8 h-9 w-9 text-[#a78bfa]"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f8f6f3] px-6 py-12 text-[#171022] sm:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl divide-y divide-[#d8d0c8]">
          {policySections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="grid gap-8 py-10 md:grid-cols-[120px_1fr_1.25fr] md:items-center lg:gap-12"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ece7f2] text-[#21163a] md:h-24 md:w-24">
                  <Icon className="h-10 w-10" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#21163a]">
                    {section.title}
                  </h2>
                  <p className="mt-3 leading-7 text-[#2f2a3d]">
                    {section.description}
                  </p>
                </div>
                <ul className="space-y-3 border-[#d8d0c8] text-sm font-medium leading-6 text-[#2f2a3d] md:border-l md:pl-10">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b5cf6]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#160f25] px-6 py-16 sm:px-8">
        <Image
          src="/images/dogs/kaiser/kaiser2.jpeg"
          alt="Dog waiting calmly outdoors"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(22,15,37,0.98)_0%,rgba(22,15,37,0.9)_42%,rgba(22,15,37,0.35)_100%)]" />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-lg">
            <h2 className="text-4xl font-extrabold text-[#fff7e8]">
              Questions?
              <span className="block text-[#a78bfa]">I’m here to help.</span>
            </h2>
            <p className="mt-5 leading-7 text-[#fff7e8]">
              If you have any questions about these policies or your session,
              feel free to reach out. I’m happy to chat.
            </p>
            <ButtonLink href="/contact" className="mt-7">
              Send me a message
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-[#080b10] px-6 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#a78bfa] sm:flex-row sm:justify-center">
          <PawPrint className="h-7 w-7" aria-hidden="true" />
          <p className="normal-case tracking-normal text-[#fff7e8]">
            Thank you for trusting me with your story.
          </p>
          <Link href="/contact" className="hover:text-[#ddd6fe]">
            I can’t wait to meet you and your dog.
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
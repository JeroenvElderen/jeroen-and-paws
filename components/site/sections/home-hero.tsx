import { Heart } from "lucide-react";

import { stats } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function HomeHero() {
  return (
    <section className="bg-[#f8f3ff] px-6 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-purple-700 shadow-sm">
            <Heart aria-hidden="true" className="h-4 w-4 fill-amber-700 text-amber-700" />
            Trusted by 500+ Local Pet Families
          </div>
          <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            Your Dog Deserves <span className="block text-purple-700">Jeroen & Paws</span>
          </h1>
          <div className="mt-5 h-1 w-72 rounded-full bg-amber-700/70" />
          <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-700">Professional dog walking and pet sitting that actually feels like family. We treat every pup, kitten, and critter like our own. Rain or shine, your pet is in caring hands.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Book a Walk</ButtonLink>
            <ButtonLink href="/services" variant="outline">See Our Services</ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-purple-900/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-extrabold text-purple-700 sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-2xl shadow-purple-950/15 sm:min-h-[420px]">
          <PlaceholderImage alt="Professional dog walker with three happy dogs at a local park" sizes="(min-width: 1024px) 48vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

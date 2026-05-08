import { Heart } from "lucide-react";

import { stats } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function HomeHero() {
  return (
    <section className="bg-[#080b10] px-6 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#111821] px-5 py-3 text-sm font-extrabold text-[#8b5cf6] shadow-sm">
            <Heart
              aria-hidden="true"
              className="h-4 w-4 fill-[#8b5cf6] text-[#8b5cf6]"
            />
            Welcome to a place where your companion is understood
          </div>
          <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight text-[#fff7e8] sm:text-6xl">
            Exceptional care for the{" "}
            <span className="block text-[#8b5cf6]">companion you love</span>
          </h1>
          <div className="mt-5 h-1 w-72 rounded-full bg-[#8b5cf6]/70" />
          <p className="mt-7 max-w-2xl text-xl leading-9 text-[#d8cab8]">
            From engaging walks and reassuring home check-ins to enriching
            daycare, boarding, and personalised training, every service is
            designed so your companion feels safe, stimulated, and truly at
            home.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Begin your journey</ButtonLink>
            <ButtonLink href="/services" variant="outline">
              Discover more
            </ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-[#8b5cf6]/15 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-extrabold text-[#8b5cf6] sm:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#988b7b] sm:text-base">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 sm:min-h-[420px]">
          <PlaceholderImage
            alt="Professional dog walker with three happy dogs at a local park"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}

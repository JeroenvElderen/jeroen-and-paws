import { Heart } from "lucide-react";

import { stats } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";
import { PlaceholderImage } from "@/components/site/ui/placeholder-image";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-14 sm:px-8 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.24),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.16),transparent_35%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-extrabold text-violet-300 shadow-sm ring-1 ring-white/10">
            <Heart aria-hidden="true" className="h-4 w-4 fill-amber-300 text-amber-300" />
            Welcome to your companion’s second home
          </div>
          <h1 className="mt-7 text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            Exceptional care for the <span className="block text-violet-300">companion you love</span>
          </h1>
          <div className="mt-5 h-1 w-72 rounded-full bg-amber-300/70" />
          <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-300">From engaging walks and reassuring home check-ins to enriching daycare, boarding, and personalised training, we create experiences where your companion feels safe, stimulated, and truly at home.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/services">Discover more</ButtonLink>
            <ButtonLink href="/contact" variant="outline">Get in touch</ButtonLink>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-5 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-extrabold text-violet-300 sm:text-4xl">{stat.value}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-400 sm:text-base">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:min-h-[420px]">
          <PlaceholderImage alt="Clinic reception area for a veterinary clinic" sizes="(min-width: 1024px) 48vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

import { Check, ShieldCheck } from "lucide-react";

import type { PricingPlan } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";

export function PricingCards({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid gap-7 lg:grid-cols-3">
      {plans.map(({ title, description, price, unit, icon: Icon, features, featured }) => (
        <article key={title} className={`relative rounded-3xl bg-slate-900 p-8 shadow-sm ring-1 ${featured ? "ring-4 ring-violet-400" : "ring-white/10"}`}>
          {featured ? <div className="absolute right-6 top-6 rounded-full bg-amber-400/20 px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-amber-200">Popular</div> : null}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
            <Icon aria-hidden="true" className="h-6 w-6" />
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-white">{title}</h3>
          <p className="mt-3 leading-7 text-slate-300">{description}</p>
          <p className="mt-6 text-4xl font-extrabold text-violet-300">{price} <span className="text-base font-bold text-slate-400">{unit}</span></p>
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            {features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                {feature}
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" variant={featured ? "primary" : "outline"} className="mt-7 w-full">
            Book Now
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}

export function GuaranteeBanner() {
  return (
    <div className="mx-auto flex max-w-4xl gap-5 rounded-3xl bg-amber-400/10 p-7 text-left ring-1 ring-amber-400/20">
      <ShieldCheck aria-hidden="true" className="h-10 w-10 shrink-0 text-amber-300" />
      <div>
        <h3 className="text-2xl font-extrabold text-white">Satisfaction Guarantee</h3>
        <p className="mt-2 leading-7 text-slate-300">If you&apos;re not completely happy after your first booked service, we&apos;ll make it right or refund the visit. Your trust matters more than a transaction.</p>
      </div>
    </div>
  );
}

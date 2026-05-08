import { Check, ShieldCheck } from "lucide-react";

import type { PricingPlan } from "@/components/site/data";
import { ButtonLink } from "@/components/site/ui/button-link";

export function PricingCards({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="grid gap-7 lg:grid-cols-3">
      {plans.map(
        ({
          title,
          description,
          price,
          unit,
          icon: Icon,
          features,
          featured,
        }) => (
          <article
            key={title}
            className={`relative rounded-3xl bg-[#111821] p-8 shadow-sm ring-1 ${featured ? "ring-4 ring-[#8b5cf6]" : "ring-white/10"}`}
          >
            {featured ? (
              <div className="absolute right-6 top-6 rounded-full bg-[#3a2915] px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-[#a78bfa]">
                Popular
              </div>
            ) : null}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#24163f] text-[#8b5cf6]">
              <Icon aria-hidden="true" className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-[#fff7e8]">
              {title}
            </h3>
            <p className="mt-3 leading-7 text-[#b9aa99]">{description}</p>
            <p className="mt-6 text-4xl font-extrabold text-[#8b5cf6]">
              {price}{" "}
              <span className="text-base font-bold text-[#988b7b]">{unit}</span>
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[#d8cab8]">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#8b5cf6]"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <ButtonLink
              href="/contact"
              variant={featured ? "primary" : "outline"}
              className="mt-7 w-full"
            >
              Book Now
            </ButtonLink>
          </article>
        ),
      )}
    </div>
  );
}

export function GuaranteeBanner() {
  return (
    <div className="mx-auto flex max-w-4xl gap-5 rounded-3xl bg-[#17130d] p-7 text-left ring-1 ring-[#8b5cf6]/25">
      <ShieldCheck
        aria-hidden="true"
        className="h-10 w-10 shrink-0 text-[#8b5cf6]"
      />
      <div>
        <h3 className="text-2xl font-extrabold text-[#fff7e8]">
          Safety-first care promise
        </h3>
        <p className="mt-2 leading-7 text-[#b9aa99]">
          Every walk, play session, and stay uses secure equipment, attentive
          supervision, and calm introductions so your companion feels protected
          and confident.
        </p>
      </div>
    </div>
  );
}

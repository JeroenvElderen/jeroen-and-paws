import { Check, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";

import type { PricingPlan } from "@/components/site/data";
import { ServiceBookingActions } from "@/components/site/sections/service-booking-actions";

export function PricingCards({
  plans,
  variant = "default",
}: {
  plans: PricingPlan[];
  variant?: "default" | "compact";
}) {
  const isCompact = variant === "compact";

  return (
    <div
      className={clsx(
        "grid",
        isCompact ? "gap-4" : "gap-7 md:grid-cols-2 xl:grid-cols-3",
      )}
    >
      {plans.map(
        ({
          title,
          description,
          price,
          unit,
          icon: Icon,
          features,
          featured,
          badge,
          pricePrefix = "",
          priceNote,
        }) => (
          <article
            key={title}
            className={clsx(
              "motion-card motion-card-dark relative overflow-hidden rounded-3xl bg-[#111821] shadow-sm ring-1",
              isCompact ? "p-6" : "p-8",
              featured ? "premium-featured-card ring-4 ring-[#8b5cf6]" : "ring-white/10",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="motion-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#24163f] text-[#8b5cf6]">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              {featured ? (
                <div className="rounded-full bg-[#3a2915] px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-[#a78bfa]">
                  {badge || "Recommended"}
                </div>
              ) : null}
            </div>
            <h3
              className={clsx(
                "font-extrabold text-[#fff7e8]",
                isCompact ? "mt-5 text-xl" : "mt-6 text-2xl",
              )}
            >
              {title}
            </h3>
            <p
              className={clsx(
                "mt-3 text-[#b9aa99]",
                isCompact ? "leading-6" : "leading-7",
              )}
            >
              {description}
            </p>
            <p
              className={clsx(
                "font-extrabold text-[#8b5cf6]",
                isCompact ? "mt-5 text-3xl" : "mt-6 text-4xl",
              )}
            >
              {pricePrefix ? (
                <span className="text-base font-bold text-[#988b7b]">
                  {pricePrefix}
                </span>
              ) : null}
              {price}
              {unit ? (
                <>
                  {" "}
                  <span className="text-base font-bold text-[#988b7b]">
                    {unit}
                  </span>
                </>
              ) : null}
            </p>
            {priceNote ? (
              <p className="mt-2 text-sm font-semibold leading-6 text-[#988b7b]">
                {priceNote}
              </p>
            ) : null}
            <ul
              className={clsx(
                "text-sm text-[#d8cab8]",
                isCompact ? "mt-5 grid gap-2 sm:grid-cols-2" : "mt-6 space-y-3",
              )}
            >
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
            <ServiceBookingActions
              plan={{
                title,
                description,
                price,
                unit,
                features,
                featured,
                badge,
              }}
            />
          </article>
        ),
      )}
    </div>
  );
}

export function GuaranteeBanner() {
  return (
    <div className="motion-card motion-card-dark mx-auto flex max-w-4xl gap-5 rounded-3xl bg-[#17130d] p-7 text-left ring-1 ring-[#8b5cf6]/25">
      <ShieldCheck
        aria-hidden="true"
        className="motion-icon h-10 w-10 shrink-0 text-[#8b5cf6]"
      />
      <div>
        <h3 className="text-2xl font-extrabold text-[#fff7e8]">
          Safety comes first
        </h3>
        <p className="mt-2 leading-7 text-[#b9aa99]">
          Every service begins with thoughtful introductions, secure handling,
          and careful supervision. I adapt every outing to your dog&apos;s
          confidence, experience, and comfort, so they always feel safe,
          relaxed, and well cared for.
        </p>
      </div>
    </div>
  );
}

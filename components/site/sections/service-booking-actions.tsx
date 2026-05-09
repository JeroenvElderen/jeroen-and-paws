"use client";

import { useState } from "react";

import type { PricingPlan } from "@/components/site/data";
import {
  type BookingService,
  ChatOrFormModal,
} from "@/components/site/sections/chat-or-form-modal";
import { getPreferredChatUrl } from "@/utils/chat-links";

type ServiceBookingActionsProps = {
  plan: Pick<
    PricingPlan,
    "title" | "description" | "price" | "unit" | "features" | "featured"
  >;
};

const buildServiceMessage = (plan: ServiceBookingActionsProps["plan"]) =>
  [
    `Hi Jeroen, I’d like to book or ask about ${plan.title}.`,
    `Service details: ${plan.price}${plan.unit ? ` ${plan.unit}` : ""}.`,
    plan.description,
    `Included: ${plan.features.join(", ")}.`,
  ].join("\n\n");

const buildRequestFormUrl = (plan: ServiceBookingActionsProps["plan"]) => {
  const params = new URLSearchParams({
    service: plan.title,
    price: plan.price,
    unit: plan.unit,
    description: plan.description,
    features: plan.features.join(" | "),
  });

  return `/contact?${params.toString()}`;
};

export function ServiceBookingActions({ plan }: ServiceBookingActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const service: BookingService = {
    title: plan.title,
    description: plan.description,
    price: plan.price,
    unit: plan.unit,
    features: plan.features,
    chatUrl: getPreferredChatUrl(buildServiceMessage(plan)),
    formUrl: buildRequestFormUrl(plan),
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-base font-bold transition hover:-translate-y-0.5 ${
          plan.featured
            ? "bg-[#8b5cf6] text-[#080b10] shadow-lg shadow-black/25 hover:bg-[#a78bfa]"
            : "border-2 border-[#8b5cf6] text-[#c4b5fd] hover:bg-[#1f1738]"
        }`}
      >
        Book Now
      </button>
      {isOpen ? (
        <ChatOrFormModal service={service} onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
}

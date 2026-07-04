"use client";

import { type FormEvent, useRef, useState } from "react";

import type { BookingService } from "@/components/site/sections/chat-or-form-modal";

type BookingRequestFormProps = {
  service: BookingService;
  onBack: () => void;
};

const getServiceMessage = (service: BookingService) =>
  [
    `Selected service: ${service.title}`,
    service.price
      ? `Price: ${service.price}${service.unit ? ` ${service.unit}` : ""}`
      : null,
    service.description ? `Description: ${service.description}` : null,
    service.features.length
      ? `Card details: ${service.features.join(", ")}`
      : null,
    "",
    "Preferred dates/times:",
    "Pet routine or care notes:",
  ]
    .filter((line) => line !== null)
    .join("\n");

export function BookingRequestForm({ service, onBack }: BookingRequestFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(undefined);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      petName: String(formData.get("pet-name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      service: "selected-service",
      petInfo: String(formData.get("pet-info") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
      selectedServiceName: service.title,
      selectedServicePrice: service.price,
      selectedServiceUnit: service.unit,
      selectedServiceDescription: service.description,
      selectedServiceFeatures: service.features.join(" | "),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      const isSuccess = response.ok;

      setStatus({
        type: isSuccess ? "success" : "error",
        message:
          result.message ||
          (isSuccess
            ? "Thanks, your request has been sent."
            : "Sorry, we could not send your request right now. Please call, WhatsApp, or email Jeroen directly."),
      });

      if (isSuccess) {
        formRef.current?.reset();
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "Sorry, we could not send your request right now. Please call, WhatsApp, or email Jeroen directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-extrabold text-[#c4b5fd] underline-offset-4 hover:text-[#fff7e8] hover:underline"
      >
        ← Back to booking options
      </button>
      <div className="mt-5 pr-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#a78bfa]">
          Request this service
        </p>
        <h3
          id="booking-choice-heading"
          className="mt-3 text-2xl font-extrabold text-[#fff7e8] sm:text-3xl"
        >
          {service.title}
        </h3>
        <p className="mt-3 leading-7 text-[#b9aa99]">
          Send a request from here and I&apos;ll get back to you with availability.
        </p>
      </div>

      <form ref={formRef} className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <BookingField id="name" label="Your name" autoComplete="name" required />
          <BookingField id="email" label="Email address" type="email" autoComplete="email" required />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <BookingField id="phone" label="Phone or WhatsApp" type="tel" autoComplete="tel" />
          <BookingField id="pet-name" label="Dog's name" autoComplete="off" />
        </div>
        <BookingTextarea id="pet-info" label="Tell me about your dog" />
        <BookingTextarea
          id="message"
          label="Request details"
          defaultValue={getServiceMessage(service)}
          required
        />
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {status ? (
          <p
            role={status.type === "success" ? "status" : "alert"}
            aria-live={status.type === "success" ? "polite" : "assertive"}
            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
              status.type === "success"
                ? "bg-[#12271c] text-[#b7f7c8] ring-1 ring-[#49d17d]/30"
                : "bg-[#2a1216] text-[#ffc3cc] ring-1 ring-[#ef6b73]/30"
            }`}
          >
            {status.message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="motion-button inline-flex w-full items-center justify-center rounded-full bg-[#8b5cf6] px-7 py-3 text-center font-extrabold text-[#080b10] transition hover:-translate-y-0.5 hover:bg-[#a78bfa] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send request"}
        </button>
      </form>
    </div>
  );
}

type BookingFieldProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

function BookingField({ id, label, type = "text", autoComplete, required }: BookingFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        autoComplete={autoComplete}
        required={required}
        className="h-12 w-full rounded-xl border border-white/10 bg-[#0b1017] px-4 text-sm text-[#fff7e8] outline-none transition placeholder:text-[#988b7b] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/15"
      />
    </div>
  );
}

type BookingTextareaProps = {
  id: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
};

function BookingTextarea({ id, label, defaultValue, required }: BookingTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={label}
        defaultValue={defaultValue}
        required={required}
        className="min-h-28 w-full rounded-xl border border-white/10 bg-[#0b1017] px-4 py-3 text-sm leading-6 text-[#fff7e8] outline-none transition placeholder:text-[#988b7b] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/15"
      />
    </div>
  );
}
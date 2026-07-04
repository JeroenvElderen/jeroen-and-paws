"use client";

import { type FormEvent, useRef, useState } from "react";
import Link from "next/link";

export type SelectedServiceDetails = {
  service?: string;
  price?: string;
  unit?: string;
  description?: string;
  features?: string;
};

type ContactFormProps = {
  selectedService?: SelectedServiceDetails;
};

const serviceOptions = [
  {
    value: "walks-and-solo-adventures",
    label: "Walks & solo adventures (from €18)",
    matches: ["stroll", "journey"],
  },
  {
    value: "home-check-ins",
    label: "Home check-ins (from €18)",
    matches: ["home visit", "check-in"],
  },
  {
    value: "day-care-and-overnight-stays",
    label: "Day care & overnight stays (from €25)",
    matches: ["overnight", "day", "care", "stay"],
  },
  {
    value: "training",
    label: "Training help (from €35)",
    matches: ["training", "puppy"],
  },
  {
    value: "other",
    label: "Not sure yet",
    matches: ["adventure", "custom", "tailored"],
  },
];

const getServiceSelectValue = (service?: string) => {
  if (!service) return "";

  const normalizedService = service.toLowerCase();
  const matchingOption = serviceOptions.find(({ matches }) =>
    matches.some((match) => normalizedService.includes(match)),
  );

  return matchingOption?.value || "selected-service";
};

const getServiceSummary = (selectedService?: SelectedServiceDetails) => {
  if (!selectedService?.service) return "";

  return [
    `Selected service: ${selectedService.service}`,
    selectedService.price
      ? `Price: ${selectedService.price}${selectedService.unit ? ` ${selectedService.unit}` : ""}`
      : null,
    selectedService.description
      ? `Description: ${selectedService.description}`
      : null,
    selectedService.features
      ? `Card details: ${selectedService.features.replaceAll(" | ", ", ")}`
      : null,
    "",
    "Preferred dates/times:",
    "Pet routine or care notes:",
  ]
    .filter((line) => line !== null)
    .join("\n");
};

export function ContactForm({ selectedService }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedServiceValue = getServiceSelectValue(selectedService?.service);
  const hasCustomSelectedOption = selectedServiceValue === "selected-service";

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
      service: String(formData.get("service") || ""),
      petInfo: String(formData.get("pet-info") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""),
      selectedServiceName: String(formData.get("selectedServiceName") || ""),
      selectedServicePrice: String(formData.get("selectedServicePrice") || ""),
      selectedServiceUnit: String(formData.get("selectedServiceUnit") || ""),
      selectedServiceDescription: String(
        formData.get("selectedServiceDescription") || "",
      ),
      selectedServiceFeatures: String(
        formData.get("selectedServiceFeatures") || "",
      ),
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
            ? "Thanks, your message has been sent."
            : "Sorry, we could not send your message right now. Please call, WhatsApp, or email Jeroen directly."),
      });

      if (isSuccess) {
        formRef.current?.reset();
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "Sorry, we could not send your message right now. Please call, WhatsApp, or email Jeroen directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#7c3aed]">
        Send a message
      </p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#2a2040] sm:text-5xl">
        Tell me about your <span className="text-[#7c3aed]">dog?</span>
      </h2>
      <p className="mt-6 max-w-md text-base leading-8 text-[#3b314f]">
        Tell me a little about your dog, what you&apos;re looking for, and how I can help. I&apos;ll get back to you within 24 hours.
      </p>
      {selectedService?.service ? (
        <p className="mt-3 rounded-2xl bg-[#0b1017] px-4 py-3 text-sm font-semibold text-[#d8cab8] ring-1 ring-[#8b5cf6]/25">
          Request form prefilled for {selectedService.service}.
        </p>
      ) : null}
      <form ref={formRef} className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Your Name"
            id="name"
            placeholder="Your Name"
            autoComplete="name"
            required
          />
          <Field
            label="Email Address"
            id="email"
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Phone or WhatsApp"
            id="phone"
            type="tel"
            placeholder="Phone or WhatsApp"
            autoComplete="tel"
            inputMode="tel"
          />
          <div>
            <label htmlFor="service" className="sr-only">
              Service Interested In
            </label>
            <select
              id="service"
              name="service"
              defaultValue={selectedServiceValue}
              className="h-14 w-full rounded-md border border-[#ded8e8] bg-white/60 px-4 py-0 text-sm text-[#3b314f] outline-none transition focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/15"
            >
              <option value="" disabled>
                Which service are you interested in?
              </option>
              {serviceOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
              {hasCustomSelectedOption ? (
                <option value="selected-service">
                  {selectedService?.service}
                </option>
              ) : null}
            </select>
          </div>
        </div>
        <Textarea
          label="Tell me about your dog"
          id="pet-info"
          placeholder="Tell me about your dog"
        />
        <Textarea
          label="Anything else you'd like me to know?"
          id="message"
          placeholder="Anything else you'd like me to know?"
          defaultValue={getServiceSummary(selectedService)}
          required
        />
        <input
          type="hidden"
          name="selectedServiceName"
          value={selectedService?.service || ""}
        />
        <input
          type="hidden"
          name="selectedServicePrice"
          value={selectedService?.price || ""}
        />
        <input
          type="hidden"
          name="selectedServiceUnit"
          value={selectedService?.unit || ""}
        />
        <input
          type="hidden"
          name="selectedServiceDescription"
          value={selectedService?.description || ""}
        />
        <input
          type="hidden"
          name="selectedServiceFeatures"
          value={selectedService?.features || ""}
        />
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
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
        <p className="text-sm leading-6 text-[#6b6277]">
          By submitting this form, you agree that Jeroen & Paws may use your details to respond to your enquiry in accordance with the{" "}
          <Link
            href="/privacy"
            className="font-bold text-[#7c3aed] hover:text-[#5b21b6]"
          >
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="motion-button w-full rounded-md bg-[#6d3fa0] px-8 py-4 sm:w-auto text-xs font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="w-full rounded-md border border-[#ded8e8] bg-white/60 px-4 py-4 text-base sm:text-sm text-[#3b314f] outline-none transition placeholder:text-[#6b6277] focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/15"
      />
    </div>
  );
}

function Textarea({
  label,
  id,
  placeholder,
  defaultValue = "",
  required = false,
}: {
  label: string;
  id: string;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="min-h-28 w-full rounded-md border border-[#ded8e8] bg-white/60 px-4 py-4 text-base sm:text-sm text-[#3b314f] outline-none transition placeholder:text-[#6b6277] focus:border-[#7c3aed] focus:ring-4 focus:ring-[#7c3aed]/15"
      />
    </div>
  );
}

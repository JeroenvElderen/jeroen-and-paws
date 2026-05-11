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
    value: "other",
    label: "Not sure yet",
    matches: ["adventure", "custom", "tailored"],
  },
  {
    value: "training",
    label: "Training help (from €35)",
    matches: ["training", "puppy"],
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
    <div className="rounded-3xl bg-[#111821] p-8 shadow-sm ring-1 ring-white/10">
      <h2 className="text-3xl font-extrabold text-[#fff7e8]">
        Book a Free Meet &amp; Greet
      </h2>
      {selectedService?.service ? (
        <p className="mt-3 rounded-2xl bg-[#0b1017] px-4 py-3 text-sm font-semibold text-[#d8cab8] ring-1 ring-[#8b5cf6]/25">
          Request form prefilled for {selectedService.service}.
        </p>
      ) : null}
      <ol className="mt-6 grid gap-3 text-sm font-semibold text-[#d8cab8] sm:grid-cols-3">
        <li className="rounded-2xl bg-[#0b1017] px-4 py-3">
          1. Send your details
        </li>
        <li className="rounded-2xl bg-[#0b1017] px-4 py-3">
          2. Get a reply within 24 hours
        </li>
        <li className="rounded-2xl bg-[#0b1017] px-4 py-3">
          3. Arrange a calm meet-and-greet
        </li>
      </ol>
      <form ref={formRef} className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your Name" id="name" placeholder="Jane Doe" required />
          <Field label="Pet's Name" id="pet-name" placeholder="Kaiser" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="jane@example.com"
            required
          />
          <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="+353 87 247 3099"
          />
        </div>
        <div>
          <label
            htmlFor="service"
            className="text-sm font-extrabold text-[#d8cab8]"
          >
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            defaultValue={selectedServiceValue}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1017] px-4 py-3 text-[#d8cab8] outline-none transition focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20"
          >
            <option value="" disabled>
              Select a service
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
        <Textarea
          label="Tell Us About Your Pet"
          id="pet-info"
          placeholder="Pet name, breed, age, any special needs or behavioral notes..."
        />
        <Textarea
          label="Anything Else?"
          id="message"
          placeholder="Questions, scheduling preferences, routines..."
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
        <p className="text-sm leading-6 text-[#988b7b]">
          By submitting, you agree that Jeroen & Paws may use your details to
          respond to your enquiry and prepare a safe care plan. Read the{" "}
          <Link
            href="/privacy"
            className="font-bold text-[#c4b5fd] hover:text-[#ddd6fe]"
          >
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#8b5cf6] px-7 py-3 font-extrabold text-[#080b10] transition hover:bg-[#a78bfa] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
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
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-extrabold text-[#d8cab8]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1017] px-4 py-3 text-[#d8cab8] outline-none transition placeholder:text-[#7f7366] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20"
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
      <label htmlFor={id} className="text-sm font-extrabold text-[#d8cab8]">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 min-h-28 w-full rounded-2xl border border-white/10 bg-[#0b1017] px-4 py-3 text-[#d8cab8] outline-none transition placeholder:text-[#7f7366] focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20"
      />
    </div>
  );
}

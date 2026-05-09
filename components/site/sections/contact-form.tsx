"use client";

import { type FormEvent, useState } from "react";

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
    value: "daily-strolls",
    label: "Daily strolls (from €18)",
    matches: ["stroll"],
  },
  {
    value: "home-check-ins",
    label: "Home check-ins (from €18)",
    matches: ["home visit", "check-in"],
  },
  {
    value: "overnight",
    label: "Overnight stays (from €70/night)",
    matches: ["overnight"],
  },
  {
    value: "other",
    label: "Not sure yet",
    matches: ["adventure", "custom", "journey", "tailored"],
  },
  {
    value: "daytime-care",
    label: "Daytime care (from €25)",
    matches: ["day", "care", "stay"],
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
      selectedServiceName: selectedService?.service || "",
      selectedServicePrice: selectedService?.price || "",
      selectedServiceUnit: selectedService?.unit || "",
      selectedServiceDescription: selectedService?.description || "",
      selectedServiceFeatures: selectedService?.features || "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      setStatus({
        type: response.ok ? "success" : "error",
        message:
          result.message ||
          (response.ok
            ? "Thanks, your message has been sent."
            : "Sorry, we could not send your message right now."),
      });
    } catch {
      setStatus({
        type: "error",
        message: "Sorry, we could not send your message right now.",
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
      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
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
              <option value="selected-service">{selectedService?.service}</option>
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
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        {status ? (
          <p
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

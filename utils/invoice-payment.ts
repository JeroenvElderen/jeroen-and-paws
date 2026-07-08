export type InvoiceTitleInput = {
  invoiceNumber?: string;
  dogNames: string[];
  serviceName: string;
  durationMinutes?: number | null;
  billingDays?: number | null;
};

const servicesWithoutDuration = ["boarding", "day care", "daycare"];

export function buildInvoicePaymentTitle({ invoiceNumber, dogNames, serviceName, durationMinutes, billingDays }: InvoiceTitleInput) {
  const dogTitle = dogNames.filter(Boolean).join(", ") || "Dog";
  const service = serviceName.trim() || "Service";
  const serviceKey = service.toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  const parts = [invoiceNumber?.trim(), dogTitle, service].filter(Boolean);

  if (durationMinutes && !servicesWithoutDuration.includes(serviceKey)) {
    parts.push(`${durationMinutes}min`);
  }

  if (billingDays && billingDays > 0) {
    parts.push(`${billingDays} ${billingDays === 1 ? "day" : "days"}`);
  }

  return parts.join(" - ");
}

export function buildInvoiceWhatsappMessage(input: { clientName: string; invoiceNumber: string; amount: string; paymentTitle: string; paymentUrl: string; dogNames?: string }) {
  // Edit the lines below to adjust the WhatsApp invoice message text.
  // Keep the placeholders (input.clientName, input.paymentUrl, etc.) where you want invoice details inserted.
  const rawDogNames = input.dogNames || input.paymentTitle;
const isMultipleDogs = rawDogNames.includes(",");
const dogNames = rawDogNames.replace(/,\s*([^,]+)$/, " & $1");

  return [
    "Hiya!",
    "",
    `Hope your Friday is going well and ${dogNames} ${isMultipleDogs ? "are" : "is"} looking forward for the weekend.`,
    "",
    "This weeks payment link:",
    input.paymentUrl,
    "",
    `Wishing you a wonderful weekend and lots of hugs to ${dogNames}!`
  ].join("\n");
}
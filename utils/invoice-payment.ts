export type InvoiceTitleInput = {
  dogNames: string[];
  serviceName: string;
  durationMinutes?: number | null;
  billingDays?: number | null;
};

const servicesWithoutDuration = ["boarding", "day care", "daycare"];

export function buildInvoicePaymentTitle({ dogNames, serviceName, durationMinutes, billingDays }: InvoiceTitleInput) {
  const dogTitle = dogNames.filter(Boolean).join(", ") || "Dog";
  const service = serviceName.trim() || "Service";
  const serviceKey = service.toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  const parts = [dogTitle, service];

  if (durationMinutes && !servicesWithoutDuration.includes(serviceKey)) {
    parts.push(`${durationMinutes}min`);
  }

  if (billingDays && billingDays > 0) {
    parts.push(`${billingDays} ${billingDays === 1 ? "day" : "days"}`);
  }

  return parts.join(" - ");
}

export function buildInvoiceWhatsappMessage(input: { clientName: string; invoiceNumber: string; amount: string; paymentTitle: string; paymentUrl: string }) {
  return [
    `Hi ${input.clientName || "there"},`,
    "",
    `Your Jeroen & Paws invoice is ready: ${input.paymentTitle}.`,
    `Invoice: ${input.invoiceNumber}`,
    `Amount: ${input.amount}`,
    "",
    `You can pay securely via Revolut here: ${input.paymentUrl}`,
    "",
    "Thank you!",
    "Jeroen",
  ].join("\n");
}
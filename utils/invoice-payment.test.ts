import { describe, expect, it } from "vitest";

import { buildInvoicePaymentTitle, buildInvoiceWhatsappMessage } from "./invoice-payment";

describe("invoice payment helpers", () => {
  it("builds a weekly walk payment title with duration and days", () => {
    expect(buildInvoicePaymentTitle({ invoiceNumber: "INV-2026-0001", dogNames: ["Bowie"], serviceName: "Walk", durationMinutes: 60, billingDays: 5 })).toBe("INV-2026-0001 - Bowie - Walk - 60min - 5 days");
  });

  it("omits duration for boarding and day care", () => {
    expect(buildInvoicePaymentTitle({ invoiceNumber: "INV-2026-0002", dogNames: ["Lola"], serviceName: "Boarding", durationMinutes: 60, billingDays: 2 })).toBe("INV-2026-0002 - Lola - Boarding - 2 days");
    expect(buildInvoicePaymentTitle({ invoiceNumber: "INV-2026-0003", dogNames: ["Nola"], serviceName: "Day care", durationMinutes: 30, billingDays: 1 })).toBe("INV-2026-0003 - Nola - Day care - 1 day");
  });

  it("includes the Revolut payment URL in the WhatsApp message", () => {
    expect(buildInvoiceWhatsappMessage({ clientName: "Sam", invoiceNumber: "INV-1", amount: "€10.00", paymentTitle: "Bowie - Walk - 60min - 1 day", paymentUrl: "https://checkout.revolut.com/payment-link/abc" })).toContain("https://checkout.revolut.com/payment-link/abc");
  });
});
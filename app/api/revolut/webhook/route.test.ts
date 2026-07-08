import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";
import { getRevolutWebhookSignature } from "@/utils/revolut/webhook";
import { supabaseAdmin } from "@/utils/supabase-admin";

vi.mock("@/utils/supabase-admin", () => ({
  supabaseAdmin: { from: vi.fn() },
}));

const signingSecret = "wsk_test_secret";
const fixedTimestamp = "1783512000000";

function signedRequest(payload: Record<string, unknown>, signatureOverride?: string) {
  const rawBody = JSON.stringify(payload);
  const signature = signatureOverride ?? getRevolutWebhookSignature({ rawBody, timestamp: fixedTimestamp, signingSecret });

  return new Request("https://example.com/api/revolut/webhook", {
    method: "POST",
    headers: {
      "revolut-request-timestamp": fixedTimestamp,
      "revolut-signature": signature,
    },
    body: rawBody,
  });
}

function mockInvoiceLookup(invoice: Record<string, unknown> | null) {
  const maybeSingle = vi.fn().mockResolvedValue({ data: invoice, error: null });
  const eq = vi.fn(() => ({ maybeSingle }));
  const select = vi.fn(() => ({ eq }));
  vi.mocked(supabaseAdmin.from).mockReturnValueOnce({ select } as never);

  return { select, eq, maybeSingle };
}

function mockInvoiceUpdate() {
  const inFilter = vi.fn().mockResolvedValue({ error: null });
  const eq = vi.fn(() => ({ in: inFilter }));
  const update = vi.fn(() => ({ eq }));
  vi.mocked(supabaseAdmin.from).mockReturnValueOnce({ update } as never);

  return { update, eq, inFilter };
}

describe("POST /api/revolut/webhook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Number(fixedTimestamp)));
    vi.clearAllMocks();
    process.env.REVOLUT_WEBHOOK_SIGNING_SECRET = signingSecret;
  });

  it("marks a matching invoice paid for a valid ORDER_COMPLETED webhook", async () => {
    mockInvoiceLookup({ id: "invoice-1", status: "sent", invoice_number: "INV-1", payment_reference: "INV-1" });
    const update = mockInvoiceUpdate();

    const response = await POST(signedRequest({ event: "ORDER_COMPLETED", order_id: "order-1", merchant_order_ext_ref: "INV-1", created_at: "2026-07-08T12:00:00.000Z" }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ matched: true, updated: true, invoiceId: "invoice-1", matchType: "revolut_order_id" });
    expect(update.update).toHaveBeenCalledWith(expect.objectContaining({ status: "paid", paid_on: "2026-07-08T12:00:00.000Z", revolut_transaction_id: "order-1" }));
    expect(update.eq).toHaveBeenCalledWith("id", "invoice-1");
  });

  it("rejects a webhook with an invalid signature", async () => {
    const response = await POST(signedRequest({ event: "ORDER_COMPLETED", order_id: "order-1" }, "v1=bad"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ error: "Invalid Revolut webhook signature." });
    expect(supabaseAdmin.from).not.toHaveBeenCalled();
  });

  it("treats a repeated paid invoice webhook as a safe duplicate", async () => {
    mockInvoiceLookup({ id: "invoice-1", status: "paid", invoice_number: "INV-1", payment_reference: "INV-1" });

    const response = await POST(signedRequest({ event: "ORDER_COMPLETED", order_id: "order-1", merchant_order_ext_ref: "INV-1" }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ matched: true, duplicate: true, invoiceId: "invoice-1" });
    expect(supabaseAdmin.from).toHaveBeenCalledTimes(1);
  });
});

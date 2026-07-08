import { createHmac, timingSafeEqual } from "crypto";

export const revolutWebhookToleranceMs = 5 * 60 * 1000;

export type RevolutWebhookPayload = {
  event?: string;
  order_id?: string;
  merchant_order_ext_ref?: string;
  [key: string]: unknown;
};

export function getRevolutWebhookSignature({ rawBody, timestamp, signingSecret }: { rawBody: string; timestamp: string; signingSecret: string }) {
  const payloadToSign = `v1.${timestamp}.${rawBody}`;
  const digest = createHmac("sha256", signingSecret).update(payloadToSign, "utf8").digest("hex");

  return `v1=${digest}`;
}

function signaturesMatch(expected: string, candidate: string) {
  const expectedBuffer = Buffer.from(expected, "utf8");
  const candidateBuffer = Buffer.from(candidate, "utf8");

  return expectedBuffer.length === candidateBuffer.length && timingSafeEqual(expectedBuffer, candidateBuffer);
}

export function verifyRevolutWebhookSignature({ rawBody, timestamp, signatureHeader, signingSecret, now = Date.now() }: { rawBody: string; timestamp: string | null; signatureHeader: string | null; signingSecret: string; now?: number }) {
  if (!timestamp || !signatureHeader || !signingSecret) return false;

  const timestampMs = Number(timestamp);
  if (!Number.isFinite(timestampMs) || Math.abs(now - timestampMs) > revolutWebhookToleranceMs) return false;

  const expectedSignature = getRevolutWebhookSignature({ rawBody, timestamp, signingSecret });
  const signatures = signatureHeader.split(",").map((value) => value.trim()).filter(Boolean);

  return signatures.some((signature) => signaturesMatch(expectedSignature, signature));
}

export function getRevolutWebhookOrderId(payload: RevolutWebhookPayload) {
  const orderId = typeof payload.order_id === "string" ? payload.order_id.trim() : "";
  if (orderId) return orderId;

  const order = payload.order;
  if (order && typeof order === "object") {
    const candidate = (order as { id?: unknown }).id;
    return typeof candidate === "string" ? candidate.trim() : "";
  }

  return "";
}

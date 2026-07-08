import { createHmac, timingSafeEqual } from "crypto";

export const revolutWebhookToleranceMs = 5 * 60 * 1000;

export type RevolutWebhookPayload = {
  event?: string;
  type?: string;
  order_id?: string;
  merchant_order_ext_ref?: string;
  reference?: string;
  data?: unknown;
  order?: unknown;
  [key: string]: unknown;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

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
  const orderId = cleanString(payload.order_id);
  if (orderId) return orderId;

  const data = getRecord(payload.data);
  const dataOrderId = cleanString(data?.order_id || data?.id);
  if (dataOrderId) return dataOrderId;

  const order = getRecord(payload.order) || getRecord(data?.order);
  const candidate = cleanString(order?.id || order?.order_id);
  if (candidate) return candidate;

  return "";
}

export function getRevolutWebhookReference(payload: RevolutWebhookPayload) {
  const directReference = cleanString(payload.merchant_order_ext_ref || payload.reference);
  if (directReference) return directReference;

  const data = getRecord(payload.data);
  const dataReference = cleanString(data?.merchant_order_ext_ref || data?.reference);
  if (dataReference) return dataReference;

  const order = getRecord(payload.order) || getRecord(data?.order);
  const orderReference = cleanString(order?.merchant_order_ext_ref || order?.reference);
  if (orderReference) return orderReference;

  const merchantOrderData = getRecord(order?.merchant_order_data) || getRecord(data?.merchant_order_data);
  return cleanString(merchantOrderData?.reference);
}

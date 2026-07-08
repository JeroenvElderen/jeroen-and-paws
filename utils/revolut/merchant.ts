type RevolutOrderResponse = {
  id?: string;
  checkout_url?: string;
  token?: string;
  state?: string;
  [key: string]: unknown;
};

export type CreateRevolutOrderInput = {
  amountCents: number;
  currency: string;
  description: string;
  reference: string;
  customerEmail?: string | null;
  redirectUrl?: string | null;
};

function getMerchantBaseUrl() {
  return (process.env.REVOLUT_MERCHANT_API_URL || "https://merchant.revolut.com/api").replace(/\/$/, "");
}

export async function createRevolutMerchantOrder(input: CreateRevolutOrderInput) {
  const apiKey = process.env.REVOLUT_MERCHANT_API_KEY;
  if (!apiKey) return { configured: false as const };

  const body: Record<string, unknown> = {
    amount: input.amountCents,
    currency: input.currency,
    description: input.description,
    merchant_order_data: { reference: input.reference },
  };

  if (input.customerEmail) body.customer = { email: input.customerEmail };
  if (input.redirectUrl) body.redirect_url = input.redirectUrl;

  const response = await fetch(`${getMerchantBaseUrl()}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Revolut-Api-Version": process.env.REVOLUT_MERCHANT_API_VERSION || "2024-09-01",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => null)) as RevolutOrderResponse | null;
  if (!response.ok) {
    const message = typeof data?.message === "string" ? data.message : `Revolut order creation failed with status ${response.status}.`;
    throw new Error(message);
  }

  return {
    configured: true as const,
    orderId: data?.id || null,
    checkoutUrl: data?.checkout_url || null,
    state: data?.state || null,
    raw: data,
  };
}
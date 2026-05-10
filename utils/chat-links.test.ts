import { describe, expect, it, vi } from "vitest";

import { getPreferredChatUrl, getWhatsappClickToChatUrl } from "./chat-links";

describe("chat links", () => {
  it("normalizes formatted phone numbers for WhatsApp", () => {
    expect(getWhatsappClickToChatUrl("+353 87 247 3099", "Hello Jeroen")).toBe(
      "https://wa.me/353872473099?text=Hello%20Jeroen",
    );
  });

  it("uses configured WhatsApp numbers with prefilled text", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "+353 87 000 0000");

    expect(getPreferredChatUrl("Daily stroll")).toBe(
      "https://wa.me/353870000000?text=Daily%20stroll",
    );

    vi.unstubAllEnvs();
  });
});

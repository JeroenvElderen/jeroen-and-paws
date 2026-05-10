const normalizePhoneNumber = (phoneNumber: string) =>
  phoneNumber
    .replace(/[^\d+]/g, "")
    .replace(/^\+/, "")
    .replace(/^00/, "");

export const getWhatsappClickToChatUrl = (
  phoneNumber: string | undefined,
  message?: string,
) => {
  if (!phoneNumber) return null;

  const normalizedNumber = normalizePhoneNumber(phoneNumber);
  const formattedMessage = message
    ? `?text=${encodeURIComponent(message)}`
    : "";

  return `https://wa.me/${normalizedNumber}${formattedMessage}`;
};

const DEFAULT_WHATSAPP_NUMBER = "00353872473099";
const getConfiguredWhatsappNumber = () =>
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

const getConfiguredChatUrl = (message?: string) => {
  if (!process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL) return null;

  if (!message) return process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL;

  try {
    const url = new URL(process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL);
    if (url.hostname.includes("wa.me") || url.hostname.includes("whatsapp")) {
      url.searchParams.set("text", message);
      return url.toString();
    }
  } catch {
    return process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL;
  }

  return process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL;
};

const DEFAULT_WHATSAPP_CHAT_URL = getWhatsappClickToChatUrl(
  DEFAULT_WHATSAPP_NUMBER,
);

export const getPreferredChatUrl = (message?: string) =>
  getConfiguredChatUrl(message) ||
  process.env.NEXT_PUBLIC_LIVE_CHAT_URL ||
  getWhatsappClickToChatUrl(getConfiguredWhatsappNumber(), message) ||
  DEFAULT_WHATSAPP_CHAT_URL ||
  "/contact";

export const getWhatsappChatUrl = (message?: string) =>
  getConfiguredChatUrl(message) ||
  getWhatsappClickToChatUrl(getConfiguredWhatsappNumber(), message) ||
  DEFAULT_WHATSAPP_CHAT_URL;

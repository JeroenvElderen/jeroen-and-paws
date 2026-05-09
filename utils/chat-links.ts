const normalizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/^\+/, "").replace(/^00/, "");

export const getWhatsappClickToChatUrl = (
  phoneNumber: string | undefined,
  message?: string,
) => {
  if (!phoneNumber) return null;

  const normalizedNumber = normalizePhoneNumber(phoneNumber);
  const formattedMessage = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${normalizedNumber}${formattedMessage}`;
};

const DEFAULT_WHATSAPP_NUMBER = "00353872473099";
const DEFAULT_WHATSAPP_CHAT_URL = getWhatsappClickToChatUrl(
  DEFAULT_WHATSAPP_NUMBER,
);

export const getPreferredChatUrl = (message?: string) =>
  process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL ||
  process.env.NEXT_PUBLIC_LIVE_CHAT_URL ||
  getWhatsappClickToChatUrl(DEFAULT_WHATSAPP_NUMBER, message) ||
  DEFAULT_WHATSAPP_CHAT_URL ||
  "/contact";

export const getWhatsappChatUrl = (message?: string) =>
  process.env.NEXT_PUBLIC_WHATSAPP_CHAT_URL ||
  getWhatsappClickToChatUrl(DEFAULT_WHATSAPP_NUMBER, message) ||
  DEFAULT_WHATSAPP_CHAT_URL;

const BIRD_SMS_URL = "https://eu1.platform.bird.com/v1/sms/messages";

type BirdSmsResponse = {
  status?: string;
  message?: string;
  errors?: Array<{ message?: string }>;
};

export async function sendOtpSms(phone: string, code: string) {
  const accessKey = process.env.BIRD_ACCESS_KEY?.trim();
  if (!accessKey) throw new Error("SMS delivery is not configured.");

  let response: Response;
  try {
    response = await fetch(BIRD_SMS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: phone,
        template: {
          name: "bird_otp_verification",
          parameters: { code },
        },
      }),
    });
  } catch (error) {
    console.error("Bird SMS request could not be completed", { error, recipient: phone });
    throw new Error("Unable to send the security code right now. Please try again.");
  }

  const text = await response.text();

let payload: BirdSmsResponse = {};
try {
  payload = JSON.parse(text);
} catch {
  // Response wasn't JSON
}

if (!response.ok) {
  console.error("Bird SMS request failed", {
    status: response.status,
    body: text,
    recipient: phone,
  });

  throw new Error("Unable to send the security code right now. Please try again.");
}

console.info("Bird SMS request accepted", {
  status: payload.status,
  body: text,
  recipient: phone,
});
}
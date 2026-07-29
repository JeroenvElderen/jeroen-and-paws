type BirdVerification = {
  id?: string;
  status?: string;
  message?: string;
  errors?: Array<{ message?: string }>;
};

function getBirdConfig() {
  const accessKey = process.env.BIRD_ACCESS_KEY;
  const workspaceId = process.env.BIRD_WORKSPACE_ID;
  if (!accessKey?.startsWith("bk_") || !workspaceId) {
    throw new Error("Bird Verify is not configured.");
  }
  return { accessKey, workspaceId };
}

async function birdRequest(path: string, body: Record<string, unknown>) {
  const { accessKey, workspaceId } = getBirdConfig();
  const response = await fetch(`https://api.bird.com/workspaces/${encodeURIComponent(workspaceId)}/verify${path}`, {
    method: "POST",
    headers: {
      Authorization: `AccessKey ${accessKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as BirdVerification;
  if (!response.ok) {
    const message = payload.errors?.[0]?.message || payload.message;
    console.error("Bird Verify request failed", { status: response.status, message });
    throw new Error("Unable to send or verify the security code right now.");
  }
  return payload;
}

export async function sendBirdOtp(phone: string) {
  const payload = await birdRequest("", {
    recipient: phone,
    type: "sms",
    timeout: 300,
    codeLength: 6,
    maxAttempts: 5,
  });
  if (!payload.id) throw new Error("Bird did not return a verification ID.");
  return payload.id;
}

export async function verifyBirdOtp(verificationId: string, code: string) {
  const payload = await birdRequest(`/${encodeURIComponent(verificationId)}`, { code });
  return payload.status === "verified";
}
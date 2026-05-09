type MicrosoftGraphEmailConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  senderEmail: string;
};

type SendMicrosoftGraphEmailInput = {
  to: string;
  replyTo: string;
  replyToName: string;
  subject: string;
  text: string;
};

type MicrosoftTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type MicrosoftGraphErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
};

const MICROSOFT_GRAPH_SCOPE = "https://graph.microsoft.com/.default";

const getAccessToken = async ({
  tenantId,
  clientId,
  clientSecret,
}: MicrosoftGraphEmailConfig) => {
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: MICROSOFT_GRAPH_SCOPE,
  });

  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  const result = (await response.json()) as MicrosoftTokenResponse;

  if (!response.ok || !result.access_token) {
    throw new Error(
      result.error_description ||
        result.error ||
        "Could not get a Microsoft Graph access token.",
    );
  }

  return result.access_token;
};

const getGraphErrorMessage = async (response: Response) => {
  try {
    const result = (await response.json()) as MicrosoftGraphErrorResponse;
    return result.error?.message || result.error?.code;
  } catch {
    return undefined;
  }
};

export async function sendMicrosoftGraphEmail(
  config: MicrosoftGraphEmailConfig,
  input: SendMicrosoftGraphEmailInput,
) {
  const accessToken = await getAccessToken(config);
  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      config.senderEmail,
    )}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: input.subject,
          body: {
            contentType: "Text",
            content: input.text,
          },
          toRecipients: [
            {
              emailAddress: {
                address: input.to,
              },
            },
          ],
          replyTo: [
            {
              emailAddress: {
                address: input.replyTo,
                name: input.replyToName,
              },
            },
          ],
        },
        saveToSentItems: false,
      }),
    },
  );

  if (!response.ok) {
    const graphMessage = await getGraphErrorMessage(response);
    throw new Error(graphMessage || "Microsoft Graph could not send the email.");
  }
}

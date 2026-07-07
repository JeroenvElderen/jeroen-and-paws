type MicrosoftGraphCalendarConfig = {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  calendarEmail: string;
};

type MicrosoftTokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

type GraphErrorResponse = { error?: { code?: string; message?: string } };
type GraphCalendarViewResponse = {
  value?: OutlookCalendarEvent[];
  "@odata.nextLink"?: string;
};

export type OutlookCalendarEvent = {
  id: string;
  subject?: string;
  bodyPreview?: string;
  webLink?: string;
  iCalUId?: string;
  changeKey?: string;
  isCancelled?: boolean;
  sensitivity?: string;
  start?: { dateTime?: string; timeZone?: string };
  end?: { dateTime?: string; timeZone?: string };
  location?: { displayName?: string };
};

export type OutlookEventInput = {
  subject: string;
  body: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  location?: string;
};

const MICROSOFT_GRAPH_SCOPE = "https://graph.microsoft.com/.default";
const FETCH_TIMEOUT_MS = 12000;
const TOKEN_EXPIRY_BUFFER_MS = 60_000;

let cachedToken: { key: string; accessToken: string; expiresAt: number } | undefined;

const fetchWithTimeout = async (url: string, init: RequestInit) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const getCacheKey = ({ tenantId, clientId }: MicrosoftGraphCalendarConfig) => `${tenantId}:${clientId}`;

async function getAccessToken(config: MicrosoftGraphCalendarConfig) {
  const cacheKey = getCacheKey(config);

  if (cachedToken?.key === cacheKey && cachedToken.expiresAt - TOKEN_EXPIRY_BUFFER_MS > Date.now()) {
    return cachedToken.accessToken;
  }

  const body = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "client_credentials",
    scope: MICROSOFT_GRAPH_SCOPE,
  });

  const response = await fetchWithTimeout(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const result = (await response.json()) as MicrosoftTokenResponse;

  if (!response.ok || !result.access_token) {
    throw new Error(result.error_description || result.error || "Could not get a Microsoft Graph access token.");
  }

  cachedToken = {
    key: cacheKey,
    accessToken: result.access_token,
    expiresAt: Date.now() + (result.expires_in || 3600) * 1000,
  };

  return result.access_token;
}

async function getGraphErrorMessage(response: Response) {
  try {
    const result = (await response.json()) as GraphErrorResponse;
    return result.error?.message || result.error?.code;
  } catch {
    return undefined;
  }
}

function buildEventPayload(input: OutlookEventInput) {
  return {
    subject: input.subject,
    body: { contentType: "Text", content: input.body },
    start: { dateTime: input.startsAt, timeZone: input.timezone },
    end: { dateTime: input.endsAt, timeZone: input.timezone },
    location: { displayName: input.location || "Location to be confirmed" },
    showAs: "busy",
  };
}

async function graphFetchUrl(config: MicrosoftGraphCalendarConfig, url: string, init: RequestInit = {}) {
  const accessToken = await getAccessToken(config);
  const response = await fetchWithTimeout(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error((await getGraphErrorMessage(response)) || `Microsoft Graph returned ${response.status}.`);
  }

  if (response.status === 204) return null;

  return response.json();
}

async function graphFetch(config: MicrosoftGraphCalendarConfig, path: string, init: RequestInit = {}) {
  return graphFetchUrl(config, `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.calendarEmail)}${path}`, init);
}

export function getGraphCalendarConfig() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const calendarEmail = process.env.OUTLOOK_CALENDAR_EMAIL || process.env.NEXT_PUBLIC_OUTLOOK_CALENDAR_EMAIL || process.env.JEROEN_AND_PAWS_EMAIL;

  if (!tenantId || !clientId || !clientSecret || !calendarEmail) return null;

  return { tenantId, clientId, clientSecret, calendarEmail };
}

export async function createOutlookEvent(config: MicrosoftGraphCalendarConfig, input: OutlookEventInput) {
  return graphFetch(config, "/events", {
    method: "POST",
    body: JSON.stringify(buildEventPayload(input)),
  }) as Promise<OutlookCalendarEvent>;
}

export async function updateOutlookEvent(config: MicrosoftGraphCalendarConfig, eventId: string, input: OutlookEventInput) {
  return graphFetch(config, `/events/${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    body: JSON.stringify(buildEventPayload(input)),
  }) as Promise<OutlookCalendarEvent>;
}

export async function deleteOutlookEvent(config: MicrosoftGraphCalendarConfig, eventId: string) {
  await graphFetch(config, `/events/${encodeURIComponent(eventId)}`, { method: "DELETE" });
}

export async function listOutlookEvents(config: MicrosoftGraphCalendarConfig, start: string, end: string) {
  const params = new URLSearchParams({
    startDateTime: start,
    endDateTime: end,
    $select: "id,subject,bodyPreview,webLink,iCalUId,changeKey,isCancelled,sensitivity,start,end,location",
    $orderby: "start/dateTime",
  });

  const events: OutlookCalendarEvent[] = [];
  let nextUrl: string | undefined = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.calendarEmail)}/calendarView?${params.toString()}`;

  while (nextUrl) {
    const result = (await graphFetchUrl(config, nextUrl)) as GraphCalendarViewResponse;
    events.push(...(result.value || []));
    nextUrl = result["@odata.nextLink"];
  }

  return events;
}
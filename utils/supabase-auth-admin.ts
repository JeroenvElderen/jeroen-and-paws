type SupabaseGenerateLinkResponse = {
  action_link?: string;
  properties?: {
    action_link?: string;
  };
  msg?: string;
  error?: string;
  error_description?: string;
};

type GenerateSignupLinkInput = {
  email: string;
  password: string;
  fullName: string;
  redirectTo: string;
};

type GenerateMagicLinkInput = {
  email: string;
  redirectTo: string;
};

function getSupabaseAdminConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin auth is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  return { supabaseUrl, serviceRoleKey };
}

function getSupabaseGenerateLinkError(payload: SupabaseGenerateLinkResponse) {
  return payload.msg || payload.error_description || payload.error || "Supabase could not generate the confirmation link.";
}

async function generateAuthLink(body: Record<string, unknown>, redirectTo: string) {
  const { supabaseUrl, serviceRoleKey } = getSupabaseAdminConfig();
  const response = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = (await response.json().catch(() => ({}))) as SupabaseGenerateLinkResponse;

  if (!response.ok) {
    throw new Error(getSupabaseGenerateLinkError(payload));
  }

  const actionLink = payload.action_link || payload.properties?.action_link;

  if (!actionLink) {
    throw new Error("Supabase did not return a confirmation link.");
  }

  return actionLink;
}

export async function generateSupabaseSignupLink({ email, password, fullName, redirectTo }: GenerateSignupLinkInput) {
  return generateAuthLink(
    {
      type: "signup",
      email,
      password,
      data: { full_name: fullName },
    },
    redirectTo,
  );
}

export async function generateSupabaseMagicLink({ email, redirectTo }: GenerateMagicLinkInput) {
  return generateAuthLink(
    {
      type: "magiclink",
      email,
    },
    redirectTo,
  );
}

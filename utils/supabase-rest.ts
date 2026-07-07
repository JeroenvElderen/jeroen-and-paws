export function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return { supabaseUrl, anonKey, serviceRoleKey };
}

export async function supabaseRestFetch(path: string, init: RequestInit = {}, accessToken?: string) {
  const { supabaseUrl, anonKey, serviceRoleKey } = getSupabaseConfig();
  const token = accessToken || serviceRoleKey || anonKey;

  console.log({
    hasAnon: !!anonKey,
    hasServiceRole: !!serviceRoleKey,
    usingServiceRole: token === serviceRoleKey,
  });
  
  if (!supabaseUrl || !anonKey || !token) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Supabase returned ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}
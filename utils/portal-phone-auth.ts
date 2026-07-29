import { createHash } from "node:crypto";

import { createClient } from "@supabase/supabase-js";

import { supabaseAdmin } from "@/utils/supabase-admin";

export function normalizeE164(value: string) {
  const phone = value.replace(/[\s().-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) throw new Error("Enter the phone number in international format, for example +31612345678.");
  return phone;
}

export function hashSensitiveValue(value: string) {
  const secret = process.env.PORTAL_AUTH_HASH_SECRET;
  if (!secret) throw new Error("Portal authentication is not configured.");
  return createHash("sha256").update(`${secret}:${value}`).digest("hex");
}

export async function findSupabaseUserByPhone(phone: string) {
  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    const user = data.users.find((candidate) => candidate.phone === phone);
    if (user) return user;
    if (data.users.length < 1000) return null;
  }
  throw new Error("Unable to search the complete user directory.");
}

export async function createVerifiedPhoneUser(input: { phone: string; email?: string; password: string; fullName: string }) {
  if (await findSupabaseUserByPhone(input.phone)) throw new Error("An account already exists for this phone number. Please log in.");
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    phone: input.phone,
    phone_confirm: true,
    email: input.email,
    email_confirm: false,
    password: input.password,
    user_metadata: { full_name: input.fullName, auth_provider: "bird_verify" },
  });
  if (error || !data.user) throw error || new Error("Supabase did not create the user.");
  return data.user;
}

export async function signInPhoneUser(phone: string, password: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) throw new Error("Supabase authentication is not configured.");
  const authClient = createClient(supabaseUrl, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await authClient.auth.signInWithPassword({ phone, password });
  if (error || !data.session) throw error || new Error("Unable to create the authenticated session.");
  return data.session;
}

export async function generateEmailSignupLink(input: { email: string; password: string; fullName: string; redirectTo: string }) {
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "signup",
    email: input.email,
    password: input.password,
    options: { data: { full_name: input.fullName, auth_provider: "email" }, redirectTo: input.redirectTo },
  });
  if (error || !data.properties.action_link) throw error || new Error("Unable to create the email confirmation link.");
  return { user: data.user, actionLink: data.properties.action_link };
}

export async function generateEmailConfirmationLink(email: string, redirectTo: string) {
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({ type: "magiclink", email, options: { redirectTo } });
  if (error || !data.properties.action_link) throw error || new Error("Unable to create the email confirmation link.");
  return data.properties.action_link;
}
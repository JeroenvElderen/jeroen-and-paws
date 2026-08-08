import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { mobileAppSchema } from "@/utils/mobile-app";

export const dynamic = "force-dynamic";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export async function GET() {
  const { data, error } = await getAdminClient().from("mobile_app").select("*").order("platform");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const auth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const { data: { user } } = await auth.auth.getUser(token);
  if (user?.email?.toLowerCase() !== "jeroen@jeroenandpaws.com") {
    return NextResponse.json({ error: "You do not have permission to manage releases." }, { status: 403 });
  }

  const parsed = mobileAppSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid release details." }, { status: 400 });
  }

  const { platform, ...values } = parsed.data;
  const { data, error } = await getAdminClient()
    .from("mobile_app")
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("platform", platform)
    .select("*")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

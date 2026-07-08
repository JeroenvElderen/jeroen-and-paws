import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/utils/supabase-admin";

export const runtime = "nodejs";

function clean(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim().slice(0, 500) || fallback : fallback;
}

function getClientIps(request: Request) {
  return [
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
    request.headers.get("cf-connecting-ip"),
    request.headers.get("true-client-ip"),
  ]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => value.trim())
    .filter(Boolean);
}

function isExcludedIp(request: Request) {
  const excludedIps = (process.env.PAGE_TRACKER_EXCLUDED_IPS ?? process.env.NEXT_PUBLIC_PAGE_TRACKER_EXCLUDED_IPS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (!excludedIps.length) return false;
  const clientIps = getClientIps(request);
  return clientIps.some((ip) => excludedIps.includes(ip));
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    if (!payload) return NextResponse.json({ error: "Send page view data as JSON." }, { status: 400 });
    if (isExcludedIp(request)) return NextResponse.json({ ok: true, ignored: true });
    const visitorId = clean(payload.visitorId);
    const path = clean(payload.path, "/");
    if (!visitorId) return NextResponse.json({ error: "Missing visitor id." }, { status: 400 });
    const userAgent = clean(request.headers.get("user-agent"));
    const referrer = clean(payload.referrer ?? request.headers.get("referer"));
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin.from("site_page_visits").upsert({
      visitor_id: visitorId,
      path,
      title: clean(payload.title, path),
      referrer,
      user_agent: userAgent,
      first_seen_at: now,
      last_seen_at: now,
    }, { onConflict: "visitor_id,path" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Page tracking failed", { route: "/api/page-views", error });
    return NextResponse.json({ error: "Unable to track page view." }, { status: 202 });
  }
}
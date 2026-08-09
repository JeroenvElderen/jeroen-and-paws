import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const APK_FILENAME = "jeroen-and-paws.apk";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return new Response("The Android download is not configured.", { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .from("mobile_app")
    .select("download_url")
    .eq("platform", "android")
    .eq("enabled", true)
    .maybeSingle();

  if (error) {
    console.error("Unable to load the Android release:", error.message);
    return new Response("The Android download is temporarily unavailable.", { status: 502 });
  }

  if (!data?.download_url) {
    return new Response("The Android download is not available yet.", { status: 404 });
  }

  let apkResponse: Response;
  try {
    apkResponse = await fetch(data.download_url, { cache: "no-store" });
  } catch (error) {
    console.error("Unable to fetch the Android APK:", error);
    return new Response("The Android download is temporarily unavailable.", { status: 502 });
  }

  if (!apkResponse.ok || !apkResponse.body) {
    console.error("Unable to fetch the Android APK: upstream status", apkResponse.status);
    return new Response("The Android download is temporarily unavailable.", { status: 502 });
  }

  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Disposition": `attachment; filename="${APK_FILENAME}"`,
    "Content-Type": "application/vnd.android.package-archive",
    "X-Content-Type-Options": "nosniff",
  });
  const contentLength = apkResponse.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new Response(apkResponse.body, { headers });
}

import { importPKCS8, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const REVOLUT_TOKEN_URL = "https://b2b.revolut.com/api/1.0/auth/token";
const REVOLUT_JWT_AUDIENCE = "https://revolut.com";
const CLIENT_ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

async function createClientAssertion() {
  const clientId = getRequiredEnv("REVOLUT_CLIENT_ID");
  const issuer = getRequiredEnv("REVOLUT_JWT_ISSUER");
  const privateKey = getRequiredEnv("REVOLUT_PRIVATE_KEY").replace(/\\n/g, "\n");
  const key = await importPKCS8(privateKey, "RS256");

  return new SignJWT({})
    .setProtectedHeader({ alg: "RS256" })
    .setIssuer(issuer)
    .setSubject(clientId)
    .setAudience(REVOLUT_JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(key);
}

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code")?.trim();

    if (!code) {
      return NextResponse.json(
        { success: false, error: "Missing Revolut authorization code" },
        { status: 400 },
      );
    }

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: getRequiredEnv("REVOLUT_REDIRECT_URI"),
      client_assertion_type: CLIENT_ASSERTION_TYPE,
      client_assertion: await createClientAssertion(),
    });

    const response = await fetch(REVOLUT_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = await response.json().catch(() => null) as {
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      token_type?: string;
    } | null;

    if (!response.ok) {
      return NextResponse.json(
        { success: false, status: response.status, revolut_error: data },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      refresh_token: data?.refresh_token,
      access_token: data?.access_token,
      expires_in: data?.expires_in,
      token_type: data?.token_type,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Token exchange failed",
      },
      { status: 500 },
    );
  }
}
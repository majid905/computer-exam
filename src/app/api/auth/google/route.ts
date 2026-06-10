import { NextResponse } from "next/server";
import { getGoogleOAuthConfig } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const dbConfig = await getGoogleOAuthConfig().catch(() => null);
  const clientId = dbConfig?.client_id || process.env.GOOGLE_CLIENT_ID;
  if (!clientId || dbConfig?.status === "inactive") {
    return NextResponse.json({ error: "Google login not configured" }, { status: 500 });
  }

  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

import { NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/lib/backend";
import { createToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const origin = url.origin;

  if (error || !code) {
    return NextResponse.redirect(`${origin}/login?error=google_denied`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${origin}/login?error=google_not_configured`);
  }

  const redirectUri = `${origin}/api/auth/google/callback`;

  // Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=google_token_failed`);
  }

  const tokens = await tokenRes.json();

  // Get user info from Google
  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userInfoRes.ok) {
    return NextResponse.redirect(`${origin}/login?error=google_userinfo_failed`);
  }

  const googleUser = await userInfoRes.json();
  const { email, name } = googleUser;

  if (!email) {
    return NextResponse.redirect(`${origin}/login?error=google_no_email`);
  }

  // Find or create user
  let user = await getUserByEmail(email);
  if (!user) {
    const id = await createUser({
      email,
      full_name: name || email.split("@")[0],
      user_name: null,
      password: null,
      role: "user",
      status: "active",
    });
    user = await getUserByEmail(email);
  }

  if (!user || user.status !== "active") {
    return NextResponse.redirect(`${origin}/login?error=account_inactive`);
  }

  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Must set cookie directly on the redirect response —
  // next/headers cookies() doesn't attach to NextResponse.redirect()
  const redirectTo = user.role === "client" ? "/app" : "/admin";
  const response = NextResponse.redirect(`${origin}${redirectTo}`);
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}

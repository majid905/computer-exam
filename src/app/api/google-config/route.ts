import { NextResponse } from "next/server";
import { getGoogleOAuthConfig, updateGoogleOAuthConfig } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const config = await getGoogleOAuthConfig();
  return NextResponse.json(config ?? {});
}

export async function POST(request: Request) {
  const auth = await getAuthUser();
  if (!auth || auth.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const id = await updateGoogleOAuthConfig(body);
  return NextResponse.json({ id, message: "Google OAuth config saved" });
}

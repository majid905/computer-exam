import { NextResponse } from "next/server";
import { getAppSettings, updateAppSettings } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const settings = await getAppSettings();
  return NextResponse.json(settings ?? {});
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await updateAppSettings(body);
  return NextResponse.json({ id, message: "Settings saved" });
}

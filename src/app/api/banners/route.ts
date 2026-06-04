import { NextResponse } from "next/server";
import { getActiveBanners, createBanner } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const banners = await getActiveBanners();
  return NextResponse.json(banners);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createBanner(body);
  return NextResponse.json({ id, message: "Banner created" }, { status: 201 });
}

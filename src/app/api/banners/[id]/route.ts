import { NextResponse } from "next/server";
import { getBannerById, updateBanner, deleteBanner } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const banner = await getBannerById(Number(id));
  if (!banner) {
    return NextResponse.json({ error: "Banner not found" }, { status: 404 });
  }
  return NextResponse.json(banner);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateBanner(Number(id), body);
  return NextResponse.json({ message: "Banner updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteBanner(Number(id));
  return NextResponse.json({ message: "Banner deleted" });
}

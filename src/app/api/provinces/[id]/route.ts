import { NextResponse } from "next/server";
import { getProvinceById, updateProvince, deleteProvince } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const province = await getProvinceById(Number(id));
  if (!province) {
    return NextResponse.json({ error: "Province not found" }, { status: 404 });
  }
  return NextResponse.json(province);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateProvince(Number(id), body);
  return NextResponse.json({ message: "Province updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteProvince(Number(id));
  return NextResponse.json({ message: "Province deleted" });
}

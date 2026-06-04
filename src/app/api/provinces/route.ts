import { NextResponse } from "next/server";
import { listProvinces, listAllProvinces, createProvince } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");
  const provinces = all ? await listAllProvinces() : await listProvinces();
  return NextResponse.json(provinces);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createProvince(body);
  return NextResponse.json({ id, message: "Province created" }, { status: 201 });
}

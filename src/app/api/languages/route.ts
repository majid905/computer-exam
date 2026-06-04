import { NextResponse } from "next/server";
import { listLanguages, listAllLanguages, createLanguage } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all");
  const languages = all ? await listAllLanguages() : await listLanguages();
  return NextResponse.json(languages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createLanguage(body);
  return NextResponse.json({ id, message: "Language created" }, { status: 201 });
}

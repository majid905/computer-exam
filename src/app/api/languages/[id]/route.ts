import { NextResponse } from "next/server";
import { getLanguageById, updateLanguage, deleteLanguage } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const language = await getLanguageById(Number(id));
  if (!language) {
    return NextResponse.json({ error: "Language not found" }, { status: 404 });
  }
  return NextResponse.json(language);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateLanguage(Number(id), body);
  return NextResponse.json({ message: "Language updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteLanguage(Number(id));
  return NextResponse.json({ message: "Language deleted" });
}

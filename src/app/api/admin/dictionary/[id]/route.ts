import { NextResponse } from "next/server";
import { getDictionaryTermById, updateDictionaryTerm, deleteDictionaryTerm } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const term = await getDictionaryTermById(Number(id));
  if (!term) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(term);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateDictionaryTerm(Number(id), body);
  return NextResponse.json({ message: "Term updated" });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteDictionaryTerm(Number(id));
  return NextResponse.json({ message: "Term deleted" });
}

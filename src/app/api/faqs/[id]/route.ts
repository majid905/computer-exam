import { NextResponse } from "next/server";
import { getFaqById, updateFaq, deleteFaq } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaqById(Number(id));
  if (!faq) {
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  }
  return NextResponse.json(faq);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateFaq(Number(id), body);
  return NextResponse.json({ message: "FAQ updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteFaq(Number(id));
  return NextResponse.json({ message: "FAQ deleted" });
}

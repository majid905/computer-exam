import { NextResponse } from "next/server";
import { getCategoryById, getChaptersByCategoryId } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategoryById(Number(id));
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  const chapters = await getChaptersByCategoryId(Number(id));
  return NextResponse.json({ ...category, chapters });
}

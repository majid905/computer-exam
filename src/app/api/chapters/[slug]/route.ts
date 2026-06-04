import { NextResponse } from "next/server";
import { getChapterBySlug, getQuestionsByChapterId, getOptionsByQuestionId, updateChapter, deleteChapter } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }
    const questions = await getQuestionsByChapterId(chapter.id);
    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await getOptionsByQuestionId(q.id);
        return { ...q, options };
      }),
    );
    return NextResponse.json({ ...chapter, questions: questionsWithOptions });
  } catch (error: any) {
    console.error("[GET /api/chapters/[slug]] error:", error);
    return NextResponse.json({ error: "Failed to fetch chapter" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }
    await updateChapter(chapter.id, body);
    return NextResponse.json({ message: "Chapter updated" });
  } catch (error: any) {
    console.error("[PUT /api/chapters/[slug]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update chapter" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }
    await deleteChapter(chapter.id);
    return NextResponse.json({ message: "Chapter deleted" });
  } catch (error: any) {
    console.error("[DELETE /api/chapters/[slug]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete chapter" }, { status: 500 });
  }
}

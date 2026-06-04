import { NextResponse } from "next/server";
import { getChapterBySlug, getQuestionsByChapterId, syncQuestionToPractice } from "@/lib/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.slug || typeof body.slug !== "string") {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const chapter = await getChapterBySlug(body.slug);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const questions = await getQuestionsByChapterId(chapter.id);
    let synced = 0;
    for (const q of questions) {
      try {
        await syncQuestionToPractice(q.id);
        synced++;
      } catch (e) {
        // skip if already synced or error
      }
    }

    return NextResponse.json({ message: "Bulk import completed", synced });
  } catch (error: any) {
    console.error("[POST /api/admin/bulk-practice-import] error:", error);
    return NextResponse.json({ error: error.message || "Import failed" }, { status: 500 });
  }
}

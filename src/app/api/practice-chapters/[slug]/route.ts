import { NextResponse } from "next/server";
import { getChapterBySlug, getPracticeQuestionsByChapterId, getPracticeOptionsByQuestionId } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    let questionsWithOptions: any[] = [];
    try {
      const questions = await getPracticeQuestionsByChapterId(chapter.id);
      questionsWithOptions = await Promise.all(
        questions.map(async (q) => {
          const options = await getPracticeOptionsByQuestionId(q.id);
          return { ...q, options };
        }),
      );
    } catch (innerErr: any) {
      if (innerErr?.message?.includes("practice_questions") && innerErr?.message?.includes("doesn't exist")) {
        questionsWithOptions = [];
      } else {
        throw innerErr;
      }
    }

    return NextResponse.json({ ...chapter, questions: questionsWithOptions });
  } catch (error: any) {
    console.error("[GET /api/practice-chapters/[slug]] error:", error);
    return NextResponse.json({ error: "Failed to fetch practice chapter" }, { status: 500 });
  }
}

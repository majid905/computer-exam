import { NextResponse } from "next/server";
import { getPracticeQuestionsByChapterId, getPracticeOptionsByQuestionId } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ chapter_id: string }> }) {
  try {
    const { chapter_id } = await params;
    const questions = await getPracticeQuestionsByChapterId(Number(chapter_id));
    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await getPracticeOptionsByQuestionId(q.id);
        return { ...q, options };
      }),
    );
    return NextResponse.json(questionsWithOptions);
  } catch (error: any) {
    console.error("[GET /api/practice-questions/by-chapter/[chapter_id]] error:", error);
    if (error?.message?.includes("practice_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch practice questions" }, { status: 500 });
  }
}

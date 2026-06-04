import { NextResponse } from "next/server";
import { getQuestionsByChapterId, getOptionsByQuestionId } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ chapter_id: string }> }) {
  try {
    const { chapter_id } = await params;
    const questions = await getQuestionsByChapterId(Number(chapter_id));
    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await getOptionsByQuestionId(q.id);
        return { ...q, options };
      }),
    );
    return NextResponse.json(questionsWithOptions);
  } catch (error: any) {
    console.error("[GET /api/questions/by-chapter/[chapter_id]] error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

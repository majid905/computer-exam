import { NextResponse } from "next/server";
import {
  listPracticeQuestions,
  getPracticeOptionsByQuestionId,
  createPracticeQuestion,
  createPracticeQuestionOption,
} from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const questions = await listPracticeQuestions();
    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await getPracticeOptionsByQuestionId(q.id);
        return { ...q, options };
      }),
    );
    return NextResponse.json(questionsWithOptions);
  } catch (error: any) {
    console.error("[GET /api/practice-questions] error:", error);
    // Gracefully return empty array if practice_questions table does not exist yet
    if (error?.message?.includes("practice_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch practice questions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.question || typeof body.question !== "string") {
      return NextResponse.json({ error: "Question text is required" }, { status: 400 });
    }
    if (!body.chapter_id || isNaN(Number(body.chapter_id))) {
      return NextResponse.json({ error: "Valid chapter_id is required" }, { status: 400 });
    }

    const id = await createPracticeQuestion({
      chapter_id: Number(body.chapter_id),
      question: body.question,
      question_image: body.question_image ?? null,
      question_type: body.question_type || "mcq",
      correct_answer: body.correct_answer ?? null,
      explanation: body.explanation ?? null,
      difficulty: body.difficulty || "easy",
      status: body.status || "active",
    });

    if (Array.isArray(body.options) && body.options.length > 0) {
      for (let i = 0; i < body.options.length; i++) {
        const opt = body.options[i];
        if (opt && typeof opt.text === "string" && opt.text.trim()) {
          await createPracticeQuestionOption({
            question_id: id,
            option_text: opt.text.trim(),
            is_correct: opt.is_correct ? 1 : 0,
          });
        }
      }
    }

    return NextResponse.json({ id, message: "Practice question created" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/practice-questions] error:", error);
    return NextResponse.json({ error: error.message || "Failed to create practice question" }, { status: 500 });
  }
}

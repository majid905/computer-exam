import { NextResponse } from "next/server";
import { listQuestions, listAllQuestions, getOptionsByQuestionId, createQuestion, createQuestionOption } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await getAuthUser();
    const questions = auth?.role === "admin"
      ? await listAllQuestions()
      : await listQuestions();
    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await getOptionsByQuestionId(q.id);
        return { ...q, options };
      }),
    );
    return NextResponse.json(questionsWithOptions);
  } catch (error: any) {
    console.error("[GET /api/questions] error:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
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

    const payload = {
      ...body,
      chapter_id: Number(body.chapter_id),
    };

    const id = await createQuestion(payload);

    // Create options if provided
    if (Array.isArray(body.options) && body.options.length > 0) {
      for (let i = 0; i < body.options.length; i++) {
        const opt = body.options[i];
        if (opt && typeof opt.text === "string" && opt.text.trim()) {
          await createQuestionOption({
            question_id: id,
            option_text: opt.text.trim(),
            is_correct: opt.is_correct ? 1 : 0,
          });
        }
      }
    }

    return NextResponse.json({ id, message: "Question created" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/questions] error:", error);
    return NextResponse.json({ error: error.message || "Failed to create question" }, { status: 500 });
  }
}

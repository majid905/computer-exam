import { NextResponse } from "next/server";
import {
  getPracticeQuestionById,
  getPracticeOptionsByQuestionId,
  updatePracticeQuestion,
  deletePracticeQuestion,
  createPracticeQuestionOption,
  deletePracticeOptionsByQuestionId,
} from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const question = await getPracticeQuestionById(Number(id));
    if (!question) {
      return NextResponse.json({ error: "Practice question not found" }, { status: 404 });
    }
    const options = await getPracticeOptionsByQuestionId(question.id);
    return NextResponse.json({ ...question, options });
  } catch (error: any) {
    console.error("[GET /api/practice-questions/[id]] error:", error);
    return NextResponse.json({ error: "Failed to fetch practice question" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const cleanBody: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
      if (key !== "options" && key !== "id") {
        cleanBody[key] = value;
      }
    }
    await updatePracticeQuestion(Number(id), cleanBody);

    if (Array.isArray(body.options)) {
      await deletePracticeOptionsByQuestionId(Number(id));
      for (let i = 0; i < body.options.length; i++) {
        const opt = body.options[i];
        if (opt && typeof opt.text === "string" && opt.text.trim()) {
          await createPracticeQuestionOption({
            question_id: Number(id),
            option_text: opt.text.trim(),
            is_correct: opt.is_correct ? 1 : 0,
          });
        }
      }
    }

    return NextResponse.json({ message: "Practice question updated" });
  } catch (error: any) {
    console.error("[PUT /api/practice-questions/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update practice question" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deletePracticeOptionsByQuestionId(Number(id));
    await deletePracticeQuestion(Number(id));
    return NextResponse.json({ message: "Practice question deleted" });
  } catch (error: any) {
    console.error("[DELETE /api/practice-questions/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete practice question" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getQuestionById, getOptionsByQuestionId, updateQuestion, deleteQuestion, createQuestionOption, deleteQuestionOption } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const question = await getQuestionById(Number(id));
    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }
    const options = await getOptionsByQuestionId(question.id);
    return NextResponse.json({ ...question, options });
  } catch (error: any) {
    console.error("[GET /api/questions/[id]] error:", error);
    return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Prevent updating options column directly if it somehow leaks in
    const cleanBody: Record<string, any> = {};
    for (const [key, value] of Object.entries(body)) {
      if (key !== "options" && key !== "id") {
        cleanBody[key] = value;
      }
    }

    await updateQuestion(Number(id), cleanBody);

    // If options are provided, replace them
    if (Array.isArray(body.options)) {
      const existing = await getOptionsByQuestionId(Number(id));
      for (const opt of existing) {
        await deleteQuestionOption(opt.id);
      }
      for (let i = 0; i < body.options.length; i++) {
        const opt = body.options[i];
        if (opt && typeof opt.text === "string" && opt.text.trim()) {
          await createQuestionOption({
            question_id: Number(id),
            option_text: opt.text.trim(),
            is_correct: opt.is_correct ? 1 : 0,
          });
        }
      }
    }

    return NextResponse.json({ message: "Question updated" });
  } catch (error: any) {
    console.error("[PUT /api/questions/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update question" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteQuestion(Number(id));
    return NextResponse.json({ message: "Question deleted" });
  } catch (error: any) {
    console.error("[DELETE /api/questions/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete question" }, { status: 500 });
  }
}

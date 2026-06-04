import { NextResponse } from "next/server";
import { getMockTestById, getMockTestQuestions, getQuestionById, getOptionsByQuestionId, updateMockTest, deleteMockTest } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const mockTest = await getMockTestById(Number(id));
    if (!mockTest) {
      return NextResponse.json({ error: "Mock test not found" }, { status: 404 });
    }
    let mtqs: any[] = [];
    try {
      mtqs = await getMockTestQuestions(Number(id));
    } catch (e: any) {
      if (e?.message?.includes("mock_test_questions") && e?.message?.includes("doesn't exist")) {
        mtqs = [];
      } else {
        throw e;
      }
    }
    const questions = await Promise.all(
      mtqs.map(async (mtq) => {
        const q = await getQuestionById(mtq.question_id);
        if (!q) return null;
        const options = await getOptionsByQuestionId(q.id);
        return { ...q, options, mark: mtq.mark };
      }),
    );
    return NextResponse.json({ ...mockTest, questions: questions.filter(Boolean) });
  } catch (error: any) {
    console.error("[GET /api/mock-tests/[id]] error:", error);
    return NextResponse.json({ error: "Failed to fetch mock test" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await updateMockTest(Number(id), body);
    return NextResponse.json({ message: "Mock test updated" });
  } catch (error: any) {
    console.error("[PUT /api/mock-tests/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update mock test" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteMockTest(Number(id));
    return NextResponse.json({ message: "Mock test deleted" });
  } catch (error: any) {
    console.error("[DELETE /api/mock-tests/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete mock test" }, { status: 500 });
  }
}

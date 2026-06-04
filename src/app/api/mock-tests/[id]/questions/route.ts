import { NextResponse } from "next/server";
import { getMockTestQuestions, addQuestionToMockTest, removeQuestionFromMockTest } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const mtqs = await getMockTestQuestions(Number(id));
    return NextResponse.json(mtqs);
  } catch (error: any) {
    console.error("[GET /api/mock-tests/[id]/questions] error:", error);
    if (error?.message?.includes("mock_test_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch mock test questions" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const mockTestId = Number(id);
    const body = await request.json();
    const { question_ids } = body;

    if (!Array.isArray(question_ids)) {
      return NextResponse.json({ error: "question_ids must be an array" }, { status: 400 });
    }

    // Remove existing assignments
    const existing = await getMockTestQuestions(mockTestId);
    for (const ex of existing) {
      await removeQuestionFromMockTest(ex.id);
    }

    // Add new assignments
    for (const qid of question_ids) {
      await addQuestionToMockTest({ mock_test_id: mockTestId, question_id: Number(qid), mark: 1 });
    }

    return NextResponse.json({ message: "Questions updated" });
  } catch (error: any) {
    console.error("[POST /api/mock-tests/[id]/questions] error:", error);
    if (error?.message?.includes("mock_test_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json({ error: "Mock test questions table not found. Run: node scripts/migrate-mock-test.js" }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Failed to update questions" }, { status: 500 });
  }
}

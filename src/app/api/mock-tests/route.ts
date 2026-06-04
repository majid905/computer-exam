import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { listMockTests, createMockTest, addQuestionToMockTest } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const mockTests = await listMockTests();
    return NextResponse.json(mockTests);
  } catch (error: any) {
    console.error("[GET /api/mock-tests] error:", error);
    return NextResponse.json({ error: "Failed to fetch mock tests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const mode = body.question_selection_mode || "manual";
    const totalQuestions = Number(body.total_questions) || 20;

    const id = await createMockTest({
      ...body,
      question_selection_mode: mode,
      total_questions: totalQuestions,
    });

    // If random mode, auto-assign random questions
    if (mode === "random") {
      try {
        const rows = await query<{ id: number }>(
          `SELECT id FROM questions WHERE status = 'active' ORDER BY RAND() LIMIT ?`,
          [totalQuestions]
        );
        for (const row of rows) {
          await addQuestionToMockTest({ mock_test_id: id, question_id: row.id, mark: 1 });
        }
      } catch (assignErr: any) {
        if (assignErr?.message?.includes("mock_test_questions") && assignErr?.message?.includes("doesn't exist")) {
          // Table missing; mock test created but questions not assigned
          console.warn("[POST /api/mock-tests] mock_test_questions table missing, skipping random assignment");
        } else {
          throw assignErr;
        }
      }
    }

    return NextResponse.json({ id, message: "Mock test created" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/mock-tests] error:", error);
    if (error?.message?.includes("total_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json({ error: "Mock test columns missing. Run: node scripts/migrate-mock-test.js" }, { status: 500 });
    }
    if (error?.message?.includes("mock_test_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json({ error: "Mock test questions table missing. Run: node scripts/migrate-mock-test.js" }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Failed to create mock test" }, { status: 500 });
  }
}

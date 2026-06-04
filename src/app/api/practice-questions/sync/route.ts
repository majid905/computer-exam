import { NextResponse } from "next/server";
import { syncQuestionToPractice, getPracticeQuestionBySourceId } from "@/lib/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.question_id || isNaN(Number(body.question_id))) {
      return NextResponse.json({ error: "Valid question_id is required" }, { status: 400 });
    }
    const existing = await getPracticeQuestionBySourceId(Number(body.question_id));
    if (existing) {
      return NextResponse.json({ id: existing.id, message: "Already in practice" });
    }
    const id = await syncQuestionToPractice(Number(body.question_id));
    return NextResponse.json({ id, message: "Question synced to practice" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/practice-questions/sync] error:", error);
    if (error?.message?.includes("practice_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json({ error: "Practice questions table not found. Run: node scripts/migrate-practice.js" }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Sync failed" }, { status: 500 });
  }
}

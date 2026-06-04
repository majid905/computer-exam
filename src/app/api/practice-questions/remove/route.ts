import { NextResponse } from "next/server";
import { removeQuestionFromPractice } from "@/lib/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.question_id || isNaN(Number(body.question_id))) {
      return NextResponse.json({ error: "Valid question_id is required" }, { status: 400 });
    }
    await removeQuestionFromPractice(Number(body.question_id));
    return NextResponse.json({ message: "Question removed from practice" });
  } catch (error: any) {
    console.error("[POST /api/practice-questions/remove] error:", error);
    if (error?.message?.includes("practice_questions") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json({ error: "Practice questions table not found. Run: node scripts/migrate-practice.js" }, { status: 500 });
    }
    return NextResponse.json({ error: error.message || "Remove failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { createTestAttempt, getTestAttemptsByUser, createTestAttemptAnswer } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");
  if (userId) {
    const attempts = await getTestAttemptsByUser(Number(userId));
    return NextResponse.json(attempts);
  }
  const auth = await getAuthUser();
  if (auth) {
    const attempts = await getTestAttemptsByUser(auth.userId);
    return NextResponse.json(attempts);
  }
  const { listTestAttempts } = await import("@/lib/backend");
  const attempts = await listTestAttempts();
  return NextResponse.json(attempts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const auth = await getAuthUser();
  const userId = body.user_id ?? auth?.userId ?? null;
  const { answers, ...attemptData } = body;
  const id = await createTestAttempt({ ...attemptData, user_id: userId });

  if (Array.isArray(answers) && answers.length > 0) {
    for (const a of answers) {
      await createTestAttemptAnswer({
        attempt_id: id,
        question_id: a.question_id,
        selected_option: a.selected_option,
        is_correct: a.is_correct ? 1 : 0,
      });
    }
  }

  return NextResponse.json({ id, message: "Test attempt created" }, { status: 201 });
}

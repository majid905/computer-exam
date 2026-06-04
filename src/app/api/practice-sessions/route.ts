import { NextResponse } from "next/server";
import { createPracticeSession, getPracticeSessionsByUser } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");
  if (userId) {
    const sessions = await getPracticeSessionsByUser(Number(userId));
    return NextResponse.json(sessions);
  }
  const { listPracticeSessions } = await import("@/lib/backend");
  const sessions = await listPracticeSessions();
  return NextResponse.json(sessions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const auth = await getAuthUser();
  const userId = body.user_id ?? auth?.userId ?? null;
  const id = await createPracticeSession({ ...body, user_id: userId });
  return NextResponse.json({ id, message: "Practice session created" }, { status: 201 });
}

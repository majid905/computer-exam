import { NextResponse } from "next/server";
import { getTestAttemptById, getAnswersByAttempt } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const attempt = await getTestAttemptById(Number(id));
  if (!attempt) {
    return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
  }
  const answers = await getAnswersByAttempt(Number(id));
  return NextResponse.json({ ...attempt, answers });
}

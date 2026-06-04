import { NextResponse } from "next/server";
import { getUserProgress } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ user_id: string }> }) {
  const { user_id } = await params;
  const progress = await getUserProgress(Number(user_id));
  return NextResponse.json(progress);
}

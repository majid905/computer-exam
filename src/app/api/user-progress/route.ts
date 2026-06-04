import { NextResponse } from "next/server";
import { upsertUserProgress } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const auth = await getAuthUser();
    const userId = body.user_id ?? auth?.userId ?? null;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    const id = await upsertUserProgress({ ...body, user_id: userId });
    return NextResponse.json({ id, message: "User progress saved" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/user-progress] error:", error);
    return NextResponse.json({ error: error.message || "Failed to save progress" }, { status: 500 });
  }
}

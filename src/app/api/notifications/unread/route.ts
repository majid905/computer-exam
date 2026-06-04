import { NextResponse } from "next/server";
import { countUnreadNotifications } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }
  const count = await countUnreadNotifications(Number(userId));
  return NextResponse.json({ count });
}

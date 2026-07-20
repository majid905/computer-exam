import { NextResponse } from "next/server";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";
import { getUnreadChatCount } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) return unauthorizedResponse();

  const count = await getUnreadChatCount(auth.userId);
  return NextResponse.json({ count });
}

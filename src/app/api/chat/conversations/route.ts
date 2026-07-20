import { NextResponse } from "next/server";
import { getAuthUser, unauthorizedResponse, forbiddenResponse } from "@/lib/auth";
import { getChatConversations } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) return unauthorizedResponse();
  if (auth.role !== "admin") return forbiddenResponse();

  const conversations = await getChatConversations(auth.userId);
  return NextResponse.json(conversations);
}

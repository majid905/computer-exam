import { NextResponse } from "next/server";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";
import { sendChatMessage, getChatMessages, markMessagesRead, getAdminUser } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = await getAuthUser();
  if (!auth) return unauthorizedResponse();

  const { searchParams } = new URL(request.url);
  const otherUserId = Number(searchParams.get("userId"));
  if (!otherUserId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (auth.role !== "admin" && auth.userId !== otherUserId) {
    const admin = await getAdminUser();
    if (!admin || otherUserId !== admin.id) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }
  }

  await markMessagesRead(auth.userId, otherUserId);

  const limit = Number(searchParams.get("limit")) || 50;
  const offset = Number(searchParams.get("offset")) || 0;
  const messages = await getChatMessages(auth.userId, otherUserId, limit, offset);
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const auth = await getAuthUser();
  if (!auth) return unauthorizedResponse();

  const { receiverId, message } = await request.json();
  if (!receiverId || !message?.trim()) {
    return NextResponse.json({ error: "receiverId and message are required" }, { status: 400 });
  }

  if (auth.role !== "admin") {
    const admin = await getAdminUser();
    if (!admin || receiverId !== admin.id) {
      return NextResponse.json({ error: "Clients can only message admin" }, { status: 403 });
    }
  }

  const result = await sendChatMessage(auth.userId, receiverId, message.trim());
  return NextResponse.json({ id: result.insertId, message: "Sent" }, { status: 201 });
}

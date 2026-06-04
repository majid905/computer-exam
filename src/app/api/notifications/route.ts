import { NextResponse } from "next/server";
import { getAuthUser, forbiddenResponse } from "@/lib/auth";
import { getNotificationsByUser, listAllNotifications, createNotification } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const all = searchParams.get("all");

  if (all) {
    const auth = await getAuthUser();
    if (!auth) return forbiddenResponse();
    if (auth.role !== "admin") return forbiddenResponse();
    const notifications = await listAllNotifications();
    return NextResponse.json(notifications);
  }

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const notifications = await getNotificationsByUser(Number(userId));
  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createNotification(body);
  return NextResponse.json({ id, message: "Notification created" }, { status: 201 });
}

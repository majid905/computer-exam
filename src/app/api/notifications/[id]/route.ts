import { NextResponse } from "next/server";
import { getNotificationById, updateNotification, deleteNotification, markNotificationRead } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notification = await getNotificationById(Number(id));
  if (!notification) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }
  return NextResponse.json(notification);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateNotification(Number(id), body);
  return NextResponse.json({ message: "Notification updated" });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  if (body.is_read !== undefined) {
    await markNotificationRead(Number(id));
  }
  return NextResponse.json({ message: "Notification updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteNotification(Number(id));
  return NextResponse.json({ message: "Notification deleted" });
}

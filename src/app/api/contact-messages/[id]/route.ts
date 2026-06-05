import { NextResponse } from "next/server";
import { getContactMessageById, replyContactMessage } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await getContactMessageById(Number(id));
  if (!message) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  if (body.reply !== undefined) {
    await replyContactMessage(Number(id), body.reply);
    return NextResponse.json({ message: "Reply sent" });
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

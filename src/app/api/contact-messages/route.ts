import { NextResponse } from "next/server";
import { createContactMessage, listContactMessages } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const messages = await listContactMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createContactMessage(body);
  return NextResponse.json({ id, message: "Contact message sent successfully" }, { status: 201 });
}

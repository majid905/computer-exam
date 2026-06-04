import { NextResponse } from "next/server";
import { listFaqs, createFaq } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const faqs = await listFaqs();
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createFaq(body);
  return NextResponse.json({ id, message: "FAQ created" }, { status: 201 });
}

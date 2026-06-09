import { NextResponse } from "next/server";
import { listAllDictionaryTerms, createDictionaryTerm } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const terms = await listAllDictionaryTerms();
  return NextResponse.json(terms);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createDictionaryTerm(body);
  return NextResponse.json({ id, message: "Term created" }, { status: 201 });
}

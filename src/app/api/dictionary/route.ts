import { NextResponse } from "next/server";
import { listDictionaryTerms } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const terms = await listDictionaryTerms();
    return NextResponse.json(terms);
  } catch (error: any) {
    if (error?.message?.includes("dictionary_terms") && error?.message?.includes("doesn't exist")) {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch dictionary terms" }, { status: 500 });
  }
}

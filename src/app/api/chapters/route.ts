import { NextResponse } from "next/server";
import { listChapters, createChapter } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const chapters = await listChapters();
    return NextResponse.json(chapters);
  } catch (error: any) {
    console.error("[GET /api/chapters] error:", error);
    return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.slug || typeof body.slug !== "string") {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    if (!body.category_id || isNaN(Number(body.category_id))) {
      return NextResponse.json({ error: "Valid category_id is required" }, { status: 400 });
    }

    const payload = {
      ...body,
      category_id: Number(body.category_id),
    };

    const id = await createChapter(payload);
    return NextResponse.json({ id, message: "Chapter created" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/chapters] error:", error);
    return NextResponse.json({ error: error.message || "Failed to create chapter" }, { status: 500 });
  }
}

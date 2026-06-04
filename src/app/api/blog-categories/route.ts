import { NextResponse } from "next/server";
import { listBlogCategories } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const categories = await listBlogCategories();
  return NextResponse.json(categories);
}

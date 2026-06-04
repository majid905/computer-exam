import { NextResponse } from "next/server";
import { listCategories } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const categories = await listCategories();
  return NextResponse.json(categories);
}

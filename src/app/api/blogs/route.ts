import { NextResponse } from "next/server";
import { listBlogs, createBlog } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const blogs = await listBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createBlog(body);
  return NextResponse.json({ id, message: "Blog created" }, { status: 201 });
}

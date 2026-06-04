import { NextResponse } from "next/server";
import { getBlogBySlug, getCategoriesByBlogId, getBlogCategoryById, updateBlog, deleteBlog } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  const relations = await getCategoriesByBlogId(blog.id);
  const categories = await Promise.all(
    relations.map(async (r) => getBlogCategoryById(r.blog_category_id)),
  );
  return NextResponse.json({ ...blog, categories: categories.filter(Boolean) });
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json();
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  await updateBlog(blog.id, body);
  return NextResponse.json({ message: "Blog updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }
  await deleteBlog(blog.id);
  return NextResponse.json({ message: "Blog deleted" });
}

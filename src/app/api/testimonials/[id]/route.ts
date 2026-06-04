import { NextResponse } from "next/server";
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(Number(id));
  if (!testimonial) {
    return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
  }
  return NextResponse.json(testimonial);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updateTestimonial(Number(id), body);
  return NextResponse.json({ message: "Testimonial updated" });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteTestimonial(Number(id));
  return NextResponse.json({ message: "Testimonial deleted" });
}

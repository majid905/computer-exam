import { NextResponse } from "next/server";
import { getActiveTestimonials, createTestimonial } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const testimonials = await getActiveTestimonials();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createTestimonial(body);
  return NextResponse.json({ id, message: "Testimonial created" }, { status: 201 });
}

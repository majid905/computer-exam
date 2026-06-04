import { NextResponse } from "next/server";

export const runtime = "nodejs";

const topics = [
  { slug: "settings", label: "Settings", path: "/settings", visible: 1, sort_order: 1 },
  { slug: "chapters", label: "Chapters", path: "/chapters", visible: 1, sort_order: 2 },
  { slug: "practice", label: "Practice", path: "/practice", visible: 1, sort_order: 3 },
  { slug: "mock-exam", label: "Mock exam", path: "/mock-exam", visible: 1, sort_order: 4 },
  { slug: "progress", label: "Progress", path: "/progress", visible: 1, sort_order: 5 },
  { slug: "pricing", label: "Pricing", path: "/pricing", visible: 1, sort_order: 6 },
  { slug: "faq", label: "FAQ", path: "/faq", visible: 1, sort_order: 7 },
  { slug: "language", label: "Language", path: "/language", visible: 1, sort_order: 8 },
  { slug: "provincial", label: "Provincial", path: "/provincial", visible: 1, sort_order: 9 },
  { slug: "users", label: "Users", path: "/users", visible: 1, sort_order: 10 },
];

export async function GET() {
  return NextResponse.json(topics);
}

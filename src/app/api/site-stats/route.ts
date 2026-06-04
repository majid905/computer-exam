import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const [[{ count: questions }], [{ count: chapters }], [{ count: languages }], [{ count: testimonials }]] = await Promise.all([
      query<any>("SELECT COUNT(*) as count FROM questions WHERE status = 'active'"),
      query<any>("SELECT COUNT(*) as count FROM chapters WHERE status = 'active'"),
      query<any>("SELECT COUNT(*) as count FROM languages WHERE status = 'active'"),
      query<any>("SELECT COUNT(*) as count FROM testimonials WHERE status = 'active'"),
    ]);

    // Get mock test duration from first active mock test, default to 45
    const [mockTest] = await query<any>("SELECT time_limit FROM mock_tests WHERE status = 'active' ORDER BY id LIMIT 1");
    const mockDuration = mockTest?.time_limit ?? 45;

    return NextResponse.json({
      questions: Number(questions),
      chapters: Number(chapters),
      languages: Number(languages),
      testimonials: Number(testimonials),
      mock_test_duration: Number(mockDuration),
    });
  } catch (error: any) {
    console.error("[GET /api/site-stats] error:", error);
    return NextResponse.json({
      questions: 0,
      chapters: 0,
      languages: 0,
      testimonials: 0,
      mock_test_duration: 45,
    });
  }
}

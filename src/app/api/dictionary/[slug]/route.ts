import { NextResponse } from "next/server";
import { getDictionaryTermBySlug, hasActiveSubscription } from "@/lib/backend";
import { getAuthUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const term = await getDictionaryTermBySlug(slug);
    if (!term) return NextResponse.json({ error: "Term not found" }, { status: 404 });

    const auth = await getAuthUser();
    const isPro = auth ? await hasActiveSubscription(auth.userId) : false;

    const canAccess =
      term.access_level === "free" ||
      (term.access_level === "login" && !!auth) ||
      (term.access_level === "pro" && !!auth && isPro);

    if (!canAccess) {
      return NextResponse.json({
        ...term,
        full_description: null,
        ai_explanation: null,
        quiz_question: null,
        quiz_options: null,
        quiz_answer: null,
        _gated: true,
      });
    }

    return NextResponse.json({ ...term, _gated: false });
  } catch {
    return NextResponse.json({ error: "Failed to fetch term" }, { status: 500 });
  }
}

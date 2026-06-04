import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getChapterBySlug, updateChapter, getQuestionsByChapterId, createQuestion, createQuestionOption } from "@/lib/backend";

export const runtime = "nodejs";

function loadJson(fileName: string) {
  const filePath = path.join(process.cwd(), "src", "data", fileName);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const chapter = await getChapterBySlug(slug);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const summaries = loadJson("summaries.json");
    const allQuestions = loadJson("questions.json");

    let bodyUpdated = false;
    let questionsImported = 0;

    // Update chapter body/summary
    if (summaries && summaries[slug]) {
      await updateChapter(chapter.id, { body: JSON.stringify(summaries[slug]) });
      bodyUpdated = true;
    }

    // Import questions if chapter has none
    const existingQuestions = await getQuestionsByChapterId(chapter.id);
    if (existingQuestions.length === 0 && Array.isArray(allQuestions)) {
      const chapterQuestions = allQuestions.filter((q: any) => q.chapter === slug);
      const difficultyMap: Record<number, string> = { 1: "easy", 2: "medium", 3: "hard" };

      for (const q of chapterQuestions) {
        const questionId = await createQuestion({
          chapter_id: chapter.id,
          question: q.question,
          question_image: null,
          question_type: "mcq",
          correct_answer: String(q.answer ?? ""),
          explanation: q.explanation ?? null,
          difficulty: difficultyMap[q.difficulty] || "easy",
          status: "active",
        });

        if (Array.isArray(q.options)) {
          for (let i = 0; i < q.options.length; i++) {
            await createQuestionOption({
              question_id: questionId,
              option_text: q.options[i],
              is_correct: i === (q.answer ?? -1) ? 1 : 0,
            });
          }
        }
        questionsImported++;
      }
    }

    return NextResponse.json({
      message: "Import completed",
      bodyUpdated,
      questionsImported,
      skippedQuestions: existingQuestions.length > 0,
    });
  } catch (error: any) {
    console.error("[POST /api/admin/import-chapter] error:", error);
    return NextResponse.json({ error: error.message || "Import failed" }, { status: 500 });
  }
}

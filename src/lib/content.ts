// Content layer — all dynamic data is fetched from the backend API.
// Static constants (emojis, order, URLs) remain here.

import type { Chapter, ChapterSummary, Question } from "./types";

export const CHAPTER_ORDER: string[] = [
  "applying",
  "rights",
  "who",
  "history",
  "modern",
  "govern",
  "elections",
  "justice",
  "symbols",
  "economy",
  "regions",
  "study",
];

export const OFFICIAL_PDF_URL =
  "https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/pub/discover-large.pdf";

export function officialPdfPageUrl(pageStart: number): string {
  return `${OFFICIAL_PDF_URL}#page=${pageStart}`;
}

export const CHAPTER_EMOJI: Record<string, string> = {
  applying: "📝",
  rights: "⚖️",
  who: "👥",
  history: "🏛️",
  modern: "🇨🇦",
  govern: "🏢",
  elections: "🗳️",
  justice: "👨‍⚖️",
  symbols: "🍁",
  economy: "💼",
  regions: "🗺️",
  study: "📚",
};

// ===================== SERVER-SIDE FETCHERS =====================
// These can be used in Server Components or API routes.

export async function fetchChapters(): Promise<Chapter[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/chapters`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch chapters");
  const data = await res.json();
  return data.map((c: any) => ({
    slug: c.slug,
    title: c.title,
    pageStart: c.page_start ?? 1,
    pageEnd: c.page_end ?? 10,
  }));
}

export async function fetchChapter(slug: string): Promise<(Chapter & { questions: Question[]; summary?: ChapterSummary }) | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/chapters/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const c = await res.json();
  let summary: ChapterSummary | undefined;
  try {
    if (c.body) summary = JSON.parse(c.body);
  } catch { /* ignore */ }
  const bodyObj = c.body ? JSON.parse(c.body) : null;
  const pageStart = bodyObj?.pageStart ?? 1;
  const pageEnd = bodyObj?.pageEnd ?? 10;
  const questions: Question[] = (c.questions ?? []).map((q: any) => ({
    id: String(q.id),
    chapter: c.slug,
    topic: q.topic ?? "General",
    difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
    source: q.source ?? "Discover Canada",
    question: q.question,
    options: (q.options ?? []).map((o: any) => o.option_text),
    answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
    explanation: q.explanation,
  }));
  return {
    slug: c.slug,
    title: c.title,
    pageStart,
    pageEnd,
    questions,
    summary,
  };
}

export async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/questions`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch questions");
  const data = await res.json();
  return data.map((q: any) => ({
    id: String(q.id),
    chapter: q.chapter_slug ?? "general",
    topic: q.topic ?? "General",
    difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
    source: q.source ?? "Discover Canada",
    question: q.question,
    options: (q.options ?? []).map((o: any) => o.option_text),
    answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
    explanation: q.explanation,
  }));
}

export async function fetchQuestionsForChapter(chapterSlug: string): Promise<Question[]> {
  // First get chapter to find its id
  const chapterRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/chapters/${chapterSlug}`, { cache: "no-store" });
  if (!chapterRes.ok) return [];
  const chapter = await chapterRes.json();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/questions/by-chapter/${chapter.id}`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((q: any) => ({
    id: String(q.id),
    chapter: chapterSlug,
    topic: q.topic ?? "General",
    difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
    source: q.source ?? "Discover Canada",
    question: q.question,
    options: (q.options ?? []).map((o: any) => o.option_text),
    answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
    explanation: q.explanation,
  }));
}

export async function fetchQuestionById(id: string): Promise<Question | undefined> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/questions/${id}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  const q = await res.json();
  return {
    id: String(q.id),
    chapter: q.chapter_slug ?? "general",
    topic: q.topic ?? "General",
    difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
    source: q.source ?? "Discover Canada",
    question: q.question,
    options: (q.options ?? []).map((o: any) => o.option_text),
    answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
    explanation: q.explanation,
  };
}

export async function fetchSummary(slug: string): Promise<ChapterSummary | undefined> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? ""}/api/chapters/${slug}`, { cache: "no-store" });
  if (!res.ok) return undefined;
  const c = await res.json();
  try {
    if (c.body) return JSON.parse(c.body);
  } catch { /* ignore */ }
  return undefined;
}

// ===================== CLIENT-SIDE LEGACY HELPERS =====================
// These synchronous helpers are kept for compatibility with components
// that haven't been fully migrated to async data fetching.
// They will return empty/placeholder data — components should migrate
// to useEffect + the fetch functions above.

export const chapters: Chapter[] = [];
export const questions: Question[] = [];
export const summaries: Record<string, ChapterSummary> = {};

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getQuestionsForChapter(slug: string): Question[] {
  return questions.filter((q) => q.chapter === slug);
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}

export function getSummary(slug: string): ChapterSummary | undefined {
  return summaries[slug];
}

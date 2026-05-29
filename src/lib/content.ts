import chaptersData from "@/data/chapters.json";
import questionsData from "@/data/questions.json";
import summariesData from "@/data/summaries.json";
import type { Chapter, ChapterSummary, Question } from "./types";

export const chapters: Chapter[] = chaptersData as Chapter[];
export const questions: Question[] = questionsData as Question[];
export const summaries: Record<string, ChapterSummary> =
  summariesData as Record<string, ChapterSummary>;

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

import type { Question, MockExamAttempt } from "./types";

export const MOCK_EXAM_SIZE = 20;
export const MOCK_EXAM_PASS = 15;
export const MOCK_EXAM_DURATION_SECONDS = 45 * 60;

export type ExamConfig = {
  size: number;
  pass: number;
  durationSeconds: number;
};

export const DEFAULT_EXAM_CONFIG: ExamConfig = {
  size: MOCK_EXAM_SIZE,
  pass: MOCK_EXAM_PASS,
  durationSeconds: MOCK_EXAM_DURATION_SECONDS,
};

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick a balanced set across chapters, then top up randomly. */
export function pickMockExamQuestions(allQuestions: Question[], size = MOCK_EXAM_SIZE): Question[] {
  const studyableChapters = [
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
  ];
  const perChapter = Math.max(1, Math.floor(size / studyableChapters.length));
  const picked: Question[] = [];
  const usedIds = new Set<string>();

  for (const slug of studyableChapters) {
    const pool = shuffle(allQuestions.filter((q) => q.chapter === slug));
    for (let i = 0; i < perChapter && i < pool.length; i++) {
      picked.push(pool[i]);
      usedIds.add(pool[i].id);
    }
  }

  // Top up to exact size
  const remainder = shuffle(allQuestions.filter((q) => !usedIds.has(q.id)));
  for (const q of remainder) {
    if (picked.length >= size) break;
    picked.push(q);
  }

  return shuffle(picked).slice(0, size);
}

export function scoreAttempt(
  selectedByQid: Record<string, number | null>,
  pickedQuestions: Question[],
  startedAt: Date,
  finishedAt: Date,
  config: Partial<ExamConfig> = {},
): MockExamAttempt {
  const cfg = { ...DEFAULT_EXAM_CONFIG, ...config };
  let score = 0;
  const byChapter: Record<string, { correct: number; total: number }> = {};
  const answers: MockExamAttempt["answers"] = [];

  for (const q of pickedQuestions) {
    const sel = selectedByQid[q.id] ?? null;
    const correct = sel !== null && sel === q.answer;
    if (correct) score++;
    if (!byChapter[q.chapter]) byChapter[q.chapter] = { correct: 0, total: 0 };
    byChapter[q.chapter].total += 1;
    if (correct) byChapter[q.chapter].correct += 1;
    answers.push({ qid: q.id, selected: sel, correct });
  }

  const total = pickedQuestions.length;
  return {
    id: `attempt-${startedAt.getTime()}`,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    durationSeconds: Math.round((finishedAt.getTime() - startedAt.getTime()) / 1000),
    score,
    total,
    passed: score >= Math.ceil((total / cfg.size) * cfg.pass),
    passMarks: Math.ceil((total / cfg.size) * cfg.pass),
    byChapter,
    questionIds: pickedQuestions.map((q) => q.id),
    answers,
  };
}

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${`${r}`.padStart(2, "0")}`;
}

export type Chapter = {
  slug: string;
  title: string;
  pageStart: number;
  pageEnd: number;
};

export type Question = {
  id: string;
  chapter: string;
  topic: string;
  difficulty: 1 | 2 | 3;
  source: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type SummarySection = {
  heading: string;
  points: string[];
};

export type ChapterSummary = {
  intro: string;
  sections: SummarySection[];
};

export type Language =
  | "en"
  | "fr"
  | "pa"
  | "tl"
  | "zh"
  | "hi"
  | "ar"
  | "es";

export type Province =
  | "AB"
  | "BC"
  | "MB"
  | "NB"
  | "NL"
  | "NS"
  | "NT"
  | "NU"
  | "ON"
  | "PE"
  | "QC"
  | "SK"
  | "YT";

export type OnboardingState = {
  language: Language;
  province: Province | null;
  testDate: string | null; // ISO date
  baselineScore: number | null; // 0-100
  baselineCompletedAt: string | null;
  completed: boolean;
};

export type ChapterProgress = {
  read: boolean;
  lastRead?: string;
  practiceAttempts: number;
  practiceCorrect: number;
  practiceTotal: number;
};

export type MockExamAttempt = {
  id: string;
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
  score: number; // 0-20
  total: number; // 20
  passed: boolean; // >= 15/20
  byChapter: Record<string, { correct: number; total: number }>;
  questionIds: string[];
  answers: Array<{ qid: string; selected: number | null; correct: boolean }>;
};

export type UserState = {
  onboarding: OnboardingState;
  theme: "light" | "dark" | "system";
  chapters: Record<string, ChapterProgress>;
  flagged: string[]; // question ids
  attempts: MockExamAttempt[];
  streak: {
    current: number;
    longest: number;
    lastStudyDate: string | null; // YYYY-MM-DD
  };
  createdAt: string;
};

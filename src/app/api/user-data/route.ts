import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  getSettingsByUserId,
  getTestAttemptsByUser,
  getUserProgress,
  getPracticeSessionsByUser,
  listChapters,
  getLanguageById,
  getProvinceById,
} from "@/lib/backend";

export const runtime = "nodejs";

function computeStreak(dates: (string | Date | null | undefined)[]) {
  const normalized = dates
    .filter((d): d is string | Date => d != null)
    .map((d) => (typeof d === "string" ? d : d.toISOString()));

  if (normalized.length === 0) {
    return { current: 0, longest: 0, lastStudyDate: null };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const uniqueDates = Array.from(new Set(normalized.map((d) => d.split("T")[0]))).sort().reverse();

  let current = 0;
  let prev: Date | null = null;
  for (const dateStr of uniqueDates) {
    const d = new Date(dateStr + "T00:00:00");
    d.setHours(0, 0, 0, 0);
    if (prev === null) {
      const diffDays = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) break;
      current = 1;
      prev = d;
    } else {
      const diffDays = Math.round((prev.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        current++;
        prev = d;
      } else {
        break;
      }
    }
  }

  // Compute longest streak
  let longest = 0;
  let run = 0;
  let last: Date | null = null;
  const sortedAsc = [...uniqueDates].sort();
  for (const dateStr of sortedAsc) {
    const d = new Date(dateStr + "T00:00:00");
    d.setHours(0, 0, 0, 0);
    if (last === null) {
      run = 1;
    } else {
      const diffDays = Math.round((d.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        run++;
      } else {
        run = 1;
      }
    }
    longest = Math.max(longest, run);
    last = d;
  }

  return {
    current,
    longest: Math.max(longest, current),
    lastStudyDate: uniqueDates[0] ?? null,
  };
}

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = auth.userId;

  const [settings, attempts, progress, sessions, chapters] = await Promise.all([
    getSettingsByUserId(userId),
    getTestAttemptsByUser(userId),
    getUserProgress(userId),
    getPracticeSessionsByUser(userId),
    listChapters(),
  ]);

  // Map chapter id → slug
  const chapterMap = new Map<number, string>();
  for (const ch of chapters) {
    chapterMap.set(ch.id, ch.slug);
  }

  // Build onboarding
  let language = "en";
  let province: string | null = null;
  if (settings) {
    if (settings.language_id) {
      const lang = await getLanguageById(settings.language_id);
      if (lang) language = lang.code;
    }
    if (settings.province_id) {
      const prov = await getProvinceById(settings.province_id);
      if (prov) province = prov.code;
    }
  }

  const onboarding = {
    language: language as any,
    province: province as any,
    testDate: settings?.test_date ?? null,
    baselineScore: settings?.result ? parseInt(settings.result, 10) : null,
    baselineCompletedAt: null,
    completed: !!(settings?.language_id && settings?.province_id),
  };

  // Build chapters progress
  const chaptersProgress: Record<string, any> = {};

  // From user_progress table
  for (const p of progress) {
    const slug = chapterMap.get(p.chapter_id);
    if (!slug) continue;
    chaptersProgress[slug] = {
      read: p.percentage >= 100 || p.completed_questions >= p.total_questions,
      lastRead: p.updated_at,
      practiceAttempts: 0,
      practiceCorrect: p.completed_questions ?? 0,
      practiceTotal: p.total_questions ?? 0,
    };
  }

  // From practice_sessions table
  const sessionAgg = new Map<string, { attempts: number; correct: number; total: number }>();
  for (const s of sessions) {
    if (!s.chapter_id) continue;
    const slug = chapterMap.get(s.chapter_id);
    if (!slug) continue;
    const existing = sessionAgg.get(slug) ?? { attempts: 0, correct: 0, total: 0 };
    existing.attempts++;
    existing.correct += s.correct_answers ?? 0;
    existing.total += s.total_questions ?? 0;
    sessionAgg.set(slug, existing);
  }

  for (const [slug, agg] of sessionAgg) {
    if (chaptersProgress[slug]) {
      chaptersProgress[slug].practiceAttempts = agg.attempts;
      chaptersProgress[slug].practiceCorrect = agg.correct;
      chaptersProgress[slug].practiceTotal = agg.total;
    } else {
      chaptersProgress[slug] = {
        read: false,
        practiceAttempts: agg.attempts,
        practiceCorrect: agg.correct,
        practiceTotal: agg.total,
      };
    }
  }

  // Build attempts
  const mappedAttempts = attempts.map((a: any) => ({
    id: String(a.id),
    startedAt: a.created_at,
    finishedAt: a.created_at,
    durationSeconds: a.time_taken ?? 0,
    score: a.correct_answers ?? 0,
    total: a.total_marks ?? 20,
    passed: a.result === "pass",
    byChapter: {},
    questionIds: [],
    answers: [],
  }));

  // Build streak from all activity dates
  const activityDates: string[] = [
    ...sessions.map((s: any) => s.created_at),
    ...attempts.map((a: any) => a.created_at),
    ...progress.map((p: any) => p.updated_at),
  ];

  const streak = computeStreak(activityDates);

  return NextResponse.json({
    onboarding,
    theme: settings?.theme_style ?? "system",
    chapters: chaptersProgress,
    attempts: mappedAttempts,
    streak,
    flagged: [], // keep local only
  });
}

"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { QuizCard } from "@/components/app/QuizCard";
import { CHAPTER_EMOJI } from "@/lib/content";
import { shuffle } from "@/lib/exam";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import { useAuth } from "@/context/AuthContext";
import { ProgressBar } from "@/components/ui/Progress";
import { RequireAuth } from "@/components/app/RequireAuth";
import type { Chapter, Question } from "@/lib/types";

const SESSION_SIZE = 10;

export default function PracticeChapterClient({ slug }: { slug: string }) {
  return (
    <RequireAuth>
      <PracticeChapterInner slug={slug} />
    </RequireAuth>
  );
}

function PracticeChapterInner({ slug }: { slug: string }) {
  const [, update] = useUserState();
  const { user } = useAuth();
  const [seed, setSeed] = useState(0);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [chapterId, setChapterId] = useState<number | null>(null);
  const [allChapters, setAllChapters] = useState<{slug: string; title: string}[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbSaved, setDbSaved] = useState(false);
  const [answers, setAnswers] = useState<
    Record<string, { selected: number; correct: boolean }>
  >({});

  useEffect(() => {
    setLoading(true);
    // Load current chapter (practice questions) and all chapters
    Promise.all([
      fetch(`/api/practice-chapters/${slug}`).then((r) => {
        if (!r.ok) throw new Error("Chapter not found");
        return r.json();
      }),
      fetch("/api/chapters/")
        .then((r) => r.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : [];
          setAllChapters(list.map((c: any) => ({ slug: c.slug, title: c.title })));
        })
        .catch(() => {}),
    ])
      .then(([data]) => {
        setChapter({ slug: data.slug, title: data.title, pageStart: 1, pageEnd: 10 });
        setChapterId(data.id);
        const mappedQuestions: Question[] = (data.questions ?? []).map((q: any) => ({
          id: String(q.id),
          chapter: data.slug,
          topic: q.topic ?? "General",
          difficulty: q.difficulty === "easy" ? 1 : q.difficulty === "medium" ? 2 : 3,
          source: q.source ?? "Discover Canada",
          question: q.question,
          options: (q.options ?? []).map((o: any) => o.option_text),
          answer: (q.options ?? []).findIndex((o: any) => o.is_correct === 1),
          explanation: q.explanation,
        }));
        setAllQuestions(mappedQuestions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    setAnswers({});
    setDbSaved(false);
  }, [seed, slug]);

  const sessionQuestions = useMemo(() => {
    if (allQuestions.length === 0) return [];
    return shuffle(allQuestions).slice(0, Math.min(SESSION_SIZE, allQuestions.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allQuestions, seed]);

  const hasQuestions = allQuestions.length > 0;

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const done = sessionQuestions.length > 0 && answeredCount >= sessionQuestions.length;

  const idx = chapter && allChapters.length ? allChapters.findIndex((c) => c.slug === chapter.slug) : -1;
  const nextSlug = idx >= 0 && idx < allChapters.length - 1 ? allChapters[idx + 1]?.slug : undefined;

  // Save practice session to DB when complete
  useEffect(() => {
    if (done && chapterId && !dbSaved) {
      const wrong = answeredCount - correctCount;
      fetch("/api/practice-sessions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          chapter_id: chapterId,
          total_questions: sessionQuestions.length,
          correct_answers: correctCount,
          wrong_answers: wrong,
          score: Math.round((correctCount / sessionQuestions.length) * 100),
          completed_at: new Date().toISOString(),
        }),
      }).catch(() => {});
      setDbSaved(true);
    }
  }, [done, chapterId, dbSaved, answeredCount, correctCount, sessionQuestions.length, user?.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
        <p className="text-[var(--color-muted)]">Loading questions...</p>
      </div>
    );
  }

  if (!chapter) {
    notFound();
  }

  const ch = chapter;

  function recordAnswer(qid: string, selected: number, correct: boolean) {
    setAnswers((prev) => {
      if (prev[qid]) return prev;
      const next = { ...prev, [qid]: { selected, correct } };
      update((s) => {
        const updated = applyDailyStudy(s);
        const cp = updated.chapters[ch.slug] ?? {
          read: false,
          practiceAttempts: 0,
          practiceCorrect: 0,
          practiceTotal: 0,
        };
        return {
          ...updated,
          chapters: {
            ...updated.chapters,
            [ch.slug]: {
              ...cp,
              practiceCorrect: cp.practiceCorrect + (correct ? 1 : 0),
              practiceTotal: cp.practiceTotal + 1,
              practiceAttempts:
                Object.keys(next).length === sessionQuestions.length
                  ? cp.practiceAttempts + 1
                  : cp.practiceAttempts,
            },
          },
        };
      });
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <div className="text-sm text-[var(--color-muted)] mb-2">
        <Link href="/practice" className="ud-link">
          Practice
        </Link>{" "}
        / {ch.title}
      </div>
      <header className="mb-6 flex items-center gap-3">
        <span className="text-3xl" aria-hidden>
          {CHAPTER_EMOJI[ch.slug] ?? "📖"}
        </span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
            Practice
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {ch.title}
          </h1>
        </div>
      </header>

      <div className="ud-card p-4 mb-5 flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar value={answeredCount} max={sessionQuestions.length} />
          <p className="text-xs text-[var(--color-muted)] mt-1.5">
            {answeredCount} of {sessionQuestions.length} answered ·{" "}
            <strong className="text-[var(--color-ink)]">
              {correctCount} correct
            </strong>
          </p>
        </div>
        <button
          className="ud-btn ud-btn-ghost ud-btn-sm"
          onClick={() => setSeed((s) => s + 1)}
        >
          Reshuffle
        </button>
      </div>

      {hasQuestions ? (
        <div className="space-y-5">
          {sessionQuestions.map((q, i) => (
            <QuizCard
              key={`${seed}-${q.id}`}
              q={q}
              index={i}
              total={sessionQuestions.length}
              onAnswered={(sel, correct) => recordAnswer(q.id, sel, correct)}
            />
          ))}
        </div>
      ) : (
        <div className="ud-card p-8 text-center">
          <p className="text-[var(--color-muted)] mb-2">
            No practice questions available for this chapter yet.
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Add questions from the admin panel, or use the <strong>Import</strong> button in Admin → Chapters to load static content.
          </p>
        </div>
      )}

      {done && (
        <div className="mt-8 ud-card p-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
            Session complete
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {correctCount} / {sessionQuestions.length}
          </h2>
          <p className="text-sm text-[var(--color-muted)] mt-2 mb-5">
            {correctCount === sessionQuestions.length
              ? "Perfect — you've mastered this set."
              : correctCount >= Math.ceil(sessionQuestions.length * 0.75)
                ? "Strong. Try the mock exam next."
                : "Re-read the chapter and try again."}
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            <button
              className="ud-btn ud-btn-secondary"
              onClick={() => setSeed((s) => s + 1)}
            >
              New questions
            </button>
            <Link
              href={`/study/${ch.slug}`}
              className="ud-btn ud-btn-ghost"
            >
              Re-read chapter
            </Link>
            {nextSlug ? (
              <Link
                href={`/practice/${nextSlug}`}
                className="ud-btn ud-btn-primary"
              >
                Practice next →
              </Link>
            ) : (
              <Link href="/mock-exam" className="ud-btn ud-btn-primary">
                Take mock exam
              </Link>
            )}
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-4">
            Or{" "}
            <Link href="/mock-exam" className="ud-link">
              jump to a full mock exam
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

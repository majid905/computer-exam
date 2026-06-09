"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserState, applyDailyStudy } from "@/lib/storage";
import {
  CHAPTER_EMOJI,
  officialPdfPageUrl,
} from "@/lib/content";
import { RequireAuth } from "@/components/app/RequireAuth";
import { useAuth } from "@/context/AuthContext";
import type { Chapter, ChapterSummary, Question } from "@/lib/types";

const FREE_CHAPTER_LIMIT = 2;

export default function StudyChapterClient({ slug }: { slug: string }) {
  return (
    <RequireAuth>
      <StudyChapterInner slug={slug} />
    </RequireAuth>
  );
}

function StudyChapterInner({ slug }: { slug: string }) {
  const router = useRouter();
  const [, update] = useUserState();
  const { subscription } = useAuth();
  const isPro = !!(subscription && subscription.status === "active");
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [summary, setSummary] = useState<ChapterSummary | null>(null);
  const [qs, setQs] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevTitle, setPrevTitle] = useState<string | null>(null);
  const [nextTitle, setNextTitle] = useState<string | null>(null);
  const [allChapters, setAllChapters] = useState<{slug: string; title: string}[]>([]);
  const [ttsState, setTtsState] = useState<"idle" | "speaking" | "paused">("idle");

  // Build the full text to speak from the chapter summary
  function buildSpeechText(title: string, s: ChapterSummary | null): string {
    if (!s) return title;
    const parts: string[] = [title + "."];
    if (s.intro) parts.push(s.intro);
    for (const section of s.sections ?? []) {
      parts.push(section.heading + ".");
      for (const pt of section.points ?? []) parts.push(pt);
    }
    return parts.join(" ");
  }

  function getVoice(): SpeechSynthesisVoice | null {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) =>
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("female")
      ) ?? voices.find((v) => v.lang.startsWith("en")) ?? null
    );
  }

  function speakChapter() {
    if (!chapter) return;
    window.speechSynthesis.cancel();
    const text = buildSpeechText(chapter.title, summary);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-CA";
    utter.rate = 1;
    const voice = getVoice();
    if (voice) utter.voice = voice;
    utter.onstart = () => setTtsState("speaking");
    utter.onend = () => setTtsState("idle");
    utter.onerror = () => setTtsState("idle");
    // If voices not ready yet, wait and retry once
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const v2 = getVoice();
        if (v2) utter.voice = v2;
        window.speechSynthesis.speak(utter);
        window.speechSynthesis.onvoiceschanged = null;
      };
    } else {
      window.speechSynthesis.speak(utter);
    }
    setTtsState("speaking");
  }

  function pauseSpeech() {
    window.speechSynthesis.pause();
    setTtsState("paused");
  }

  function resumeSpeech() {
    window.speechSynthesis.resume();
    setTtsState("speaking");
  }

  function stopSpeech() {
    window.speechSynthesis.cancel();
    setTtsState("idle");
  }

  // Stop speech when navigating away or changing chapter
  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, [slug]);

  // Load all chapters for navigation
  useEffect(() => {
    fetch("/api/chapters/")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setAllChapters(list.map((c: any) => ({ slug: c.slug, title: c.title })));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/chapters/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Chapter not found");
        return r.json();
      })
      .then((data) => {
        setChapter({ slug: data.slug, title: data.title, pageStart: 1, pageEnd: 10 });
        try {
          if (data.body) setSummary(JSON.parse(data.body));
        } catch {
          setSummary(null);
        }
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
        setQs(mappedQuestions);
        setLoading(false);

        // Mark as read in localStorage
        update((s) => {
          const next = applyDailyStudy(s);
          const cp = next.chapters[data.slug] ?? {
            read: false,
            practiceAttempts: 0,
            practiceCorrect: 0,
            practiceTotal: 0,
          };
          return {
            ...next,
            chapters: {
              ...next.chapters,
              [data.slug]: {
                ...cp,
                read: true,
                lastRead: new Date().toISOString(),
              },
            },
          };
        });

        // Save to database
        if (data.id) {
          fetch("/api/user-progress/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chapter_id: data.id,
              completed_questions: data.questions?.length ?? 1,
              total_questions: data.questions?.length ?? 1,
              percentage: 100,
            }),
          }).catch(() => {});
        }
      })
      .catch(() => setLoading(false));
  }, [slug, update]);

  const idx = chapter && allChapters.length ? allChapters.findIndex((c) => c.slug === chapter.slug) : -1;
  const prevSlug = idx > 0 ? allChapters[idx - 1]?.slug : undefined;
  const nextSlug = idx >= 0 && idx < allChapters.length - 1 ? allChapters[idx + 1]?.slug : undefined;

  useEffect(() => {
    if (prevSlug) {
      fetch(`/api/chapters/${prevSlug}`)
        .then((r) => r.json())
        .then((d) => setPrevTitle(d.title));
    } else {
      setPrevTitle(null);
    }
    if (nextSlug) {
      fetch(`/api/chapters/${nextSlug}`)
        .then((r) => r.json())
        .then((d) => setNextTitle(d.title));
    } else {
      setNextTitle(null);
    }
  }, [prevSlug, nextSlug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
        <p className="text-[var(--color-muted)]">Loading chapter...</p>
      </div>
    );
  }

  if (!chapter) {
    notFound();
  }

  // Block free users from chapters beyond the limit
  if (!isPro && idx >= FREE_CHAPTER_LIMIT) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center">
        <div className="mb-4 text-5xl">🔒</div>
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Pro Chapter
        </h1>
        <p className="mb-1 text-[var(--color-muted)]">
          <strong>{chapter.title}</strong> is available on the Pro plan.
        </p>
        <p className="mb-8 text-sm text-[var(--color-muted)]">
          Free plan includes the first {FREE_CHAPTER_LIMIT} chapters. Upgrade to unlock all {allChapters.length} chapters, practice questions, and mock exams.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/pricing" className="ud-btn ud-btn-primary">
            See Pro Plans
          </Link>
          <Link href="/study" className="ud-btn ud-btn-ghost">
            ← Back to chapters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <div className="text-sm text-[var(--color-muted)] mb-2">
        <Link href="/study" className="ud-link">
          Study
        </Link>{" "}
        / {chapter.title}
      </div>
      <header className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {CHAPTER_EMOJI[chapter.slug] ?? "📖"}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              Chapter {idx >= 0 ? idx + 1 : "?"} of {allChapters.length || "?"}
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {chapter.title}
            </h1>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={officialPdfPageUrl(1)}
            target="_blank"
            rel="noopener noreferrer"
            className="ud-btn ud-btn-ghost ud-btn-sm"
          >
            📄 Read the official IRCC PDF ↗
          </a>

          {ttsState === "idle" && (
            <button
              onClick={speakChapter}
              className="ud-btn ud-btn-ghost ud-btn-sm flex items-center gap-1.5"
              title="Listen to this chapter"
            >
              🔊 Listen
            </button>
          )}
          {ttsState === "speaking" && (
            <>
              <button
                onClick={pauseSpeech}
                className="ud-btn ud-btn-ghost ud-btn-sm flex items-center gap-1.5"
                title="Pause"
              >
                ⏸ Pause
              </button>
              <button
                onClick={stopSpeech}
                className="ud-btn ud-btn-ghost ud-btn-sm flex items-center gap-1.5 text-[var(--color-danger)]"
                title="Stop"
              >
                ⏹ Stop
              </button>
            </>
          )}
          {ttsState === "paused" && (
            <>
              <button
                onClick={resumeSpeech}
                className="ud-btn ud-btn-ghost ud-btn-sm flex items-center gap-1.5 text-[var(--color-brand)]"
                title="Resume"
              >
                ▶ Resume
              </button>
              <button
                onClick={stopSpeech}
                className="ud-btn ud-btn-ghost ud-btn-sm flex items-center gap-1.5 text-[var(--color-danger)]"
                title="Stop"
              >
                ⏹ Stop
              </button>
            </>
          )}
        </div>
      </header>

      {summary ? (
        <article className="space-y-7">
          <p className="text-[17px] leading-7 text-[var(--color-ink-2)] italic">
            {summary.intro}
          </p>
          {summary.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-lg font-extrabold tracking-tight text-[var(--color-ink)] mb-3">
                {s.heading}
              </h2>
              <ul className="space-y-2.5">
                {s.points.map((pt, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[16px] leading-7 text-[var(--color-ink-2)]"
                  >
                    <span
                      aria-hidden
                      className="shrink-0 mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      ) : (
        <article className="ud-card p-6 text-[var(--color-muted)]">
          <p>Content for this chapter is being prepared.</p>
        </article>
      )}

      <section className="mt-10 ud-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">
              Ready to practice?
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              {qs.length} questions on this chapter with explanations & citations.
            </p>
          </div>
          <Link
            href={`/practice/${chapter.slug}`}
            className="ud-btn ud-btn-primary"
          >
            Start practice
          </Link>
        </div>
      </section>

      <nav className="mt-10 flex items-center justify-between gap-3">
        {prevSlug && prevTitle ? (
          <button
            className="ud-btn ud-btn-ghost ud-btn-sm"
            onClick={() => router.push(`/study/${prevSlug}`)}
          >
            ← {prevTitle}
          </button>
        ) : (
          <span />
        )}
        {nextSlug && nextTitle ? (
          <button
            className="ud-btn ud-btn-primary ud-btn-sm"
            onClick={() => router.push(`/study/${nextSlug}`)}
          >
            {nextTitle} →
          </button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

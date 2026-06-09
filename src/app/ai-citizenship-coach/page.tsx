import type { Metadata } from "next";
import Link from "next/link";
import { SeoQuizClient } from "@/components/seo/SeoQuizClient";
import { SEO_QUESTIONS } from "@/lib/seoQuestions";

export const metadata: Metadata = {
  title: "AI Citizenship Coach — Smart Study Tips for the Canadian Citizenship Test | PassPilot",
  description:
    "Use AI-powered study techniques to prepare for the Canadian citizenship test. Spaced repetition, weak area targeting, and the most effective practice strategies.",
  alternates: { canonical: "https://www.passpilot.ca/ai-citizenship-coach" },
  openGraph: {
    title: "AI Citizenship Coach — Smart Study Tips for the Canadian Citizenship Test",
    description: "AI-powered study techniques and strategies for passing the Canadian citizenship test efficiently.",
    url: "https://www.passpilot.ca/ai-citizenship-coach",
    siteName: "PassPilot",
    type: "website",
  },
};

const questions = SEO_QUESTIONS["ai-citizenship-coach"];

export default function AiCitizenshipCoachPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* TOP SECTION */}
      <article className="mb-12">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
          AI Study Coach
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
          AI Citizenship Coach: The Smartest Way to Study for the Citizenship Test
        </h1>
        <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
          Not all study methods are equal. The science of learning has identified specific techniques
          that are dramatically more effective than simply re-reading material. This guide explains
          the most powerful evidence-based study strategies — the same ones that power PassPilot's
          adaptive learning engine.
        </p>

        {/* Key facts strip */}
        <div className="grid grid-cols-3 gap-3 mb-8 text-center">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">20</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Questions</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">75%</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Pass Score</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-2xl font-extrabold text-[var(--color-brand)]">45 min</p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Time Limit</p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-[var(--color-ink-2)]">
          <h2 className="text-xl font-bold text-[var(--color-ink)]">Strategy 1: Spaced Repetition</h2>
          <p>
            Spaced repetition is the most scientifically validated study technique. The idea is simple:
            instead of reviewing all material once, you review facts at increasing intervals — 1 day,
            3 days, 7 days, 14 days, 30 days. Each review reinforces the memory trace, moving information
            from short-term to long-term memory.
          </p>
          <p>
            For citizenship test prep, this means: after studying a chapter, review your notes the
            next day. Three days later, review again. A week later, test yourself with questions from
            that chapter. This pattern takes more time than a single cram session, but retention is
            dramatically higher — you'll remember the facts on test day rather than forgetting them
            the night before.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Strategy 2: Retrieval Practice (Testing Effect)</h2>
          <p>
            Every time you try to retrieve a memory — by answering a question or writing down what
            you remember without looking — you strengthen that memory. This is called the "testing
            effect" and it is far more effective than re-reading.
          </p>
          <p>
            In practice: after reading a chapter of Discover Canada, close the book and try to write
            down the 5–10 most important facts from memory. Then check what you missed. This active
            struggle to recall is what builds strong, reliable memory.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Strategy 3: Interleaved Practice</h2>
          <p>
            Most people study one topic at a time: all history, then all government, then all rights.
            Research shows that <strong>mixing topics</strong> during practice — called interleaving —
            produces significantly better long-term retention, even though it feels harder in the moment.
          </p>
          <p>
            For citizenship test prep, this means: don't do 50 history questions in a row. Instead,
            mix history, government, and rights questions together. This forces your brain to retrieve
            each piece of information from scratch, which builds stronger and more flexible knowledge.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Strategy 4: Target Your Weak Areas First</h2>
          <p>
            It's tempting to practice topics you already know well, because it feels good to get
            questions right. But smart studying means spending the most time on topics where you
            get questions wrong. Every incorrect answer on a practice quiz is valuable information —
            it tells you exactly where to focus.
          </p>
          <p>
            After taking a mock exam, sort your wrong answers by topic. If you got 3 government
            questions wrong and 0 history questions wrong, spend 80% of your next study session on
            government. This targeted approach is far more efficient than uniform review.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Strategy 5: Elaborative Interrogation</h2>
          <p>
            When you learn a new fact, ask yourself "Why?" and "How does this connect to what I
            already know?" For example: "Why does the Senate have 105 seats?" (Because Canada's
            regions needed balanced representation when the Senate was created.) Connecting facts
            to reasons and context creates a richer memory network that is much harder to forget.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">How PassPilot's AI Coach Works</h2>
          <p>
            PassPilot tracks every question you answer and uses your performance data to:
          </p>
          <ul>
            <li>Identify topics where you have gaps in knowledge</li>
            <li>Schedule review of weak topics at optimal spaced intervals</li>
            <li>Increase question difficulty progressively as you improve</li>
            <li>Generate a personalized study plan based on your test date</li>
            <li>Show you explanations that connect facts to their broader context</li>
          </ul>
          <p>
            This AI-powered approach takes the guesswork out of studying. Instead of wondering
            "what should I study today?", PassPilot tells you exactly which topics need your attention.
          </p>

          <h2 className="text-xl font-bold text-[var(--color-ink)]">Frequently Asked Questions</h2>
          <h3 className="font-semibold text-[var(--color-ink)]">How long does it take to prepare with AI coaching?</h3>
          <p>
            Most PassPilot users who study consistently for 2–3 weeks (30–45 minutes per day)
            feel confident and ready for the citizenship test. Users who study more intensively
            for 1–2 weeks also do well. The key is consistency — short daily sessions are more
            effective than a single long cram session.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">Does AI coaching replace reading Discover Canada?</h3>
          <p>
            No — reading Discover Canada is still essential. AI coaching supplements your reading
            by turning it into active practice and ensuring you review the right things at the
            right time. Think of the guide as your textbook and PassPilot as your tutor.
          </p>
          <h3 className="font-semibold text-[var(--color-ink)]">What if I score 85% on every practice test? Am I ready?</h3>
          <p>
            Consistently scoring 85%+ is an excellent sign. Continue reviewing any topics where you
            still make mistakes, even occasionally. The real test may phrase questions slightly
            differently, so understanding concepts deeply — not just memorizing answers — is the goal.
          </p>
        </div>
      </article>

      {/* MIDDLE SECTION */}
      <section className="mb-12">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)] mb-2">
            Free Practice Test
          </p>
          <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">
            Try 5 Study Strategy Questions
          </h2>
          <p className="text-[var(--color-muted)] mt-1">
            Test your knowledge of what to study, how to study, and how to know when you are ready for the real test.
          </p>
        </div>
        <SeoQuizClient questions={questions} />
      </section>

      <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-center">
        <p className="font-bold text-[var(--color-ink)] mb-2">Let AI guide your study plan</p>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          PassPilot tracks your progress and tells you exactly what to study each day to pass the citizenship test efficiently.
        </p>
        <Link
          href="/register"
          className="inline-block rounded-lg bg-[var(--color-brand)] px-6 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
        >
          Start AI-Powered Study
        </Link>
      </div>
    </div>
  );
}

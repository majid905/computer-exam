import { CHAPTER_ORDER } from "@/lib/content";
import StudyChapterClient from "./StudyChapterClient";

export function generateStaticParams() {
  return CHAPTER_ORDER.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <StudyChapterClient slug={slug} />;
}

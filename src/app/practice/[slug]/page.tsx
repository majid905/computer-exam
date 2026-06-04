import PracticeChapterClient from "./PracticeChapterClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PracticeChapterClient slug={slug} />;
}

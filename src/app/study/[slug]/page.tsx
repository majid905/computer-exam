import StudyChapterClient from "./StudyChapterClient";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <StudyChapterClient slug={slug} />;
}

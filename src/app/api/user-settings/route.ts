import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getSettingsByUserId, upsertSettings, getLanguageByCode, getProvinceByCode } from "@/lib/backend";
import { query } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSettingsByUserId(auth.userId);
  if (!settings) {
    return NextResponse.json({
      theme: "system",
      language: "en",
      province: null,
      test_date: null,
      baseline_score: null,
    });
  }

  // Reverse-map IDs to codes
  const langRows = await query<any>("SELECT code FROM languages WHERE id = ?", [settings.language_id]);
  const provRows = await query<any>("SELECT code FROM provinces WHERE id = ?", [settings.province_id]);

  return NextResponse.json({
    theme: settings.theme_style,
    language: langRows[0]?.code ?? "en",
    province: provRows[0]?.code ?? null,
    test_date: settings.test_date,
    baseline_score: settings.result ? parseInt(settings.result, 10) : null,
  });
}

export async function PUT(request: Request) {
  const auth = await getAuthUser();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Map codes to IDs
  let languageId = null;
  let provinceId = null;
  if (body.language) {
    const lang = await getLanguageByCode(body.language);
    if (lang) languageId = lang.id;
  }
  if (body.province) {
    const prov = await getProvinceByCode(body.province);
    if (prov) provinceId = prov.id;
  }

  await upsertSettings({
    user_id: auth.userId,
    theme_style: body.theme,
    language_id: languageId,
    province_id: provinceId,
    test_date: body.test_date ?? null,
    result: body.baseline_score != null ? String(body.baseline_score) : null,
  });

  return NextResponse.json({ message: "Settings saved" });
}

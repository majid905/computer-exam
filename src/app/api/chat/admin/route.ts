import { NextResponse } from "next/server";
import { getAuthUser, unauthorizedResponse } from "@/lib/auth";
import { getAdminUser } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const auth = await getAuthUser();
  if (!auth) return unauthorizedResponse();

  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "No admin found" }, { status: 404 });
  }

  return NextResponse.json({ id: admin.id, full_name: admin.full_name });
}

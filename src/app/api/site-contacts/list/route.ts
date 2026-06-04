import { NextResponse } from "next/server";
import { listSiteContacts } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const contacts = await listSiteContacts();
    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error("[GET /api/site-contacts/list] error:", error);
    return NextResponse.json({ error: "Failed to fetch site contacts" }, { status: 500 });
  }
}

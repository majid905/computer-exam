import { NextResponse } from "next/server";
import { listSiteContacts, createSiteContact, getActiveSiteContact } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const contact = await getActiveSiteContact();
    return NextResponse.json(contact ?? {});
  } catch (error: any) {
    console.error("[GET /api/site-contacts] error:", error);
    return NextResponse.json({ error: "Failed to fetch site contacts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = await createSiteContact(body);
    return NextResponse.json({ id, message: "Site contact created" }, { status: 201 });
  } catch (error: any) {
    console.error("[POST /api/site-contacts] error:", error);
    return NextResponse.json({ error: error.message || "Failed to create site contact" }, { status: 500 });
  }
}

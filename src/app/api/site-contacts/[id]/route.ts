import { NextResponse } from "next/server";
import { getSiteContactById, updateSiteContact, deleteSiteContact } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const contact = await getSiteContactById(Number(id));
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(contact);
  } catch (error: any) {
    console.error("[GET /api/site-contacts/[id]] error:", error);
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await updateSiteContact(Number(id), body);
    return NextResponse.json({ message: "Contact updated" });
  } catch (error: any) {
    console.error("[PUT /api/site-contacts/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to update contact" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteSiteContact(Number(id));
    return NextResponse.json({ message: "Contact deleted" });
  } catch (error: any) {
    console.error("[DELETE /api/site-contacts/[id]] error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete contact" }, { status: 500 });
  }
}

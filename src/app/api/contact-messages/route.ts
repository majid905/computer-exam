import { NextResponse } from "next/server";
import {
  createContactMessage,
  listContactMessages,
  getActiveSiteContact,
} from "@/lib/backend";
import { sendEmail, contactNotificationEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function GET() {
  const messages = await listContactMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createContactMessage(body);

  // Notify the site's contact inbox (currently info@techplato.com, configurable
  // via Admin → site contacts). Best-effort: a send failure must not fail the
  // submission — the message is already saved to the DB.
  try {
    const contact = await getActiveSiteContact();
    const to = contact?.email || "info@techplato.com";
    const { subject, html, text } = contactNotificationEmail(body);
    await sendEmail({
      to,
      subject,
      html,
      text,
      replyTo: typeof body?.email === "string" ? body.email : undefined,
    });
  } catch (err) {
    console.error("Failed to send contact notification email", err);
  }

  return NextResponse.json({ id, message: "Contact message sent successfully" }, { status: 201 });
}

import { NextResponse } from "next/server";
import { getContactMessageById, replyContactMessage } from "@/lib/backend";

export const runtime = "nodejs";

async function sendReplyEmail(to: string, name: string, subject: string, reply: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const siteName = process.env.SITE_NAME || "PassPilot";
  const fromEmail = process.env.REPLY_FROM_EMAIL || "noreply@passpilot.ca";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${siteName} <${fromEmail}>`,
      to: [to],
      subject: `Re: ${subject || "Your message"}`,
      html: `<p>Hi ${name},</p>
<p>Thank you for reaching out. Here is our reply to your message:</p>
<blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#555">${reply.replace(/\n/g, "<br>")}</blockquote>
<p>If you have further questions, feel free to reply to this email.</p>
<p>Best regards,<br>${siteName} Team</p>`,
    }),
  });
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await getContactMessageById(Number(id));
  if (!message) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(message);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  if (body.reply !== undefined) {
    await replyContactMessage(Number(id), body.reply);

    const message = await getContactMessageById(Number(id));
    if (message?.email) {
      try {
        await sendReplyEmail(message.email, message.name, message.subject || "", body.reply);
      } catch {
        // Email failure should not break the API response
      }
    }

    return NextResponse.json({ message: "Reply sent" });
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

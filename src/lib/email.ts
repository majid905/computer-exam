// Email delivery via Resend's HTTP API (works on the Cloudflare Workers runtime).
// Configure with RESEND_API_KEY (secret) and RESEND_FROM (e.g. "PassPilot <noreply@passpilot.ca>").

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, text, replyTo }: SendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "PassPilot <onboarding@resend.dev>";

  if (!apiKey) {
    // No provider configured yet — log so the flow still works in dev/preview.
    console.warn(`[email] RESEND_API_KEY not set; would send to ${to}: ${subject}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text: text ?? undefined,
      reply_to: replyTo ?? undefined,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${body}`);
  }
}

export function passwordResetEmail(resetUrl: string): { subject: string; html: string; text: string } {
  const subject = "Reset your PassPilot password";
  const text = `Reset your PassPilot password using this link (valid for 1 hour):\n\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`;
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#1a1a1a">
    <h1 style="font-size:22px;margin:0 0 8px">Reset your password</h1>
    <p style="color:#555;font-size:14px;line-height:1.5">
      We received a request to reset your PassPilot password. Click the button below to choose a new one. This link is valid for 1 hour.
    </p>
    <p style="margin:24px 0">
      <a href="${resetUrl}" style="background:#e11d2a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:700;display:inline-block">Reset password</a>
    </p>
    <p style="color:#888;font-size:12px;line-height:1.5">
      If the button doesn't work, paste this link into your browser:<br>
      <a href="${resetUrl}" style="color:#e11d2a;word-break:break-all">${resetUrl}</a>
    </p>
    <p style="color:#888;font-size:12px;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
  </div>`;
  return { subject, html, text };
}

type ContactSubmission = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function esc(s: string): string {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );
}

export function contactNotificationEmail(
  sub: ContactSubmission,
): { subject: string; html: string; text: string } {
  const name = sub.name || "Someone";
  const subjectLine = sub.subject?.trim() || "New contact form submission";
  const subject = `[PassPilot contact] ${subjectLine}`;
  const rows: [string, string | undefined][] = [
    ["Name", sub.name],
    ["Email", sub.email],
    ["Phone", sub.phone],
    ["Subject", sub.subject],
  ];
  const text =
    `New contact form submission from ${name}:\n\n` +
    rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${sub.message ?? ""}\n`;
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#1a1a1a">
    <h1 style="font-size:20px;margin:0 0 16px">New contact form submission</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .filter(([, v]) => v)
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;color:#1a1a1a">${esc(v as string)}</td></tr>`,
        )
        .join("")}
    </table>
    <div style="margin-top:16px;padding:16px;background:#f7f9fa;border-radius:8px;font-size:14px;line-height:1.5;white-space:pre-wrap">${esc(sub.message ?? "")}</div>
    ${sub.email ? `<p style="color:#888;font-size:12px;margin-top:16px">Reply directly to this email to respond to ${esc(sub.email)}.</p>` : ""}
  </div>`;
  return { subject, html, text };
}

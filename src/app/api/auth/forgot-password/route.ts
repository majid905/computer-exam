import { NextResponse } from "next/server";
import { getUserByEmail, createPasswordReset } from "@/lib/backend";
import { generateToken, sha256Hex } from "@/lib/auth";
import { sendEmail, passwordResetEmail } from "@/lib/email";

export const runtime = "nodejs";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request: Request) {
  try {
    const { email } = await request.json().catch(() => ({}));
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalized = email.trim().toLowerCase();
    const user = await getUserByEmail(normalized);

    // Only send if the account exists — but always return the same response so
    // we never reveal whether an email is registered.
    if (user) {
      const token = generateToken();
      const tokenHash = await sha256Hex(token);
      const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      await createPasswordReset(normalized, tokenHash, expiresAt);

      const origin = new URL(request.url).origin;
      const resetUrl = `${origin}/reset-password?token=${token}&email=${encodeURIComponent(normalized)}`;
      const { subject, html, text } = passwordResetEmail(resetUrl);
      try {
        await sendEmail({ to: normalized, subject, html, text });
      } catch (err) {
        console.error("Failed to send reset email", err);
      }
    }

    return NextResponse.json({
      message: "If an account exists for that email, a reset link has been sent.",
    });
  } catch (err) {
    console.error("forgot-password error", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

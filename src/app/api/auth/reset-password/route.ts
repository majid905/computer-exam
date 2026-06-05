import { NextResponse } from "next/server";
import {
  getUserByEmail,
  getValidPasswordReset,
  deletePasswordResetsForEmail,
  updateUserPassword,
} from "@/lib/backend";
import { hashPassword, sha256Hex } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email, token, password } = await request.json().catch(() => ({}));

    if (!email || !token || !password) {
      return NextResponse.json(
        { error: "Email, token, and password are required" },
        { status: 400 },
      );
    }
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const normalized = String(email).trim().toLowerCase();
    const tokenHash = await sha256Hex(String(token));
    const nowStr = new Date().toISOString().slice(0, 19).replace("T", " ");

    const reset = await getValidPasswordReset(normalized, tokenHash, nowStr);
    if (!reset) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired." },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(normalized);
    if (!user) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const passwordHash = await hashPassword(password);
    await updateUserPassword(user.id, passwordHash);
    await deletePasswordResetsForEmail(normalized);

    return NextResponse.json({ message: "Password updated. You can now sign in." });
  } catch (err) {
    console.error("reset-password error", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

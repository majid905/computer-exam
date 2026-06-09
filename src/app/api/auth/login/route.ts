import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/backend";
import { verifyPassword, createToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.status !== "active") {
      return NextResponse.json(
        { error: "Account is inactive. Please contact support." },
        { status: 403 }
      );
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Update last login
    const { updateUser } = await import("@/lib/backend");
    await updateUser(user.id, {
      last_login_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    const { password: _pw, ...safeUser } = user;

    // Set cookie directly on the response — next/headers cookies().set()
    // does not attach to the response on Cloudflare Workers
    const response = NextResponse.json({
      user: safeUser,
      token,
      message: "Login successful",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}

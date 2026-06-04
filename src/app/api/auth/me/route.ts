import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getUserById } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserById(auth.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status !== "active") {
      return NextResponse.json({ error: "Account is inactive" }, { status: 401 });
    }

    const { password, ...safeUser } = user as any;
    return NextResponse.json({ user: safeUser });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}

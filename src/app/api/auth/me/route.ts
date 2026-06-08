import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getUserById } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    // "Not logged in" is a valid answer, not an error — return 200 with a null
    // user so the client can render the guest UI without a console 401.
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ user: null });
    }

    const user = await getUserById(auth.userId);
    if (!user || user.status !== "active") {
      return NextResponse.json({ user: null });
    }

    // Never expose the password hash. JSON.stringify drops `undefined` keys.
    return NextResponse.json({ user: { ...user, password: undefined } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

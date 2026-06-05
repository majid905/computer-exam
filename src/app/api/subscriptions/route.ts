import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getSubscriptionsByUser } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscriptions = await getSubscriptionsByUser(auth.userId);
    return NextResponse.json({ subscriptions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch subscriptions" }, { status: 500 });
  }
}

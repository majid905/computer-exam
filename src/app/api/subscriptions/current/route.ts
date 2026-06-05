import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getActiveSubscriptionByUser } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await getActiveSubscriptionByUser(auth.userId);
    return NextResponse.json({ subscription: subscription || null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch subscription" }, { status: 500 });
  }
}

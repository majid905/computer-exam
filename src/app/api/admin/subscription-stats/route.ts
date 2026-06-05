import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getSubscriptionStats, getSubscribedUsers } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await getAuthUser();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const stats = await getSubscriptionStats();
    const users = await getSubscribedUsers();

    return NextResponse.json({ stats, users });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch subscription stats" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getPricingPlanById, createSubscription, getActiveSubscriptionByUser } from "@/lib/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan_id } = await request.json();
    if (!plan_id) {
      return NextResponse.json({ error: "Plan ID is required" }, { status: 400 });
    }

    const plan = await getPricingPlanById(Number(plan_id));
    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    if (plan.discount_price_monthly > 0) {
      return NextResponse.json({ error: "This plan requires payment" }, { status: 400 });
    }

    const existing = await getActiveSubscriptionByUser(auth.userId);
    if (existing) {
      return NextResponse.json({ message: "Already subscribed", subscription: existing });
    }

    const now = new Date();
    const end = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

    const id = await createSubscription({
      user_id: auth.userId,
      pricing_plan_id: plan.id,
      start_date: now.toISOString(),
      end_date: end.toISOString(),
      payment_status: "free",
      status: "active",
    });

    return NextResponse.json({ id, message: "Free subscription activated" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to activate subscription" }, { status: 500 });
  }
}

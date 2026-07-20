import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  getStripeConfig,
  createPayment,
  createSubscription,
  getPricingPlanById,
  getActiveSubscriptionByUser,
} from "@/lib/backend";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const existing = await getActiveSubscriptionByUser(auth.userId);
    if (existing) {
      return NextResponse.json({ message: "Subscription already active", subscription: existing });
    }

    const stripeConfig = await getStripeConfig();
    if (!stripeConfig || !stripeConfig.secret_key || stripeConfig.status !== "active") {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 400 });
    }

    const stripe = new Stripe(stripeConfig.secret_key, {
      apiVersion: "2026-05-27.dahlia",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const userId = Number(session.client_reference_id || session.metadata?.user_id);
    const planId = Number(session.metadata?.plan_id);

    if (userId !== auth.userId) {
      return NextResponse.json({ error: "Session does not belong to you" }, { status: 403 });
    }

    if (!planId) {
      return NextResponse.json({ error: "Missing plan info" }, { status: 400 });
    }

    const amount = (session.amount_total || 0) / 100;
    const currency = session.currency?.toUpperCase() || "CAD";

    await createPayment({
      user_id: userId,
      subscription_id: null,
      amount,
      currency,
      payment_method: "card",
      transaction_id: session.id,
      gateway_response: JSON.stringify({ id: session.id, payment_status: session.payment_status }),
      status: "completed",
    });

    const now = new Date();
    const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    await createSubscription({
      user_id: userId,
      pricing_plan_id: planId,
      start_date: now.toISOString(),
      end_date: end.toISOString(),
      payment_status: "paid",
      status: "active",
    });

    const sub = await getActiveSubscriptionByUser(userId);
    return NextResponse.json({ message: "Subscription activated", subscription: sub });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to confirm payment" }, { status: 500 });
  }
}

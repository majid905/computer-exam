import { NextResponse } from "next/server";
import { getStripeConfig, createPayment, createSubscription, getPricingPlanById } from "@/lib/backend";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const stripeConfig = await getStripeConfig();
    if (!stripeConfig || !stripeConfig.secret_key) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
    }

    const stripe = new Stripe(stripeConfig.secret_key, { apiVersion: "2026-05-27.dahlia" });
    const payload = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event: Stripe.Event;
    const isDev = process.env.NODE_ENV === "development";
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (isDev && !webhookSecret) {
      // Development without webhook secret: parse body directly (Stripe CLI not required)
      try {
        event = JSON.parse(payload) as Stripe.Event;
      } catch {
        return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
      }
    } else {
      if (!sig) {
        return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
      }
      const secret = webhookSecret || stripeConfig.secret_key;
      try {
        event = stripe.webhooks.constructEvent(payload, sig, secret);
      } catch (err: any) {
        return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
      }
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = Number(session.client_reference_id || session.metadata?.user_id);
      const planId = Number(session.metadata?.plan_id);
      const amount = (session.amount_total || 0) / 100;

      if (!userId || !planId) {
        return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
      }

      const plan = await getPricingPlanById(planId);
      const currency = session.currency?.toUpperCase() || "CAD";

      const paymentId = await createPayment({
        user_id: userId,
        subscription_id: null,
        amount,
        currency,
        payment_method: "card",
        transaction_id: session.id,
        gateway_response: JSON.stringify(session),
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
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Webhook processing failed" }, { status: 500 });
  }
}

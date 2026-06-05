import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getStripeConfig, getPricingPlanById } from "@/lib/backend";
import Stripe from "stripe";

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

    const stripeConfig = await getStripeConfig();
    if (!stripeConfig || !stripeConfig.secret_key || stripeConfig.status !== "active") {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 400 });
    }

    // On the Cloudflare Workers runtime the Stripe SDK must use the Fetch-based
    // HTTP client; the default Node client cannot make outbound requests and hangs.
    const stripe = new Stripe(stripeConfig.secret_key, {
      apiVersion: "2026-05-27.dahlia",
      httpClient: Stripe.createFetchHttpClient(),
    });
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      // 2026 "dahlia" API: embedded checkout ui_mode is "embedded_page".
      ui_mode: "embedded_page",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: plan.title,
              description: plan.description || undefined,
            },
            unit_amount: Math.round(plan.discount_price_monthly * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Embedded checkout returns the customer to this URL inside the app after payment.
      return_url: `${origin}/settings?subscription=success&session_id={CHECKOUT_SESSION_ID}`,
      client_reference_id: String(auth.userId),
      metadata: {
        plan_id: String(plan.id),
        user_id: String(auth.userId),
      },
    });

    // clientSecret drives the embedded <EmbeddedCheckout/> on the client.
    return NextResponse.json({ clientSecret: session.client_secret, sessionId: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}

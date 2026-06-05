import { NextResponse } from "next/server";
import { getStripeConfig } from "@/lib/backend";

export const runtime = "nodejs";

// Public: returns only the Stripe *publishable* key (safe to expose) so the
// client can initialise Stripe.js for embedded checkout. Never returns the secret.
export async function GET() {
  const config = await getStripeConfig();
  return NextResponse.json({
    publishableKey: config?.publishable_key ?? null,
    enabled: !!(config?.publishable_key && config?.status === "active"),
  });
}

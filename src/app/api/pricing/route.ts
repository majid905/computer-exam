import { NextResponse } from "next/server";
import { listPricingPlans, getFeaturesByPlanId, createPricingPlan } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const plans = await listPricingPlans();
  const plansWithFeatures = await Promise.all(
    plans.map(async (plan) => {
      const features = await getFeaturesByPlanId(plan.id);
      return {
        ...plan,
        features: features.map((f) => f.feature),
        price_cents: Math.round(plan.discount_price_monthly * 100),
        currency: "CAD",
        interval: "monthly",
      };
    }),
  );
  return NextResponse.json(plansWithFeatures);
}

export async function POST(request: Request) {
  const body = await request.json();
  const id = await createPricingPlan(body);
  return NextResponse.json({ id, message: "Pricing plan created" }, { status: 201 });
}

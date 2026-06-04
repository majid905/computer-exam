import { NextResponse } from "next/server";
import { getPricingPlanById, updatePricingPlan, getFeaturesByPlanId } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await getPricingPlanById(Number(id));
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }
  const features = await getFeaturesByPlanId(plan.id);
  return NextResponse.json({ ...plan, features: features.map((f) => f.feature) });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await updatePricingPlan(Number(id), body);
  return NextResponse.json({ message: "Pricing plan updated" });
}

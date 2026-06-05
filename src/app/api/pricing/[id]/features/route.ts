import { NextResponse } from "next/server";
import { getFeaturesByPlanId, createPricingFeature, deletePricingFeature } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const features = await getFeaturesByPlanId(Number(id));
  return NextResponse.json(features);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const featureId = await createPricingFeature({ pricing_plan_id: Number(id), feature: body.feature });
  return NextResponse.json({ id: featureId, message: "Feature added" }, { status: 201 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  await deletePricingFeature(Number(body.feature_id));
  return NextResponse.json({ message: "Feature removed" });
}

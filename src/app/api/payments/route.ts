import { NextResponse } from "next/server";
import { listPayments } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const payments = await listPayments();
  return NextResponse.json(payments);
}

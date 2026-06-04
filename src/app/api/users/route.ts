import { NextResponse } from "next/server";
import { listUsers } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const users = await listUsers();
  return NextResponse.json(users);
}

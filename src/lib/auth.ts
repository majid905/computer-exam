import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "passpilot-default-secret-key-change-in-production"
);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(payload: { userId: number; email: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ userId: number; email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return payload as { userId: number; email: string; role: string };
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<{ userId: number; email: string; role: string } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

// Generate a URL-safe random token (hex). Uses Web Crypto (workerd-compatible).
export function generateToken(bytes = 32): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

// SHA-256 hex digest of a string (for storing reset tokens hashed, never raw).
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return Response.json({ error: "Forbidden" }, { status: 403 });
}

import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "serdivan_admin_session";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    "change-this-secret-in-env-local"
  );
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function isAdminConfigured() {
  return Boolean(getAdminPassword());
}

export function createAdminSessionToken() {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(`admin-session:${getAdminPassword()}`)
    .digest("hex");
}

export function validateAdminPassword(password: string) {
  const expected = getAdminPassword();

  if (!expected) {
    return false;
  }

  return safeCompare(password, expected);
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function isAdminAuthenticated() {
  if (!isAdminConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  return safeCompare(token, createAdminSessionToken());
}

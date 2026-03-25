import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminConfigured,
  validateAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string } | null;
  const password = body?.password?.trim() ?? "";

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD tanımlı değil." },
      { status: 400 },
    );
  }

  if (!password || !validateAdminPassword(password)) {
    return NextResponse.json(
      { error: "Şifre hatalı." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    ADMIN_SESSION_COOKIE,
    createAdminSessionToken(),
    getAdminSessionCookieOptions(),
  );

  return response;
}

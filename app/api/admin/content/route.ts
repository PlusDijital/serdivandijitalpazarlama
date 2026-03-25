import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCmsData, saveCmsData } from "@/lib/cms";
import type { CmsData } from "@/lib/cms-types";

export const runtime = "nodejs";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const cms = await getCmsData();
  return NextResponse.json(cms);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const body = (await request.json()) as CmsData | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Geçersiz içerik verisi." }, { status: 400 });
  }

  await saveCmsData(body);

  revalidatePath("/");
  revalidatePath("/hakkimizda");
  revalidatePath("/hizmetler");
  revalidatePath("/hizmetler/[slug]", "page");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/iletisim");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}

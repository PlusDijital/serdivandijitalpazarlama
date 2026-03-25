import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/avif",
  "image/gif",
]);

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 400 });
  }

  if (!allowedMimeTypes.has(file.type)) {
    return NextResponse.json(
      { error: "Yalnızca görsel dosyaları yüklenebilir." },
      { status: 400 },
    );
  }

  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Dosya boyutu 8MB sınırını aşıyor." },
      { status: 400 },
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const sanitized = sanitizeFileName(file.name);
  const filename = `${Date.now()}-${sanitized || "image"}`;
  const filepath = path.join(uploadsDir, filename);

  await mkdir(uploadsDir, { recursive: true });
  await writeFile(filepath, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({
    ok: true,
    url: `/uploads/${filename}`,
  });
}

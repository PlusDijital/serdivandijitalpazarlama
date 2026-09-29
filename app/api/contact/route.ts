import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  area?: string;
  service?: string;
  message?: string;
  website?: string;
  consent?: string;
  turnstileToken?: string;
};

type Env = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

// Worker örneği başına basit hız sınırı; kötüye kullanımı yavaşlatmak için yeterli.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function readEnv(): Promise<Env> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return env as unknown as Env;
  } catch {
    return process.env as Env;
  }
}

async function verifyTurnstile(secret: string, token: string, ip: string) {
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const json = (await res.json()) as { success?: boolean };
  return Boolean(json.success);
}

export async function POST(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Bal küpü doluysa bot: sessizce başarılı gibi dön.
  if (clean(payload.website)) {
    return Response.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const phone = clean(payload.phone, 40);
  const company = clean(payload.company, 160);
  const area = clean(payload.area, 120);
  const service = clean(payload.service, 120);
  const message = clean(payload.message, 3000);

  if (!name || !email || !company || !service || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const env = await readEnv();

  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(payload.turnstileToken, 2048);
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
      return Response.json({ ok: false, error: "turnstile" }, { status: 400 });
    }
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("contact: RESEND_API_KEY veya CONTACT_TO_EMAIL tanımlı değil");
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Ad Soyad", name],
    ["E-posta", email],
    ["Telefon", phone || "-"],
    ["İşletme", company],
    ["İlçe / mahalle", area || "-"],
    ["Hizmet", service],
  ];

  const html = `
    <h2 style="font-family:sans-serif">Yeni teklif talebi: ${escapeHtml(service)}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#555"><strong>${label}</strong></td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;white-space:pre-wrap;margin-top:16px">${escapeHtml(message)}</p>
    <p style="font-family:sans-serif;color:#888;font-size:12px">Kaynak: serdivanreklamajansi.com iletişim formu · IP: ${escapeHtml(ip)}</p>
  `;

  const text = `${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\n${message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL ?? "Serdivan Reklam Ajansı <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Yeni teklif talebi — ${service} — ${company}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("contact: Resend hatası", res.status, await res.text());
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}

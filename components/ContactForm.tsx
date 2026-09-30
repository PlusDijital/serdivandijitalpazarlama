"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { CheckCircle, Send } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import type { ContactFormContent } from "@/lib/cms-types";

type Status = "idle" | "loading" | "success" | "whatsapp" | "error";

/** Form bilgilerinden WhatsApp mesajı: e-posta çalışmasa bile talep kaybolmaz. */
function leadMessage(p: Record<string, FormDataEntryValue>) {
  const v = (k: string) => String(p[k] ?? "").trim();
  return [
    "Merhaba, serdivanreklamajansi.com üzerinden teklif istiyorum.",
    `Ad Soyad: ${v("name")}`,
    `İşletme: ${v("company")}`,
    v("area") && `Bölge: ${v("area")}`,
    `Hizmet: ${v("service")}`,
    v("phone") && `Telefon: ${v("phone")}`,
    `E-posta: ${v("email")}`,
    v("message") && `Mesaj: ${v("message")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

const inputClass =
  "w-full min-h-12 rounded-lg border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export default function ContactForm({ form, whatsapp }: { form: ContactFormContent; whatsapp?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [waLink, setWaLink] = useState("");
  const [token, setToken] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    const wa = whatsapp ? whatsappUrl(whatsapp, leadMessage(payload)) : "";
    setWaLink(wa);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, turnstileToken: token }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("success");
      // Cloudflare Zaraz etkinse (Google Ads / GA4 dönüşümü) olayı gönder; yoksa hiçbir şey yapmaz.
      (window as unknown as { zaraz?: { track: (e: string, p?: object) => void } }).zaraz?.track("generate_lead", {
        service: String(payload.service ?? ""),
      });
    } catch {
      // E-posta gönderilemezse talebi WhatsApp mesajı olarak ilet.
      if (wa) {
        setStatus("whatsapp");
        window.location.href = wa;
      } else {
        setStatus("error");
      }
    }
  }

  if (status === "whatsapp") {
    return (
      <div role="status" className="mt-6 rounded-[var(--radius-card)] bg-accent-soft p-8 text-center">
        <WhatsAppIcon size={40} className="mx-auto text-[#0f7a40]" />
        <h3 className="mt-4 text-xl font-extrabold text-ink">{"WhatsApp'a yönlendiriliyorsunuz"}</h3>
        <p className="mt-2 text-[0.9375rem] leading-7 text-ink-soft">
          Bilgileriniz hazır bir mesaj olarak açılıyor; göndermeniz yeterli. Açılmazsa aşağıdaki düğmeye dokunun.
        </p>
        <a href={waLink} rel="noopener" data-track="whatsapp" className="btn mt-5 bg-[#0f7a40] text-white hover:bg-[#0c6535]">
          <WhatsAppIcon size={18} />
          {"WhatsApp'ta aç"}
        </a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div role="status" className="mt-6 rounded-[var(--radius-card)] bg-accent-soft p-8 text-center">
        <CheckCircle size={44} aria-hidden className="mx-auto text-accent" />
        <h3 className="mt-4 text-xl font-extrabold text-ink">{form.successTitle}</h3>
        <p className="mt-2 text-[0.9375rem] leading-7 text-ink-soft">{form.successDescription}</p>
        {waLink ? (
          <a href={waLink} rel="noopener" data-track="whatsapp" className="btn mt-5 border border-line bg-surface text-ink hover:border-accent">
            <WhatsAppIcon size={18} className="text-[#0f7a40]" />
            {"Daha hızlı dönüş için WhatsApp'tan da iletin"}
          </a>
        ) : null}
      </div>
    );
  }

  const f = form.fields;

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.nameLabel} id="name">
          <input id="name" name="name" type="text" required autoComplete="name" placeholder={f.namePlaceholder} className={inputClass} />
        </Field>
        <Field label={f.emailLabel} id="email">
          <input id="email" name="email" type="email" required autoComplete="email" placeholder={f.emailPlaceholder} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.phoneLabel} id="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={f.phonePlaceholder} className={inputClass} />
        </Field>
        <Field label={f.companyLabel} id="company">
          <input id="company" name="company" type="text" required autoComplete="organization" placeholder={f.companyPlaceholder} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.areaLabel} id="area">
          <input id="area" name="area" type="text" placeholder={f.areaPlaceholder} className={inputClass} />
        </Field>
        <Field label={f.serviceLabel} id="service">
          <select id="service" name="service" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {f.servicePlaceholder}
            </option>
            {form.serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={f.messageLabel} id="message">
        <textarea id="message" name="message" required rows={5} placeholder={f.messagePlaceholder} className={`${inputClass} resize-y`} />
      </Field>

      {/* Bal küpü: botlar doldurur, insanlar görmez. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Web sitesi</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
        {form.consentLabel}
      </label>

      {siteKey ? (
        <Turnstile
          siteKey={siteKey}
          options={{ theme: "light", language: "tr", size: "flexible" }}
          onSuccess={setToken}
          onExpire={() => setToken("")}
          onError={() => setToken("")}
        />
      ) : null}

      {status === "error" ? (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {form.errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading" || (Boolean(siteKey) && !token)}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          form.loadingLabel
        ) : (
          <>
            <Send size={16} aria-hidden />
            {form.submitLabel}
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}

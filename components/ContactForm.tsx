"use client";

import { useState } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappUrl } from "@/lib/contact";
import type { ContactFormContent } from "@/lib/cms-types";

const inputClass =
  "w-full min-h-12 rounded-lg border border-line bg-bg px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

/** Form bilgilerinden hazır WhatsApp mesajı. */
function leadMessage(p: Record<string, FormDataEntryValue>) {
  const v = (k: string) => String(p[k] ?? "").trim();
  return [
    "Merhaba, serdivanreklamajansi.com üzerinden teklif istiyorum.",
    `Ad Soyad: ${v("name")}`,
    `İşletme: ${v("company")}`,
    v("area") && `Bölge: ${v("area")}`,
    `Hizmet: ${v("service")}`,
    v("phone") && `Telefon: ${v("phone")}`,
    v("email") && `E-posta: ${v("email")}`,
    v("message") && `Mesaj: ${v("message")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Teklif formu: bilgiler sunucuya gönderilmez, hazır bir WhatsApp mesajı olarak açılır.
 * Ziyaretçi yalnızca "Gönder"e basar; talep doğrudan WhatsApp'a düşer.
 */
export default function ContactForm({ form, whatsapp }: { form: ContactFormContent; whatsapp?: string }) {
  const [waLink, setWaLink] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    // Bal küpü: botlar doldurur, insanlar görmez.
    if (String(payload.website ?? "").trim() || !whatsapp) return;

    const link = whatsappUrl(whatsapp, leadMessage(payload));
    setWaLink(link);
    // Cloudflare Zaraz etkinse (Google Ads / GA4 dönüşümü) olayı gönder; yoksa hiçbir şey yapmaz.
    (window as unknown as { zaraz?: { track: (e: string, p?: object) => void } }).zaraz?.track("generate_lead", {
      service: String(payload.service ?? ""),
    });
    window.location.href = link;
  }

  if (waLink) {
    return (
      <div role="status" className="mt-6 rounded-[var(--radius-card)] bg-accent-soft p-8 text-center">
        <WhatsAppIcon size={40} className="mx-auto text-[#0f7a40]" />
        <h3 className="mt-4 text-xl font-extrabold text-ink">{form.successTitle}</h3>
        <p className="mt-2 text-[0.9375rem] leading-7 text-ink-soft">{form.successDescription}</p>
        <a href={waLink} rel="noopener" data-track="whatsapp" className="btn mt-5 bg-[#0f7a40] text-white hover:bg-[#0c6535]">
          <WhatsAppIcon size={18} />
          {"WhatsApp'ta aç"}
        </a>
      </div>
    );
  }

  const f = form.fields;

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.nameLabel} id="name">
          <input id="name" name="name" type="text" required autoComplete="name" placeholder={f.namePlaceholder} className={inputClass} />
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

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.phoneLabel} id="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder={f.phonePlaceholder} className={inputClass} />
        </Field>
        <Field label={f.emailLabel} id="email">
          <input id="email" name="email" type="email" autoComplete="email" placeholder={f.emailPlaceholder} className={inputClass} />
        </Field>
      </div>

      <Field label={f.messageLabel} id="message">
        <textarea id="message" name="message" rows={4} placeholder={f.messagePlaceholder} className={`${inputClass} resize-y`} />
      </Field>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Web sitesi</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
        {form.consentLabel}
      </label>

      <button type="submit" data-track="whatsapp" className="btn w-full bg-[#0f7a40] text-white hover:bg-[#0c6535]">
        <WhatsAppIcon size={18} />
        {form.submitLabel}
      </button>
      <p className="text-center text-xs leading-5 text-muted">
        Bilgileriniz hazır bir WhatsApp mesajı olarak açılır; göndermeniz yeterli.
      </p>
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

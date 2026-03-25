"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HighlightedText from "@/components/HighlightedText";
import { ContentIcon } from "@/lib/icon-map";
import type { ContactContent, FooterContent, HeaderContent, SiteSettings } from "@/lib/cms-types";

export default function ContactPageClient({
  site,
  header,
  footer,
  content,
}: {
  site: SiteSettings;
  header: HeaderContent;
  footer: FooterContent;
  content: ContactContent;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    }, 5000);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/3 text-white placeholder-white/25 focus:border-primary/50 focus:outline-none focus:bg-white/5 transition-all duration-200 text-sm";

  return (
    <>
      <Header site={site} header={header} />
      <main className="pt-20">
        <section className="section-shell relative overflow-hidden px-4 py-20 md:py-24">
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[360px] opacity-12"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250,193,1,0.4) 0%, transparent 65%)",
            }}
          />
          <div className="container mx-auto max-w-3xl text-center relative">
            <span className="section-label">{content.hero.eyebrow}</span>
            <h1
              className="mt-6 text-5xl font-black tracking-tight md:text-6xl leading-[0.96]"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              <HighlightedText
                text={content.hero.title}
                highlight={content.hero.titleHighlight}
              />
            </h1>
            <p className="mt-5 text-lg text-white/50 leading-7">
              {content.hero.description}
            </p>
          </div>
        </section>

        <section className="px-4 pb-24">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2
                  className="text-2xl font-black mb-6"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {content.infoTitle}
                </h2>
                <p className="text-sm leading-7 text-white/45 mb-8">
                  {content.infoDescription}
                </p>

                <div className="space-y-4">
                  {content.contactItems.map((item) => {
                    const card = (
                      <div className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-primary/25 transition-all duration-200 hover:-translate-x-0.5">
                        <div className="h-10 w-10 shrink-0 rounded-xl border border-primary/20 bg-primary/8 flex items-center justify-center">
                          <ContentIcon name={item.icon} size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white/30 mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-sm font-semibold text-white/80">{item.value}</p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a key={`${item.label}-${item.value}`} href={item.href}>
                        {card}
                      </a>
                    ) : (
                      <div key={`${item.label}-${item.value}`}>{card}</div>
                    );
                  })}
                </div>

                <div
                  className="mt-8 rounded-2xl p-5 border border-primary/18"
                  style={{ background: "rgba(250,193,1,0.05)" }}
                >
                  <p className="text-xs font-bold text-primary/80 uppercase tracking-[0.18em] mb-2">
                    {content.trustNote.eyebrow}
                  </p>
                  <p className="text-sm leading-6 text-white/50">{content.trustNote.body}</p>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 md:p-10">
                <h2
                  className="text-2xl font-black mb-6"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  {content.form.title}
                </h2>

                {isSubmitted ? (
                  <div
                    className="flex flex-col items-center justify-center text-center py-12 rounded-2xl animate-scale-in"
                    style={{
                      background: "rgba(250,193,1,0.06)",
                      border: "1px solid rgba(250,193,1,0.22)",
                    }}
                  >
                    <CheckCircle size={52} className="text-primary mb-4" />
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                    >
                      {content.form.successTitle}
                    </h3>
                    <p className="text-sm text-white/50 max-w-xs">
                      {content.form.successDescription}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-white/40 mb-2">
                          {content.form.fields.nameLabel}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={content.form.fields.namePlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/40 mb-2">
                          {content.form.fields.emailLabel}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={content.form.fields.emailPlaceholder}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-white/40 mb-2">
                          {content.form.fields.phoneLabel}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={content.form.fields.phonePlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-white/40 mb-2">
                          {content.form.fields.companyLabel}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={content.form.fields.companyPlaceholder}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/40 mb-2">
                        {content.form.fields.serviceLabel}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ appearance: "none" }}
                      >
                        <option value="" style={{ background: "#101010" }}>
                          {content.form.fields.servicePlaceholder}
                        </option>
                        {content.form.serviceOptions.map((option) => (
                          <option key={option} value={option} style={{ background: "#101010" }}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/40 mb-2">
                        {content.form.fields.messageLabel}
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={content.form.fields.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                          {content.form.loadingLabel}
                        </span>
                      ) : (
                        <>
                          <Send size={15} />
                          {content.form.submitLabel}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer site={site} footer={footer} />
    </>
  );
}

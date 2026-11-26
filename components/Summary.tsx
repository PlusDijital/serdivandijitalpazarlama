/**
 * "Kısaca" kutusu: öne çıkan snippet ve yapay zeka cevaplarında alıntılanmaya uygun doğrudan cevap.
 * <aside> değil <section>: içerik ayıklayıcılar (okuma modu, botlar) aside'ı ikincil sayıp atabiliyor.
 * data-kisaca, schema'daki speakable seçicisidir (lib/schema.ts).
 */
export default function Summary({ text, label = "Kısaca" }: { text: string; label?: string }) {
  return (
    <section
      aria-label={label}
      data-kisaca
      className="flex h-full flex-col justify-center rounded-[var(--radius-card)] border-l-4 border-accent bg-accent-soft/60 p-6 md:p-7"
    >
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{label}</p>
      <p className="mt-2 text-[1.0625rem] leading-8 text-ink">{text}</p>
    </section>
  );
}

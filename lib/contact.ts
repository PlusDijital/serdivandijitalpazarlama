/** WhatsApp bağlantısı: numara uluslararası biçimde (905xxxxxxxxx), mesaj önceden doldurulur. */
export function whatsappUrl(number: string, text = "Merhaba, Serdivan Reklam Ajansı sitenizden yazıyorum. Teklif almak istiyorum.") {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** 905516145454 → 0551 614 54 54 */
export function formatTrPhone(number: string) {
  const d = number.replace(/\D/g, "").replace(/^90/, "");
  return d.length === 10 ? `0${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}` : number;
}

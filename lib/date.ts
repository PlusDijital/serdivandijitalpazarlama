const trDate = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-09-25" → "25 Eylül 2026". Görünen tarih her zaman <time datetime> değeriyle aynı kaynaktan gelir. */
export function formatDate(iso: string) {
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? iso : trDate.format(date);
}

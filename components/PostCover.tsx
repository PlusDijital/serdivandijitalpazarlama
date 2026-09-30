import { coverTheme, type CoverTheme } from "@/lib/covers";

/**
 * Satır içi SVG kapak: ek HTTP isteği yok, her ekranda keskin, ~2 KB.
 * Başlık metni yok (başlık zaten sayfada); yalnızca kategori motifi.
 */
export default function PostCover({
  category,
  id,
  className = "",
}: {
  category: string;
  id: string;
  className?: string;
}) {
  const t = coverTheme(category);
  const gid = `g-${id}`;
  const pid = `p-${id}`;

  return (
    <svg
      viewBox="0 0 1200 630"
      role="img"
      aria-label={`${category} kapak görseli`}
      className={`block h-auto w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.from} />
          <stop offset="1" stopColor={t.to} />
        </linearGradient>
        <pattern id={pid} width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="#ffffff" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="1200" height="630" fill={`url(#${gid})`} />
      <rect width="1200" height="630" fill={`url(#${pid})`} />
      <circle cx="1080" cy="-40" r="260" fill={t.soft} opacity="0.55" />
      <circle cx="120" cy="690" r="220" fill={t.soft} opacity="0.45" />
      <Motif t={t} />
      <text
        x="72"
        y="96"
        fill="#ffffff"
        opacity="0.85"
        fontSize="30"
        fontWeight="700"
        letterSpacing="3"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {category.toLocaleUpperCase("tr-TR")}
      </text>
    </svg>
  );
}

function Motif({ t }: { t: CoverTheme }) {
  switch (t.motif) {
    case "ads":
      return (
        <g>
          <rect x="560" y="150" width="520" height="340" rx="28" fill="#ffffff" opacity="0.96" />
          {[120, 180, 150, 230, 210, 290].map((h, i) => (
            <rect
              key={i}
              x={610 + i * 76}
              y={440 - h}
              width="44"
              height={h}
              rx="10"
              fill={i === 5 ? t.accent : t.from}
              opacity={i === 5 ? 1 : 0.18 + i * 0.1}
            />
          ))}
          <polyline
            points="632,330 708,280 784,300 860,230 936,245 1012,165"
            fill="none"
            stroke={t.accent}
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="1012" cy="165" r="14" fill={t.accent} />
          <rect x="72" y="380" width="360" height="22" rx="11" fill="#ffffff" opacity="0.9" />
          <rect x="72" y="420" width="260" height="22" rx="11" fill="#ffffff" opacity="0.45" />
          <rect x="72" y="470" width="150" height="54" rx="27" fill={t.accent} />
        </g>
      );
    case "search":
      return (
        <g>
          <rect x="520" y="170" width="580" height="86" rx="43" fill="#ffffff" />
          <circle cx="582" cy="213" r="18" fill="none" stroke={t.from} strokeWidth="6" />
          <line x1="595" y1="226" x2="610" y2="241" stroke={t.from} strokeWidth="6" strokeLinecap="round" />
          <rect x="636" y="201" width="300" height="24" rx="12" fill={t.from} opacity="0.2" />
          {[0, 1, 2].map((i) => (
            <g key={i} opacity={i === 0 ? 1 : 0.55}>
              <rect x="520" y={290 + i * 92} width="580" height="72" rx="18" fill="#ffffff" opacity={i === 0 ? 0.98 : 0.35} />
              <rect x="548" y={312 + i * 92} width={i === 0 ? 260 : 220} height="14" rx="7" fill={i === 0 ? t.to : "#ffffff"} />
              <rect x="548" y={336 + i * 92} width="380" height="12" rx="6" fill={i === 0 ? t.from : "#ffffff"} opacity="0.35" />
            </g>
          ))}
          <path
            d="M200 250c-55 0-100 45-100 100 0 75 100 170 100 170s100-95 100-170c0-55-45-100-100-100z"
            fill={t.accent}
          />
          <circle cx="200" cy="350" r="36" fill={t.from} />
        </g>
      );
    case "web":
      return (
        <g>
          <rect x="500" y="130" width="600" height="400" rx="26" fill="#ffffff" />
          <rect x="500" y="130" width="600" height="56" rx="26" fill={t.from} opacity="0.12" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={534 + i * 28} cy="158" r="8" fill={t.to} opacity={0.35 + i * 0.2} />
          ))}
          <rect x="540" y="220" width="300" height="30" rx="10" fill={t.from} />
          <rect x="540" y="266" width="360" height="14" rx="7" fill={t.from} opacity="0.3" />
          <rect x="540" y="290" width="300" height="14" rx="7" fill={t.from} opacity="0.3" />
          <rect x="540" y="330" width="150" height="46" rx="23" fill={t.to} />
          <rect x="880" y="220" width="180" height="260" rx="18" fill={t.accent} />
          <rect x="540" y="410" width="310" height="70" rx="14" fill={t.from} opacity="0.08" />
          <rect x="130" y="300" width="200" height="300" rx="30" fill="#ffffff" opacity="0.92" />
          <rect x="155" y="340" width="150" height="16" rx="8" fill={t.from} />
          <rect x="155" y="370" width="110" height="12" rx="6" fill={t.from} opacity="0.3" />
          <rect x="155" y="410" width="150" height="90" rx="12" fill={t.accent} />
        </g>
      );
    case "social":
      return (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={620 + col * 150}
                y={150 + row * 150}
                width="130"
                height="130"
                rx="22"
                fill={(row + col) % 3 === 0 ? t.accent : "#ffffff"}
                opacity={(row + col) % 3 === 0 ? 1 : 0.2 + ((row * 3 + col) % 4) * 0.18}
              />
            )),
          )}
          <circle cx="220" cy="380" r="92" fill="#ffffff" opacity="0.95" />
          <path
            d="M220 424s-58-34-58-76c0-22 17-38 36-38 11 0 17 5 22 12 5-7 11-12 22-12 19 0 36 16 36 38 0 42-58 76-58 76z"
            fill={t.to}
          />
        </g>
      );
  }
}

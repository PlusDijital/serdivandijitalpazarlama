/** Logo işareti: satır içi SVG, "S" + konum noktası. */
export default function Logo({ className = "h-9 w-9", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <rect width="40" height="40" rx="11" fill={light ? "#ffffff" : "#0b1b33"} />
      <path
        d="M26.5 13.2c-1.4-1.6-3.6-2.5-6.2-2.5-3.9 0-6.6 2.1-6.6 5.2 0 3 2.3 4.2 5.9 5l1.6.4c2.1.5 2.9 1.1 2.9 2.2 0 1.3-1.4 2.2-3.5 2.2-2.2 0-3.9-.9-5.1-2.4l-2.4 2.3c1.6 2 4.3 3.2 7.4 3.2 4.3 0 7.2-2.2 7.2-5.5 0-3-2.1-4.3-5.9-5.1l-1.6-.4c-1.9-.4-2.7-1-2.7-2 0-1.2 1.2-2 3-2 1.7 0 3.1.6 4.1 1.7l1.9-2.3z"
        fill={light ? "#0b1b33" : "#ffffff"}
      />
      <circle cx="31" cy="30" r="3.2" fill="#34d3a8" />
    </svg>
  );
}

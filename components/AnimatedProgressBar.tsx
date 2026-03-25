"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedProgressBarProps {
  progress: number;
  className?: string;
  barClassName?: string;
  glowColor?: string;
}

export default function AnimatedProgressBar({
  progress,
  className = "h-1.5 rounded-full bg-white/8",
  barClassName = "h-1.5 rounded-full bg-emerald-400",
  glowColor = "rgba(52,211,153,0.5)",
}: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        className={barClassName}
        style={{
          width: animated ? `${progress}%` : "0%",
          boxShadow: animated ? `0 0 12px ${glowColor}` : "none",
          transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1.5s ease",
        }}
      />
    </div>
  );
}

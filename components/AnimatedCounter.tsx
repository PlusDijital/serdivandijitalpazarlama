"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  className = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");

  // Parse the numeric part and suffix (e.g., "12M+" -> num=12, suffix="M+")
  const match = value.match(/^([0-9.,]+)\s*(.*)$/);
  const numericStr = match ? match[1].replace(/,/g, "") : "0";
  const targetNum = parseFloat(numericStr);
  const suffix = match ? match[2] : "";
  const hasDecimal = numericStr.includes(".");
  const decimalPlaces = hasDecimal ? numericStr.split(".")[1]?.length || 0 : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const startTime = performance.now();

    function easeOutExpo(t: number): number {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = easedProgress * targetNum;

      if (hasDecimal) {
        setDisplayValue(currentValue.toFixed(decimalPlaces));
      } else {
        setDisplayValue(Math.floor(currentValue).toLocaleString("tr-TR"));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Set final value exactly as provided
        setDisplayValue(match ? match[1] : value);
      }
    }

    requestAnimationFrame(animate);
  }, [hasAnimated, targetNum, duration, hasDecimal, decimalPlaces, match, value]);

  return (
    <span ref={ref} className={className}>
      {hasAnimated ? displayValue : "0"}
      {suffix}
    </span>
  );
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 650,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const transforms: Record<string, string> = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(32px)",
    right: "translateX(-32px)",
    scale: "scale(0.92)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* Staggered children wrapper */
interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  duration?: number;
}

export function StaggerReveal({
  children,
  className = "",
  stagger = 100,
  direction = "up",
  duration = 600,
}: StaggerRevealProps) {
  return (
    <>
      {children.map((child, i) => (
        <ScrollReveal
          key={i}
          className={className}
          delay={i * stagger}
          direction={direction}
          duration={duration}
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
}

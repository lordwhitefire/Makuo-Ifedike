"use client";

import { useLayoutEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** wow.js animation family: fadeInUp / fadeInRight / fadeInLeft */
  variant?: "up" | "right" | "left";
  /** seconds */
  duration?: number;
  /** seconds */
  delay?: number;
  className?: string;
};

/**
 * Scroll reveal — reproduces the reference's wow.js reveals with an
 * IntersectionObserver (offset 0, once). Each element starts hidden
 * (`visibility: hidden`, like wow.js) and animates in when it enters view.
 * Does nothing when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  variant = "right",
  duration = 2,
  delay = 0.5,
  className,
}: RevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    inner.dataset.revealState = "hidden";

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            inner.dataset.revealState = "shown";
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <div
        ref={innerRef}
        data-reveal
        data-variant={variant}
        style={
          {
            "--reveal-duration": `${duration}s`,
            "--reveal-delay": `${delay}s`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

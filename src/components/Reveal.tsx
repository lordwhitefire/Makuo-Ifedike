"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Scroll reveal — the reference's About text uses wow.js `fadeInRight`
 * (2s, 0.5s delay, slides in from 100% right). This reproduces it with an
 * IntersectionObserver on a stationary wrapper, and does nothing when the
 * user prefers reduced motion.
 */
export default function Reveal({ children }: { children: React.ReactNode }) {
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
    <div ref={wrapRef}>
      <div ref={innerRef} data-reveal>
        {children}
      </div>
    </div>
  );
}

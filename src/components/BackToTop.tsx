"use client";

import { useEffect, useState } from "react";

/**
 * Back-to-top — reference treatment:
 * 50x50 fixed at right/bottom 50, bg #090909, white arrow, faint white glow,
 * hidden at the top, fades in past 600px of scroll, click animates to top
 * over 1500ms, hover fills bronze #89715b. 35x35 at right/bottom 20 below 576px.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const start = window.scrollY;
    if (start === 0) return;
    const duration = 1500;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      window.scrollTo(0, Math.round(start * (1 - ease)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-[20px] right-[20px] z-[28] flex h-[35px] w-[35px] items-center justify-center bg-[#090909] text-white shadow-[0_0_7px_rgba(255,255,255,0.1)] transition-all duration-200 hover:bg-[#89715b] min-[576px]:bottom-[50px] min-[576px]:right-[50px] min-[576px]:h-[50px] min-[576px]:w-[50px] ${
        visible ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

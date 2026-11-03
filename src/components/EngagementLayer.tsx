"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Engagement layer — the reference's nine touchpoints, reproduced:
 *  1. chat bubble after 3s (once per session, auto-dismiss 14s)
 *  2. returning-visitor message (visits > 1)
 *  3. time-of-day greeting (lives in the Athletica hero slide — HeroCarousel)
 *  4. 50%-scroll banner (once per session)
 *  5. 45s-idle panel (once per session)
 *  6. exit-intent modal (once per session, Escape closes)
 *  7. footer confetti + toast (footer-info-box 60% visible)
 *  8. work-card title tooltips (removed from page.tsx in TASK-004)
 *  9. referrer-aware bubble opener
 *
 * Persistence matches the reference:
 *  localStorage.ifedike_visit_count — incremented every load
 *  sessionStorage.greeting_shown / scroll50_shown / idle_shown / exit_intent_shown
 *  sessionStorage.bubble_shown — bubble once per session
 */

const BUBBLE_DEFAULT =
  "Hey — quick question: are you here for a marketing site, a web app, or fixing something that's broken?";
const BUBBLE_RETURNING =
  "Welcome back. Athletica went into preview since you last visited.";

function referrerMessage(): string | null {
  const ref = document.referrer.toLowerCase();
  if (ref.includes("linkedin"))
    return "Saw you came from LinkedIn — what's the project?";
  if (ref.includes("twitter") || ref.includes("x.com"))
    return "Saw you came from Twitter — what's the project?";
  return null;
}

const CONFETTI_COLORS = ["#89715b", "#f58344", "#feae01", "#da2929", "#fff"];

type Piece = {
  left: number;
  delay: number;
  dur: number;
  color: string;
  rot: number;
};

/**
 * Owner switch (TASK-004 Q24/Q26): every prompt is hidden for now.
 * The inner component and all of its code stay intact — flipping this to
 * true brings the whole engagement layer back exactly as it was.
 */
const ENGAGEMENT_ENABLED = false;

function EngagementLayerInner() {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState(BUBBLE_DEFAULT);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [exitVisible, setExitVisible] = useState(false);
  const [confetti, setConfetti] = useState<Piece[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  const idleFired = useRef(false);
  const confettiFired = useRef(false);

  // Visit count + bubble message + bubble timing (#1, #2, #9)
  useEffect(() => {
    let prev = 0;
    try {
      prev = parseInt(localStorage.getItem("ifedike_visit_count") || "0", 10);
      localStorage.setItem("ifedike_visit_count", String(prev + 1));
    } catch {
      /* storage unavailable */
    }

    const refMsg = referrerMessage();
    setBubbleMessage(refMsg ?? (prev >= 1 ? BUBBLE_RETURNING : BUBBLE_DEFAULT));

    if (sessionStorage.getItem("bubble_shown") === "1") return;

    const show = window.setTimeout(() => {
      setBubbleVisible(true);
      sessionStorage.setItem("bubble_shown", "1");
      window.setTimeout(() => setBubbleVisible(false), 14000);
    }, 3000);

    return () => window.clearTimeout(show);
  }, []);

  // 50%-scroll banner (#4)
  useEffect(() => {
    if (sessionStorage.getItem("scroll50_shown") === "1") return;
    let fired = false;
    const check = () => {
      if (fired) return;
      const doc = document.documentElement;
      const ratio =
        (window.scrollY + window.innerHeight) / (doc.scrollHeight || 1);
      if (ratio >= 0.5) {
        fired = true;
        setBannerVisible(true);
        sessionStorage.setItem("scroll50_shown", "1");
      }
    };
    const t = window.setTimeout(check, 1500);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // 45s-idle panel (#5)
  useEffect(() => {
    if (sessionStorage.getItem("idle_shown") === "1") return;
    let timer = 0;
    const reset = () => {
      if (idleFired.current) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        idleFired.current = true;
        setPanelVisible(true);
        sessionStorage.setItem("idle_shown", "1");
      }, 45000);
    };
    const events = ["scroll", "mousemove", "click", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

  // Exit-intent modal (#6)
  useEffect(() => {
    if (sessionStorage.getItem("exit_intent_shown") === "1") return;
    const onOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) {
        setExitVisible(true);
        sessionStorage.setItem("exit_intent_shown", "1");
        document.removeEventListener("mouseout", onOut);
      }
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, []);

  // Escape closes the exit modal
  useEffect(() => {
    if (!exitVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExitVisible(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [exitVisible]);

  // Footer confetti + toast (#7)
  useEffect(() => {
    const box = document.querySelector(".footer-info-box");
    if (!box) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !confettiFired.current) {
            confettiFired.current = true;
            const pieces = Array.from({ length: 60 }, () => ({
              left: Math.random() * 100,
              delay: Math.random() * 0.5,
              dur: 1.2 + Math.random() * 0.8,
              color:
                CONFETTI_COLORS[
                  Math.floor(Math.random() * CONFETTI_COLORS.length)
                ],
              rot: Math.random() * 360,
            }));
            setConfetti(pieces);
            setToastVisible(true);
            io.disconnect();
            window.setTimeout(() => setConfetti([]), 2000);
            window.setTimeout(() => setToastVisible(false), 8000);
          }
        }
      },
      { threshold: 0.6 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* #1 / #2 / #9 — chat bubble */}
      <div
        id="engagement-bubble"
        aria-hidden={!bubbleVisible}
        className={`fixed bottom-6 right-6 z-[9999] w-[340px] max-w-[calc(100vw-3rem)] bg-[#1a1613] text-white shadow-2xl transition-transform duration-[350ms] ease-out ${
          bubbleVisible ? "eng-bubble--visible translate-x-0" : "translate-x-[120%]"
        }`}
        style={{ pointerEvents: bubbleVisible ? "auto" : "none" }}
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="font-display text-lg font-bold text-[#f58344]">
            Ifedike
          </span>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setBubbleVisible(false)}
            className="text-xl leading-none text-white/60 transition-colors hover:text-white"
          >
            &times;
          </button>
        </div>
        <p className="px-5 pt-3 text-sm leading-6 text-white/75">
          {bubbleMessage}
        </p>
        <div className="flex flex-wrap gap-2 px-5 pb-5 pt-4">
          <a
            href="#work"
            className="rounded bg-[#f58344] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#1a1613]"
          >
            See the work
          </a>
          <a
            href="#about"
            className="rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            About me
          </a>
          <a
            href="#contact"
            className="rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Talk
          </a>
        </div>
      </div>

      {/* #4 — 50%-scroll banner */}
      <div
        id="engagement-banner"
        className={`fixed inset-x-0 bottom-0 z-[9998] transition-transform duration-[350ms] ease-out ${
          bannerVisible
            ? "eng-banner--visible translate-y-0"
            : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex min-h-[68px] w-full max-w-[1185px] items-center justify-between gap-4 border-t border-[rgba(245,131,68,0.25)] bg-[#1a1613] px-6 py-4">
          <p className="text-sm text-white/75">
            Halfway through. Want me to just show you the work?
          </p>
          <div className="flex items-center gap-4">
            <a href="#work" className="text-sm font-semibold text-[#f58344]">
              Jump to projects &rarr;
            </a>
            <button
              type="button"
              aria-label="Close banner"
              onClick={() => setBannerVisible(false)}
              className="text-xl leading-none text-white/60 transition-colors hover:text-white"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      {/* #5 — idle panel */}
      <div
        id="engagement-panel"
        className={`fixed right-6 top-1/2 z-[9999] w-[340px] max-w-[calc(100vw-3rem)] -translate-y-1/2 bg-[#1a1613] text-white shadow-2xl transition-transform duration-[350ms] ease-out ${
          panelVisible
            ? "eng-panel--visible translate-x-0"
            : "translate-x-[120%]"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="font-display text-lg font-bold text-[#f58344]">
            Still here?
          </span>
          <button
            type="button"
            aria-label="Close panel"
            onClick={() => setPanelVisible(false)}
            className="text-xl leading-none text-white/60 transition-colors hover:text-white"
          >
            &times;
          </button>
        </div>
        <p className="px-5 pt-3 text-sm leading-6 text-white/75">
          Want me to walk you through the work in 30 seconds?
        </p>
        <div className="flex flex-wrap gap-2 px-5 pb-5 pt-4">
          <a
            href="#work"
            className="rounded bg-[#f58344] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#1a1613]"
          >
            Yes, show me
          </a>
          <button
            type="button"
            onClick={() => setPanelVisible(false)}
            className="rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            No thanks
          </button>
        </div>
      </div>

      {/* #6 — exit-intent modal */}
      {exitVisible && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setExitVisible(false)}
        >
          <div
            className="eng-exit--visible relative w-full max-w-[440px] bg-[#1a1613] p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setExitVisible(false)}
              className="absolute right-4 top-4 text-2xl leading-none text-white/60 transition-colors hover:text-white"
            >
              &times;
            </button>
            <h3 className="font-display text-2xl font-bold text-[#f58344]">
              Leaving already?
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              If you&rsquo;ve got a half-built thing, drop a link &mdash;
              I&rsquo;ll take a look.
            </p>
            <a
              href="mailto:mifedike@gmail.com"
              className="mt-5 inline-block rounded bg-[#f58344] px-4 py-2 text-sm font-semibold text-[#1a1613]"
            >
              mifedike@gmail.com
            </a>
            <p className="mt-4 text-xs uppercase tracking-widest text-white/50">
              One person, start to finish.
            </p>
          </div>
        </div>
      )}

      {/* #7 — footer confetti */}
      {confetti.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
          {confetti.map((p, i) => (
            <span
              key={i}
              className="eng-confetti-piece absolute top-0 block h-2 w-2"
              style={{
                left: `${p.left}%`,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
                transform: `rotate(${p.rot}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* #7 — footer toast */}
      <div
        aria-live="polite"
        className={`fixed bottom-24 left-1/2 z-[10001] w-max max-w-[calc(100vw-3rem)] -translate-x-1/2 bg-[#1a1613] px-5 py-3 text-center text-sm text-white shadow-2xl transition-opacity duration-300 ${
          toastVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        You saw everything. The contact strip is just above &uarr;
      </div>
    </>
  );
}

export default function EngagementLayer() {
  if (!ENGAGEMENT_ENABLED) return null;
  return <EngagementLayerInner />;
}

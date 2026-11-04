"use client";

import { useEffect, useRef, useState } from "react";
import { useEngagement } from "@/components/EngagementProvider";

/**
 * Engagement layer — five prompts, one gate.
 *
 *  #1/#2/#9 chat bubble — 8s, once per session, auto-dismiss 14s
 *  #4      50%-scroll banner — 1.5s check + scroll, once
 *  #5      45s-idle panel, once
 *  #6      exit-intent modal — desktop only, after 20s, auto-dismiss 20s
 *  #7      footer confetti + toast, once
 *
 * Every prompt calls tryShow(id) when its trigger fires and renders only if it
 * returns true. Every close path calls closePrompt(). Nothing is queued.
 *
 *  localStorage.ifedike_visit_count — incremented every load
 *  sessionStorage.{bubble,scroll50,idle,exit_intent,footer}_shown
 */

const BUBBLE_DEFAULT =
  "Hey — quick question: are you here for a marketing site, a web app, or fixing something that's broken?";
const BUBBLE_RETURNING =
  "Welcome back. Are you here to see the work, or talk about a project?";

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
 * The gate and the prompts stay intact — flipping this to true brings the
 * whole engagement layer back.
 */
const ENGAGEMENT_ENABLED = false;

/**
 * Prompts are mounted only while active (so their links are never tabbable
 * when hidden). One frame off-screen keeps the existing slide-in transition.
 */
function useReveal(active: boolean): boolean {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!active) {
      setRevealed(false);
      return;
    }
    const frame = window.requestAnimationFrame(() => setRevealed(true));
    return () => window.cancelAnimationFrame(frame);
  }, [active]);
  return revealed;
}

function makeConfetti(): Piece[] {
  return Array.from({ length: 60 }, () => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    dur: 1.2 + Math.random() * 0.8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    rot: Math.random() * 360,
  }));
}

function EngagementLayerInner() {
  const { activePrompt, tryShow, closePrompt, requestOpenForm } = useEngagement();

  const [bubbleMessage, setBubbleMessage] = useState(BUBBLE_DEFAULT);
  const [confetti, setConfetti] = useState<Piece[]>([]);
  // StrictMode runs effects twice in dev; count the visit once per mount.
  const visitCounted = useRef(false);

  const bubbleRevealed = useReveal(activePrompt === "bubble");
  const bannerRevealed = useReveal(activePrompt === "scroll50");
  const panelRevealed = useReveal(activePrompt === "idle");
  const exitRevealed = useReveal(activePrompt === "exit_intent");

  // Visit count + bubble message (#1, #2, #9) and the 8s trigger.
  useEffect(() => {
    if (!visitCounted.current) {
      visitCounted.current = true;
      let prev = 0;
      try {
        prev = parseInt(localStorage.getItem("ifedike_visit_count") || "0", 10);
        localStorage.setItem("ifedike_visit_count", String(prev + 1));
      } catch {
        /* storage unavailable */
      }

      const refMsg = referrerMessage();
      setBubbleMessage(
        prev >= 1 ? BUBBLE_RETURNING : (refMsg ?? BUBBLE_DEFAULT),
      );
    }

    const show = window.setTimeout(() => {
      tryShow("bubble");
    }, 8000);
    return () => window.clearTimeout(show);
  }, [tryShow]);

  // 50%-scroll banner (#4). A skip does not set `fired` and writes no key, so a
  // later crossing can still show it.
  useEffect(() => {
    let fired = false;
    const check = () => {
      if (fired) return;
      const doc = document.documentElement;
      const ratio =
        (window.scrollY + window.innerHeight) / (doc.scrollHeight || 1);
      if (ratio >= 0.5 && tryShow("scroll50")) fired = true;
    };
    const t = window.setTimeout(check, 1500);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [tryShow]);

  // 45s-idle panel (#5). A skip keeps the listeners so it can fire again.
  useEffect(() => {
    let timer = 0;
    let fired = false;
    const reset = () => {
      if (fired) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (tryShow("idle")) fired = true;
      }, 45000);
    };
    const events = ["scroll", "mousemove", "click", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [tryShow]);

  // Exit-intent modal (#6) — desktop only, never before 20 seconds.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const mountedAt = Date.now();
    const onOut = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget) return;
      if (Date.now() - mountedAt < 20000) return;
      if (!tryShow("exit_intent")) return;
      document.removeEventListener("mouseout", onOut);
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, [tryShow]);

  // Escape closes the exit modal and counts as a close.
  useEffect(() => {
    if (activePrompt !== "exit_intent") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePrompt();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activePrompt, closePrompt]);

  // Auto-dismiss is a close path for the prompts that have one.
  useEffect(() => {
    if (activePrompt !== "bubble") return;
    const timer = window.setTimeout(closePrompt, 14000);
    return () => window.clearTimeout(timer);
  }, [activePrompt, closePrompt]);

  useEffect(() => {
    if (activePrompt !== "exit_intent") return;
    const timer = window.setTimeout(closePrompt, 20000);
    return () => window.clearTimeout(timer);
  }, [activePrompt, closePrompt]);

  useEffect(() => {
    if (activePrompt !== "footer") return;
    const timer = window.setTimeout(closePrompt, 8000);
    return () => window.clearTimeout(timer);
  }, [activePrompt, closePrompt]);

  // Footer toast + confetti (#7) — one prompt, one gate, one key.
  useEffect(() => {
    const box = document.querySelector(".footer-info-box");
    if (!box) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!tryShow("footer")) continue;
          io.disconnect();
          setConfetti(makeConfetti());
          window.setTimeout(() => setConfetti([]), 2000);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [tryShow]);

  return (
    <>
      {/* #1 / #2 / #9 — chat bubble */}
      {activePrompt === "bubble" && (
        <div
          id="engagement-bubble"
          className={`fixed bottom-[145px] right-6 z-[9999] w-[340px] max-w-[calc(100vw-3rem)] border border-white/15 bg-[#1a1613] text-white shadow-2xl transition-transform duration-[350ms] ease-out min-[576px]:bottom-[190px] ${
            bubbleRevealed
              ? "eng-bubble--visible translate-x-0"
              : "translate-x-[120%]"
          }`}
          style={{ pointerEvents: bubbleRevealed ? "auto" : "none" }}
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <span className="font-display text-lg font-bold text-[#f58344]">
              Ifedike
            </span>
            <button
              type="button"
              aria-label="Close chat"
              onClick={closePrompt}
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
              onClick={closePrompt}
              className="rounded bg-[#f58344] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#1a1613]"
            >
              See the work
            </a>
            <a
              href="#about"
              onClick={closePrompt}
              className="rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
            >
              About me
            </a>
            <button
              type="button"
              onClick={() => requestOpenForm()}
              className="rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
            >
              Talk
            </button>
          </div>
        </div>
      )}

      {/* #4 — 50%-scroll banner */}
      {activePrompt === "scroll50" && (
        <div
          id="engagement-banner"
          className={`fixed inset-x-0 bottom-0 z-[9998] transition-transform duration-[350ms] ease-out ${
            bannerRevealed
              ? "eng-banner--visible translate-y-0"
              : "translate-y-full"
          }`}
        >
          <div className="mx-auto flex min-h-[68px] w-full max-w-[1185px] items-center justify-between gap-4 border-t border-[rgba(245,131,68,0.25)] bg-[#1a1613] px-6 py-4">
            <p className="text-sm text-white/75">
              Halfway through. Want me to just show you the work?
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#work"
                onClick={closePrompt}
                className="text-sm font-semibold text-[#f58344]"
              >
                Jump to projects &rarr;
              </a>
              <button
                type="button"
                aria-label="Close banner"
                onClick={closePrompt}
                className="text-xl leading-none text-white/60 transition-colors hover:text-white"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* #5 — idle panel */}
      {activePrompt === "idle" && (
        <div
          id="engagement-panel"
          className={`fixed right-6 top-1/2 z-[9999] w-[340px] max-w-[calc(100vw-3rem)] -translate-y-1/2 bg-[#1a1613] text-white shadow-2xl transition-transform duration-[350ms] ease-out ${
            panelRevealed
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
              onClick={closePrompt}
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
              onClick={closePrompt}
              className="rounded bg-[#f58344] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#1a1613]"
            >
              Yes, show me
            </a>
            <button
              type="button"
              onClick={closePrompt}
              className="rounded border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white"
            >
              No thanks
            </button>
          </div>
        </div>
      )}

      {/* #6 — exit-intent modal */}
      {activePrompt === "exit_intent" && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4"
          onClick={closePrompt}
        >
          <div
            className={`eng-exit--visible relative w-full max-w-[440px] bg-[#1a1613] p-8 text-white shadow-2xl transition-opacity duration-200 ${
              exitRevealed ? "opacity-100" : "opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closePrompt}
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
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => requestOpenForm({ needType: "fix" })}
                className="rounded bg-[#f58344] px-4 py-2 text-sm font-semibold text-[#1a1613]"
              >
                Tell me what&rsquo;s broken
              </button>
              <a
                href="mailto:mifedike@gmail.com"
                onClick={closePrompt}
                className="rounded border border-white/20 px-4 py-2 text-sm font-semibold text-white"
              >
                Email instead
              </a>
            </div>
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
      {activePrompt === "footer" && (
        <div
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-[10001] w-max max-w-[calc(100vw-3rem)] -translate-x-1/2 bg-[#1a1613] px-5 py-3 text-center text-sm text-white shadow-2xl transition-opacity duration-300"
        >
          You saw everything. The contact strip is just above &uarr;
        </div>
      )}
    </>
  );
}

export default function EngagementLayer() {
  if (!ENGAGEMENT_ENABLED) return null;
  return <EngagementLayerInner />;
}

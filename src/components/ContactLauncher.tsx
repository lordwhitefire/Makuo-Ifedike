"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  INQUIRY_BUDGETS,
  INQUIRY_NEED_TYPES,
  INQUIRY_TIMELINES,
} from "@/content/inquiries";
import { trackEvent } from "@/lib/analytics";
import { useEngagement } from "@/components/EngagementProvider";

type FormState = {
  name: string;
  email: string;
  needType: string;
  budget: string;
  timeline: string;
  message: string;
  projectLink: string;
  consent: boolean;
  company: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  needType: "",
  budget: "",
  timeline: "",
  message: "",
  projectLink: "",
  consent: false,
  company: "",
};

const FALLBACK_EMAIL = "mifedike@gmail.com";
const COOLDOWN_MS = 20_000;
const SUBMITTED_KEY = "ifedike_inquiry_submitted";

const inputClass =
  "mt-1 min-h-[42px] w-full rounded border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#f58344]";
const labelClass =
  "block text-[11px] font-semibold uppercase tracking-widest text-white/55";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactLauncher() {
  const {
    formOpen: open,
    requestOpenForm,
    notifyFormClosed,
    notifySubmitted,
    pendingNeedType,
    consumePendingNeedType,
  } = useEngagement();

  const [cooldown, setCooldown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const cooldownTimer = useRef<number | null>(null);
  // Remembers a need type that arrived with an open request, so it can be
  // cleared later only if the visitor never touched the dropdown.
  const presetMemory = useRef<string | null>(null);
  const wasOpen = useRef(false);

  // TASK-006: tell the gate when this session already submitted, before any
  // prompt trigger can fire.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SUBMITTED_KEY) === "1") {
        setSubmitted(true);
        notifySubmitted();
      }
    } catch {
      /* storage unavailable */
    }
  }, [notifySubmitted]);

  // Apply a preset need type once per opening; clear an untouched preset on a
  // later open that carries none. The rest of the form keeps its values.
  useEffect(() => {
    if (!open) {
      wasOpen.current = false;
      return;
    }
    if (wasOpen.current) return;
    wasOpen.current = true;

    if (pendingNeedType) {
      setForm((prev) => ({ ...prev, needType: pendingNeedType }));
      presetMemory.current = pendingNeedType;
      consumePendingNeedType();
      return;
    }

    if (presetMemory.current) {
      const preset = presetMemory.current;
      setForm((prev) =>
        prev.needType === preset ? { ...prev, needType: "" } : prev,
      );
      presetMemory.current = null;
    }
  }, [open, pendingNeedType, consumePendingNeedType]);

  useEffect(
    () => () => {
      if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
    },
    [],
  );

  const closeDialog = useCallback(() => {
    notifyFormClosed();
    setCooldown(true);
    if (cooldownTimer.current) window.clearTimeout(cooldownTimer.current);
    cooldownTimer.current = window.setTimeout(
      () => setCooldown(false),
      COOLDOWN_MS,
    );
  }, [notifyFormClosed]);

  // Focus, scroll lock, Escape, and a simple focus trap while the dialog is open.
  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const nodes = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const focusable = [...nodes].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open, closeDialog]);

  const openDialog = () => {
    if (cooldown || submitted) return;
    requestOpenForm();
  };

  const update =
    (key: keyof FormState) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const target = event.target;
      const value =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setMessage("");
    setStatus("sending");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
        fallbackEmail?: string;
      };

      if (response.ok) {
        try {
          sessionStorage.setItem(SUBMITTED_KEY, "1");
        } catch {
          /* storage unavailable */
        }
        setSubmitted(true);
        setStatus("success");
        trackEvent("inquiry_submit");
        notifySubmitted();
        return;
      }

      if (response.status === 400 && data.errors) {
        setErrors(data.errors);
        setMessage("Please check the highlighted fields.");
        setStatus("error");
        return;
      }

      if (response.status === 503) {
        setMessage(
          `The form isn't connected yet. Email ${data.fallbackEmail ?? FALLBACK_EMAIL} directly.`,
        );
        setStatus("error");
        return;
      }

      if (response.status === 429) {
        setMessage(
          `Too many tries. Please wait a moment, or email ${FALLBACK_EMAIL}.`,
        );
        setStatus("error");
        return;
      }

      setMessage(`Something went wrong. Please email ${FALLBACK_EMAIL}.`);
      setStatus("error");
    } catch {
      setMessage(`Network error. Please email ${FALLBACK_EMAIL}.`);
      setStatus("error");
    }
  }

  if (submitted && !open) return null;

  return (
    <>
      {!submitted && (
        <button
          ref={triggerRef}
          type="button"
          onClick={openDialog}
          aria-disabled={cooldown}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Contact Makuo"
          title={cooldown ? "Available again in 20 seconds" : "Contact Makuo"}
          className={`fixed bottom-[70px] right-[20px] z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#f58344] text-[#1a1613] shadow-2xl transition-transform duration-200 min-[576px]:bottom-[115px] min-[576px]:right-[50px] ${
            cooldown ? "cursor-not-allowed opacity-50" : "hover:scale-105"
          }`}
        >
          {/* 20s cooldown ring — drains clockwise, then the button works again. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className={`pointer-events-none absolute -inset-[5px] h-[calc(100%+10px)] w-[calc(100%+10px)] -rotate-90 transition-opacity duration-200 ${
              cooldown ? "opacity-100" : "opacity-0"
            }`}
          >
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="#f58344"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="100"
              style={
                cooldown
                  ? { animation: `contact-ring-drain ${COOLDOWN_MS}ms linear forwards` }
                  : undefined
              }
            />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div
            ref={panelRef}
            id="contact-inquiry-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-form-title"
            className="relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto border border-white/15 bg-[#1a1613] p-6 text-white shadow-2xl [scrollbar-width:none] sm:p-8 [&::-webkit-scrollbar]:hidden"
          >
            {status === "success" ? (
              <div role="status">
                <h2
                  id="contact-form-title"
                  className="font-display text-2xl font-bold text-[#f58344]"
                >
                  Thanks — I&apos;ll reply within one business day.
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Your inquiry has been sent.
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="mt-6 rounded bg-[#f58344] px-4 py-2 text-sm font-semibold text-[#1a1613]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <h2
                    id="contact-form-title"
                    className="font-display text-2xl font-bold text-[#f58344]"
                  >
                    Tell me what you need
                  </h2>
                  <button
                    type="button"
                    onClick={closeDialog}
                    aria-label="Close contact form"
                    className="-mt-1 text-2xl leading-none text-white/60 transition-colors hover:text-white"
                  >
                    &times;
                  </button>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  One person, start to finish. Tell me what&apos;s broken or what
                  you want to build.
                </p>

                {message && (
                  <p
                    role="alert"
                    className="mt-4 border border-[#f58344]/40 bg-[#f58344]/10 px-3 py-2 text-sm text-[#f58344]"
                  >
                    {message}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>Name</span>
                      <input
                        ref={nameRef}
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={update("name")}
                        className={inputClass}
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.name}
                        </span>
                      )}
                    </label>
                    <label className="block">
                      <span className={labelClass}>Email</span>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={update("email")}
                        className={inputClass}
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.email}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>What do you need?</span>
                      <select
                        name="needType"
                        required
                        value={form.needType}
                        onChange={(event) => {
                          presetMemory.current = null;
                          update("needType")(event);
                        }}
                        className={inputClass}
                        aria-invalid={Boolean(errors.needType)}
                      >
                        <option value="">Choose one</option>
                        {INQUIRY_NEED_TYPES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.needType && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.needType}
                        </span>
                      )}
                    </label>
                    <label className="block">
                      <span className={labelClass}>Budget</span>
                      <select
                        name="budget"
                        required
                        value={form.budget}
                        onChange={update("budget")}
                        className={inputClass}
                        aria-invalid={Boolean(errors.budget)}
                      >
                        <option value="">Choose a range</option>
                        {INQUIRY_BUDGETS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.budget}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className={labelClass}>Timeline</span>
                      <select
                        name="timeline"
                        required
                        value={form.timeline}
                        onChange={update("timeline")}
                        className={inputClass}
                        aria-invalid={Boolean(errors.timeline)}
                      >
                        <option value="">Choose one</option>
                        {INQUIRY_TIMELINES.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.timeline && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.timeline}
                        </span>
                      )}
                    </label>
                    <label className="block">
                      <span className={labelClass}>
                        Project link{" "}
                        <span className="normal-case tracking-normal text-white/35">
                          (optional)
                        </span>
                      </span>
                      <input
                        type="url"
                        name="projectLink"
                        autoComplete="url"
                        placeholder="https://"
                        value={form.projectLink}
                        onChange={update("projectLink")}
                        className={inputClass}
                        aria-invalid={Boolean(errors.projectLink)}
                      />
                      {errors.projectLink && (
                        <span className="mt-1 block text-xs text-red-400">
                          {errors.projectLink}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="block">
                    <span className={labelClass}>Message</span>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      className={inputClass}
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message && (
                      <span className="mt-1 block text-xs text-red-400">
                        {errors.message}
                      </span>
                    )}
                  </label>

                  {/* Honeypot: bots fill it, people never see it. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={update("company")}
                      />
                    </label>
                  </div>

                  <label className="flex items-start gap-2 text-xs leading-5 text-white/65">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={form.consent}
                      onChange={update("consent")}
                      className="mt-1 accent-[#f58344]"
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <span>
                      I agree to my details being used to reply to this inquiry.{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f58344] underline"
                      >
                        Privacy notice
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <span className="block text-xs text-red-400">
                      {errors.consent}
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded bg-[#f58344] px-4 py-3 text-sm font-semibold text-[#1a1613] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send inquiry"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

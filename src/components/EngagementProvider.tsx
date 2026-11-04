"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * TASK-006 — one engagement gate.
 *
 * Every prompt asks `tryShow(id)` at the moment its trigger fires and renders
 * only when it returns true. Nothing is queued: a skipped prompt is simply
 * skipped, and its session key stays unwritten so a later trigger can show it.
 *
 * Two cooldowns exist and are deliberately separate:
 *  - prompts: PROMPT_COOLDOWN_MS (this file)
 *  - the orange launcher's ring: COOLDOWN_MS (ContactLauncher)
 */

export const PROMPT_COOLDOWN_MS = 120_000;

export type PromptId =
  | "bubble"
  | "scroll50"
  | "idle"
  | "exit_intent"
  | "footer";

const PROMPT_KEYS: Record<PromptId, string> = {
  bubble: "bubble_shown",
  scroll50: "scroll50_shown",
  idle: "idle_shown",
  exit_intent: "exit_intent_shown",
  footer: "footer_shown",
};

type GateState = {
  activePrompt: PromptId | null;
  cooldownUntil: number;
  formOpen: boolean;
  submitted: boolean;
  pendingNeedType: string | null;
};

const INITIAL_STATE: GateState = {
  activePrompt: null,
  cooldownUntil: 0,
  formOpen: false,
  submitted: false,
  pendingNeedType: null,
};

type EngagementContextValue = GateState & {
  tryShow: (id: PromptId) => boolean;
  closePrompt: () => void;
  requestOpenForm: (options?: { needType?: string }) => boolean;
  notifyFormClosed: () => void;
  notifySubmitted: () => void;
  consumePendingNeedType: () => void;
};

const EngagementContext = createContext<EngagementContextValue | null>(null);

export function useEngagement(): EngagementContextValue {
  const value = useContext(EngagementContext);
  if (!value) {
    throw new Error("useEngagement must be used inside EngagementProvider");
  }
  return value;
}

export function EngagementProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GateState>(INITIAL_STATE);
  // The ref is the gate's source of truth: tryShow mutates it synchronously so
  // two triggers firing in the same tick cannot both win.
  const stateRef = useRef<GateState>(INITIAL_STATE);

  const commit = useCallback((patch: Partial<GateState>) => {
    stateRef.current = { ...stateRef.current, ...patch };
    setState(stateRef.current);
  }, []);

  const tryShow = useCallback(
    (id: PromptId): boolean => {
      const current = stateRef.current;
      if (current.formOpen) return false;
      if (current.submitted) return false;
      if (current.activePrompt) return false;
      if (Date.now() < current.cooldownUntil) return false;

      let seen = false;
      try {
        seen = sessionStorage.getItem(PROMPT_KEYS[id]) === "1";
      } catch {
        /* storage unavailable — treat as not seen */
      }
      if (seen) return false;

      try {
        sessionStorage.setItem(PROMPT_KEYS[id], "1");
      } catch {
        /* storage unavailable — the prompt can still show */
      }

      commit({ activePrompt: id, cooldownUntil: 0 });
      return true;
    },
    [commit],
  );

  const closePrompt = useCallback(() => {
    if (!stateRef.current.activePrompt) return;
    commit({
      activePrompt: null,
      cooldownUntil: Date.now() + PROMPT_COOLDOWN_MS,
    });
  }, [commit]);

  const requestOpenForm = useCallback(
    (options?: { needType?: string }): boolean => {
      if (stateRef.current.submitted) return false;
      commit({
        activePrompt: null,
        cooldownUntil: Date.now() + PROMPT_COOLDOWN_MS,
        formOpen: true,
        pendingNeedType: options?.needType ?? null,
      });
      trackEvent("cta_click");
      trackEvent("inquiry_start");
      return true;
    },
    [commit],
  );

  const notifyFormClosed = useCallback(() => {
    commit({
      formOpen: false,
      cooldownUntil: Date.now() + PROMPT_COOLDOWN_MS,
      pendingNeedType: null,
    });
  }, [commit]);

  const notifySubmitted = useCallback(() => {
    commit({
      submitted: true,
      formOpen: false,
      activePrompt: null,
      pendingNeedType: null,
    });
  }, [commit]);

  const consumePendingNeedType = useCallback(() => {
    if (stateRef.current.pendingNeedType === null) return;
    commit({ pendingNeedType: null });
  }, [commit]);

  const value = useMemo<EngagementContextValue>(
    () => ({
      ...state,
      tryShow,
      closePrompt,
      requestOpenForm,
      notifyFormClosed,
      notifySubmitted,
      consumePendingNeedType,
    }),
    [
      state,
      tryShow,
      closePrompt,
      requestOpenForm,
      notifyFormClosed,
      notifySubmitted,
      consumePendingNeedType,
    ],
  );

  return (
    <EngagementContext.Provider value={value}>
      {children}
    </EngagementContext.Provider>
  );
}

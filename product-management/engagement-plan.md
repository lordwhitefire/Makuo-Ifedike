# Engagement Plan — All Nine Touchpoints

- **Date:** 2026-10-26
- **Status:** Approved by owner on 2026-10-26.
- **Applies to:** the pure Next.js portfolio
- **Related:** `decisions.md`, `portfolio-six-layer-plan.md`, `project-facts.md`, `architect-handoff.md`
- **Scope:** behaviour, triggers, timing, queue, and copy. Visual appearance and animation are the owner/designer’s call.

## 1. Rules

**Fixed**

- All **nine** touchpoints stay.
- The first bubble appears at **8 seconds** and keeps its current copy.
- The form is a **popup only**. It opens from the bubble’s **Talk** action and the exit-intent modal’s CTA.
- No form section on the page.

**Decided**

- **One prompt at a time.** Nothing stacks.
- A **20-second cooldown** follows every prompted touchpoint.
- Every prompted touchpoint is capped at **once per session**.
- The engagement layer is **behaviour-first**, not a fixed clock.

## 2. The shape of the nine

Five are prompted moments. Two modify the first bubble. Two are passive.

| # | Touchpoint | Type | Trigger | Timing | Duration | Frequency | CTA | Copy |
|---|---|---|---|---|---|---|---|---|
| 1 | First-time chat bubble | Prompt | First-time visitor | **8s after load** | 14s or close | Once per session | See the work · About me · Talk | “Hey — quick question: are you here for a marketing site, a web app, or fixing something that’s broken?” |
| 2 | Returning visitor message | Modifier of #1 | Visit count > 1 | Same as #1 | Same as #1 | Once per session | Same as #1 | **“Welcome back. Are you here to see the work, or talk about a project?”** |
| 3 | Time-of-day greeting | Passive | Page load | Immediate | Stays in hero | Every load | None | “Good morning. Software, fixed.” / “Good afternoon…” / “Good evening…” |
| 4 | Scroll 50% banner | Prompt | 50% of page scrolled | After #1 closes + 20s cooldown | 10s or close | Once per session | Jump to projects → `#work` | “Halfway through. Want me to just show you the work?” |
| 5 | Idle 45s panel | Prompt | 45s with no scroll, mouse, click, key, or touch | After cooldown; timer resets on interaction | 15s or close | Once per session | Yes, show me → `#work` · No thanks | “Still here? Want me to walk you through the work in 30 seconds?” |
| 6 | Exit-intent modal | Prompt — highest priority | Pointer leaves the top of the viewport, after 20s on page | Normally after cooldown; may bypass it when no prompt is visible and 10s have passed since the last prompt | Until close, max 20s | Once per session | **Tell me what’s broken** → opens form · Email instead → mailto | “Leaving already? If you’ve got a half-built thing, tell me what’s broken.” |
| 7 | Footer confetti + toast | Prompt — ambient | Footer/contact strip 60% visible | After cooldown; no other prompt visible | Confetti 2s; toast 8s | Once per session | None — points to the contact strip | “You saw everything. The contact strip is just above ↑” |
| 8 | Project card hover tooltip | Passive | Hover or keyboard focus on a project card | Immediate | While hovered/focused | Every time | None | Taglines below |
| 9 | Referrer-aware opener | Modifier of #1 | Referrer is LinkedIn or Twitter/X | Same as #1 | Same as #1 | First-time only | Same as #1 | “Saw you came from LinkedIn — what’s the project?” / “Saw you came from Twitter — what’s the project?” |

## 3. Session flow

```
0s      Time-of-day greeting appears in the hero. No prompt.
8s      First bubble appears (first-time, returning, or referrer variant).
22s     Bubble closes. 20s cooldown begins.
42s     Cooldown ends.
42s+    The next eligible trigger wins:
          exit intent (highest priority)
          50% scroll banner
          45s idle panel
          footer confetti + toast
        After each one closes, another 20s cooldown begins.
```

The queue is the point: a trigger that fires during a prompt or a cooldown waits. If its condition no longer holds when the cooldown ends — for example, the visitor scrolled back above 50% — it is dropped, not shown late.

These times assume the bubble runs its full 14 seconds. If it is dismissed earlier, the cooldown starts at dismissal, not at 22 seconds.

Exit intent is **desktop-only**. On touch devices it is disabled rather than faked; the idle panel and footer toast still cover the same moment.

## 4. Queue rules

1. **One active prompt.** If another trigger fires, it becomes pending; it does not appear.
2. **20-second cooldown** after every prompt closes or is dismissed.
3. **Priority when several are pending:** exit intent → scroll banner → idle panel → footer toast.
4. **Exit-intent exception:** it may bypass the cooldown only when no prompt is visible and at least 10 seconds have passed since the last prompt. It is the last-chance moment.
5. **Form open:** all prompts are suppressed and timers pause. Closing the form starts a 20s cooldown. Submitting the form ends engagement for the session.
6. **Once per session:** each prompted touchpoint appears at most once.
7. **No session cap:** every prompted touchpoint is eligible in the same session. The queue controls the order, not the number.
8. **No late prompts:** a pending prompt is shown only if its trigger is still true after the cooldown.

## 5. Copy

### 1. First-time bubble — fixed

> “Hey — quick question: are you here for a marketing site, a web app, or fixing something that’s broken?”

Buttons: **See the work** · **About me** · **Talk**

### 2. Returning bubble — decided

> “Welcome back. Are you here to see the work, or talk about a project?”

The current returning copy says “Athletica went into preview since you last visited.” That is stale and should be replaced when the returning variant is built.

### 3. Time-of-day greeting — keep

> “Good morning. Software, fixed.”
> “Good afternoon. Software, fixed.”
> “Good evening. Software, fixed.”

### 4. Scroll banner — keep

> “Halfway through. Want me to just show you the work?”
> CTA: **Jump to projects →**

### 5. Idle panel — keep

> “Still here? Want me to walk you through the work in 30 seconds?”
> Buttons: **Yes, show me** · **No thanks**

### 6. Exit modal — revised for the form

> “Leaving already? If you’ve got a half-built thing, tell me what’s broken.”
> Primary CTA: **Tell me what’s broken** → opens the popup form
> Secondary: **Email instead** → `mailto:mifedike@gmail.com`
> Foot: “One person, start to finish.”

The current exit modal links straight to email. It should open the form instead, with email as the fallback.

### 7. Footer toast — keep

> “You saw everything. The contact strip is just above ↑”

### 8. Project card tooltips — update

| Project | Tagline |
|---|---|
| Interior-deco | Interior design studio site — Whitefire Interior, Remix + Sanity |
| Truespec | Dealership system — back office, auth, PDF enquiries, documented migration history |
| Athletica | Football store — storefront, checkout, admin, Amazon affiliate settings; live preview |
| CP3-legacy | Chris Paul fan site / sports experience — live |

The Truespec tagline is the important correction: it is a dealership system, not only an inventory app. Athletica is a store with an affiliate feature, not an “affiliate platform”; CP3-legacy is a live fan site, not athlete software in development.

### 9. Referrer-aware opener — keep

> “Saw you came from LinkedIn — what’s the project?”
> “Saw you came from Twitter — what’s the project?”

Returning visitors take precedence over the referrer variant.

## 6. Form integration

- **Bubble Talk** opens the form. This is the primary entry point.
- **Exit modal “Tell me what’s broken”** opens the form. This is the secondary entry point.
- No other touchpoint opens the form. The banner, idle panel, footer toast, and card tooltip keep their existing jobs.
- The form stays open until the visitor submits or closes it.
- On submit: show a thank-you state, set `sessionEngagementComplete`, and stop all prompts for that session.
- On close without submit: start the 20s cooldown; do not reopen the bubble.
- While the form is open: no prompt, banner, panel, toast, or confetti may appear.
- Fields, destination, alerts, and consent follow `decisions.md`: Google Sheet record, email backup, WhatsApp alert, auto-reply.

## 7. Accessibility

- Dialogs: `role="dialog"`, `aria-modal="true"`, labelled, focus trapped, Escape closes, focus returns to the trigger.
- Auto-dismiss timers pause on hover and keyboard focus, so a prompt does not vanish while being read.
- The banner uses `role="status"` and has a real close button.
- The card tooltip works on keyboard focus, not hover only; use `aria-describedby`.
- Confetti respects `prefers-reduced-motion`; when reduced, show the toast without confetti.
- No prompt is the only way to reach a link or the form.

## 8. Measurement

Events:

- `engagement_prompt_shown` — touchpoint id
- `engagement_cta_click` — touchpoint id, CTA label
- `engagement_dismissed` — touchpoint id, method
- `form_open` — source: `bubble` or `exit_intent`
- `form_submit`
- `form_close`

Diagnostics:

- Prompt shown → CTA click rate, by touchpoint.
- Form open → submit rate, by source.
- Dismiss rate above 70% on a prompt is a signal to change timing or copy, not to add more prompts.

Primary product metric remains **qualified inquiry rate** from the portfolio plan.

## 9. What changes from the current build

| Current | Planned |
|---|---|
| Bubble at 3s | Bubble at **8s** |
| Prompts can overlap | Shared queue, one at a time, 20s cooldown |
| Scroll banner stays until closed | Auto-dismiss after 10s |
| Idle panel stays until closed | Auto-dismiss after 15s |
| Exit modal links to email | Primary CTA opens the form; email is fallback |
| Returning copy mentions Athletica preview | “Welcome back. Are you here to see the work, or talk about a project?” |
| Visit count increments every load | Increment once per session |
| Truespec tagline says “inventory + public site” | Dealership system tagline |
| Native `title` tooltip | Accessible hover/focus tooltip |
| Footer confetti can fire during another prompt | Respects the queue and cooldown |

## 10. Resolved

- Returning-visitor copy: decided.
- Form heading and submit-button copy: decided — “Tell me what you need” / “Send inquiry.”
- Visual treatment: owner/designer’s call.
- Analytics provider and consent copy: decided — Vercel Analytics + custom events; privacy page; form consent checkbox; banner only if cookies are introduced.

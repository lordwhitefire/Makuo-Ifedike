# TASK-005b — Engagement UI polish — Completion Report

**Branch:** `main`
**Commits:** `b2aa340` (popup move), `a58c34f` (popup border), `12aa12e` (form), plus this report
**Status:** done — all three changes verified with measured rectangles; nothing pushed.

## What changed

Three class-list edits, no logic:

1. `src/components/EngagementLayer.tsx:200` — `bottom-6` → `bottom-[145px] … min-[576px]:bottom-[190px]`
   on `#engagement-bubble`.
2. `src/components/EngagementLayer.tsx:200` — added `border border-white/15` to the same element.
3. `src/components/ContactLauncher.tsx:47` — added `min-h-[42px]` to the shared `inputClass`;
   `:269` — added `border border-white/15` to the dialog panel.

`ENGAGEMENT_ENABLED` is `false` in the working tree and in every commit.

## 1. Popup clears the orange button — VERIFIED

Measured in the attached Chrome (non-headless, CDP `:9222`) with the flag temporarily on,
then reverted. Gap = button top edge − bubble bottom edge.

| Viewport | Before | After | Vertical overlap after |
|---|---|---|---|
| 390×844 | **−102px** (56px overlap) | **+19px** | 0px |
| 768×1024 | −147px (56px overlap) | +19px | 0px |
| 1024×768 | −147px | +19px | 0px |
| 1440×900 | **−147px** (56px overlap) | **+19px** | 0px |

- At 390×844 the bubble now spans y `521→699`; the button spans y `718→774`.
- At 1440×900 the bubble spans y `530→710`; the button spans y `729→785`.
- 19px ≥ the 16px benchmark at every size.
- The bubble's horizontal position, width (340px), `max-w-[calc(100vw-3rem)]`, and `z-[9999]`
  are unchanged; horizontal overlap with the button (52–56px) remains but is irrelevant because
  the two no longer share any vertical space.

## 2. Popup look — VERIFIED

- Computed border: `1px solid` white at 15% alpha (`oklab(… / 0.15)`).
- Computed `border-radius: 0px` — square, as before.
- Outer width stays 340px (`box-sizing: border-box`), so the border did not resize the panel.
- Header (`Ifedike`, orange), message, close X, and the three links are untouched — the diff for
  that commit is one class line.
- Link styles unchanged: `See the work` solid orange, `About me` and `Talk` outlined.

## 3. Form look and behaviour — VERIFIED

Measured with the dialog open.

| Control | Before | After |
|---|---|---|
| name, email, project link | 38px | **42px** |
| need, budget, timeline (selects) | 40px | **42px** |
| message (textarea, `rows={4}`) | 98px | **98px** (floor only) |

- Dialog panel: computed border `1px solid` white 15%, `border-radius: 0px`, width 560px at
  1440 and 390px at 390 — no clipping, still scrolls when content exceeds `92vh`.
- Validation unchanged: `POST /api/inquiries` with `{}` returns the identical set —
  name, email, needType, budget, timeline, message, consent.
- Inner controls keep their 4px radius; only the two panels are square.

**Factual note on the spec's reasoning:** the task says "the dropdown is the one that currently
looks shorter". Measured, the selects were **40px** and the text inputs **38px** — the dropdown
was 2px *taller*, likely reading shorter because of its internal arrow/padding. The fix still
achieves what the benchmark asks: one height for all controls.

## 4. What was not verified, and why

- **503 fallback not re-fired.** `.env.local` holds live provider keys, so a valid submission
  would perform real sends. The diff is class-only, so the path cannot have changed; the 503
  response is recorded from the 2026-11-03 runs.
- **Success state not re-exercised** for the same reason (class-only diff; previously verified
  with a mocked 200).
- **A true 320px viewport was not reachable.** Chrome on this machine will not go below a 355px
  window, and the emulated 320 reported `clientWidth: 320` against a 355px layout viewport, which
  makes `scrollWidth > clientWidth` look like a horizontal scroll. 375px was tested and shows
  no horizontal scroll: `scrollWidth === clientWidth === 375`.
- **Screenshots:** none taken (browser-attach rule). The owner can watch the same window.

## 5. Gates

- `npx tsc --noEmit` — pass.
- `npx next build` — pass.
- `git diff` for the three commits — class strings only; no text, handler, state, constant, API,
  or analytics change.
- `ENGAGEMENT_ENABLED` — `false` in the tree and in all three commits.

## 6. Housekeeping

- `design-workspace/engagement-and-form-code.md` describes the old class strings and is now
  slightly out of date. Left untouched, as agreed.
- `openspec/tasks/TASK-005b-engagement-ui-polish/` and the `openspec/tasks-registry.md` edit were
  left out of the styling commits.
- Nothing pushed. `main` is ahead of `origin/main` by the four commits above.

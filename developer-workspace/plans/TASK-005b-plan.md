# Implementation Plan: TASK-005b — Engagement UI polish

## Overview

Three visual-only changes: lift the hidden `Ifedike` chat bubble clear of the orange contact
button, give the bubble and the contact dialog a thin border, and give every form control one
height. No copy, behaviour, flag, or handler changes. Verified by measuring real rectangles in
the attached browser with the popup temporarily enabled, then reverting the flag.

Source spec: `openspec/tasks/TASK-005b-engagement-ui-polish/task.md`
Verification spec: `openspec/tasks/TASK-005b-engagement-ui-polish/testing.md`

## Architecture Decisions

- **One class-list edit per element.** The bubble is `#engagement-bubble` at
  `src/components/EngagementLayer.tsx:197-204`; the dialog panel is at
  `src/components/ContactLauncher.tsx:263-269`; all seven fields share `inputClass` at
  `ContactLauncher.tsx:46-47`. No new component, no refactor, no `globals.css` rule needed.
- **Move by replacing `bottom-6`**, not by adding an offset: `bottom-[145px]` with
  `min-[576px]:bottom-[190px]`. Arithmetic: button top = `70 + 56 = 126px` (phones) and
  `115 + 56 = 171px` (≥576px); popup bottom at `145` / `190` → **19px gap** at both sizes.
- **`min-h-[42px]` on the shared const**, so the five one-line controls, the dropdowns, and the
  optional URL box all match by construction. The message `<textarea rows={4}>` keeps its
  multi-row height; `min-h` only sets a floor.
- **Squareness is inherited, not added.** Neither panel has a radius today; nothing is added or
  removed. Inner controls keep `rounded`.
- **Three source commits, in the owner's order**, plus one report commit.
- **Proving the hidden popup**: set `ENGAGEMENT_ENABLED = true` at
  `EngagementLayer.tsx:52` locally, measure, set it back to `false`, and confirm the final diff.

## Task List

### Phase 1: Popup

#### [x] Task 1: Move the popup clear of the orange button

**Description:** Replace `bottom-6` with `bottom-[145px] min-[576px]:bottom-[190px]` on
`#engagement-bubble`. Nothing else on the element changes — `right-6`, width,
`max-w-[calc(100vw-3rem)]`, `z-[9999]`, shadow, padding, and all children stay verbatim.

**Acceptance criteria:**
- [ ] `#engagement-bubble` computes to `bottom: 145px` at 390×844 and `190px` at 1440×900.
- [ ] The gap between the bubble's bottom edge and the button's top edge is **≥ 16px** at both sizes.
- [ ] No text, link, handler, or child element changed; the orange button is untouched.
- [ ] The final diff contains no `ENGAGEMENT_ENABLED` change.

**Verification:**
- [ ] Temporary `ENGAGEMENT_ENABLED = true`; measure both rectangles at 390×844 and 1440×900.
- [ ] Also load 320, 768, 1024: no horizontal scroll, nothing clipped.
- [ ] Revert the flag; `git diff src/components/EngagementLayer.tsx` shows only the class line.
- [ ] `npx tsc --noEmit`

**Dependencies:** None
**Files likely touched:** `src/components/EngagementLayer.tsx`
**Estimated scope:** Small (1 file)

---

#### [x] Task 2: Give the popup a thin border

**Description:** Add `border border-white/15` to the `#engagement-bubble` class list. Corners
stay square (none exists), and the shadow, padding, header, message, close X, and the three
links stay exactly as they are.

**Acceptance criteria:**
- [ ] Computed border is `1px solid rgba(255,255,255,0.15)`; `border-radius` is `0px`.
- [ ] The three links are still one solid orange (`See the work`) and two outlined (`About me`, `Talk`).
- [ ] No new element, text, or icon; the 19px clearance from Task 1 is unchanged.
- [ ] `box-sizing: border-box` absorbs the border — the bubble's outer width stays 340px.

**Verification:**
- [ ] Flag on, read computed styles and the outer `getBoundingClientRect()` at both sizes.
- [ ] Revert the flag; diff shows one class-list change only.

**Dependencies:** Task 1 (same element, measured against the same geometry)
**Files likely touched:** `src/components/EngagementLayer.tsx`
**Estimated scope:** Small (1 file)

---

### Checkpoint A — after Tasks 1–2

- [ ] Popup clears the button by ≥16px at 390×844 and 1440×900, with a border and square corners.
- [ ] Button position, size, colour, icon, and handler unchanged.
- [ ] `ENGAGEMENT_ENABLED` is `false` in the working tree.
- [ ] `npx tsc --noEmit` passes.

---

### Phase 2: Form

#### [x] Task 3: Give the form a border and equal field heights

**Description:** Add `border border-white/15` to the dialog panel class at
`ContactLauncher.tsx:263-269`, and add `min-h-[42px]` to `inputClass` at line 46–47.

**Acceptance criteria:**
- [ ] The panel computes `1px solid rgba(255,255,255,0.15)` and `border-radius: 0px`.
- [ ] Name, email, need, budget, timeline, message, and the optional URL field all measure the
  same height (≥ 42px); the dropdown matches the text inputs. The textarea stays multi-row.
- [ ] Empty submit still shows the identical per-field validation errors.
- [ ] With the adapters unconfigured, the route still returns the same `503` fallback.
- [ ] Labels, focus ring, submit button, consent, cooldown, analytics calls, and copy unchanged.

**Verification:**
- [ ] Measure all seven controls plus the panel border in the browser at 390×844 and 1440×900.
- [ ] Submit empty → capture the error list and compare with the pre-change list.
- [ ] `npx tsc --noEmit` and `npx next build`.
- [ ] `git diff` shows only class changes in `ContactLauncher.tsx`.

**Dependencies:** None (sequenced after Phase 1 for a clean commit history)
**Files likely touched:** `src/components/ContactLauncher.tsx`
**Estimated scope:** Small (1 file)

---

### Checkpoint B — after Task 3

- [ ] All form fields equal height, panel bordered, behaviour identical.
- [ ] `npx tsc --noEmit` and `npx next build` pass.
- [ ] Diff contains no logic, copy, or flag changes.

---

### Phase 3: Record

#### [x] Task 4: Completion report

**Description:** Write `developer-workspace/reports/TASK-005b-completion-report.md` with the
measured numbers, the commands run, what was verified and what was not, and a note that
`design-workspace/engagement-and-form-code.md` is now slightly out of date.

**Acceptance criteria:**
- [ ] The report contains the measured gap at 390×844 and 1440×900 (actual px, not "≥16").
- [ ] It states the final state of `ENGAGEMENT_ENABLED` and that the diff is styling-only.
- [ ] It names anything that could not be verified.
- [ ] Committed.

**Verification:** `git show --stat` on the report commit; `git status` clean.

**Dependencies:** Tasks 1–3
**Files likely touched:** `developer-workspace/reports/TASK-005b-completion-report.md`
**Estimated scope:** Small (1 file)

---

### Checkpoint C — complete

- [ ] All four tasks checked; four commits on `main`.
- [ ] Working tree clean; `ENGAGEMENT_ENABLED` is `false`.
- [ ] Nothing pushed (owner pushes).

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Native `<select>` renders a pixel or two taller/shorter than an `<input>` even with `min-h-[42px]` | Low | Measure and report the real numbers; do not add unrequested classes without asking (Q10) |
| Flag left `true` in the commit | High | Re-check `git diff` for `ENGAGEMENT_ENABLED` before every commit; testing.md check 6 |
| Border on the scrollable panel changes inner width by 2px | Low | `box-sizing: border-box`; check 320px for clipping and horizontal scroll |
| dev server stale CSS | Low | Confirm the dev server is up and the class change is served before measuring |
| Overlap at a width between 576 and 768 | Low | Measure 768 explicitly; the `min-[576px]` rule is the same one the button uses |

## Open Questions

None — all eleven decisions settled with the owner on 2026-11-04.

## Out of Scope (named so they are not touched)

Scroll banner, idle panel, exit-intent modal, footer toast, confetti, time-of-day greeting,
orange button, `src/content/inquiries.ts`, the inquiry API route, `openspec/`, and
`design-workspace/`.

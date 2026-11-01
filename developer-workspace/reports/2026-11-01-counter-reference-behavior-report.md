# Counter behavior — reference parity (2026-11-01)

**Asked:** the Why-Choose counters must look/behave like the reference, not just match
their geometry. The two differences the owner saw were (a) the boxes did not fade in and
(b) the digits counted as text instead of rolling.

## Change

- `src/app/page.tsx`
  - Counter boxes are wrapped in `Reveal variant="up" duration={2} delay={0.3 + i * 0.3}`
    — the reference's `wow fadeInUp` delays `.3s / .6s / .9s`, duration 2s.
  - Counter digits now use the reference's odometer library (`odometer@0.4.8`) via a
    client-only dynamic import, `format: "d"`, `duration: 2000`, triggered by an
    `IntersectionObserver` at threshold 0.1. Year rows keep the build's own count-up
    (approved item #11); they are selected as `.odometer:not(.count)`.
- `src/app/globals.css`
  - `Reveal` `up` hidden distance changed 30px → 20px, matching the reference's
    `@keyframes fadeInUp`.
  - `.count` line-height 1.12 → 1 (50px at 50px font), matching the reference's computed
    line box.
  - Added the odometer theme CSS (digit/spacer/ribbon structure and 2s ribbon transition).
- `src/types/odometer.d.ts` — module declaration for the untyped package.
- `package.json` / `package-lock.json` — added `odometer@0.4.8`.

## Verified at runtime (1200×800, build :3009)

| Check | Build value |
|-------|-------------|
| Before scroll | reveal `hidden`, visibility hidden, opacity 0, `translateY(20px)`; odometer initialised at 0 |
| On scroll | reveal `shown`; odometer classes `odometer-animating-up odometer-animating`; ribbon transform moving; last values 4 / 2 / 2 |
| Final digits | 4 / 2 / 2 (`.odometer-value` text) |
| Final boxes | 365×81 at x15 / 410 / 805 |
| Number box | 28×56 (reference 27.8×56) |
| Number type | Helvetica Neue 50px / 600 / line-height 50px / `rgb(137,113,91)` |
| Labels | unchanged, two-line 16/600 uppercase white-75 |
| Section | y1500, h822; Work follows at 2322 |
| Year rows | still count to 2022 / 2025 / 2026 |
| Console / requests | no errors, no 404s |
| Build / TypeScript | pass |

The reference's saved page does not reliably run its wow reveal under automation (its
counter boxes stay inline `visibility:hidden` when scrolled by script), so the reference
comparison uses the mapped reference values: same `wow fadeInUp` .3/.6/.9 + 2s, same
odometer roll, same 27.8×56 number box, same 50/600/50 Helvetica Neue bronze.

## Not verified / open

- Visual pixel comparison by the owner's eyes. Side-by-side screenshots were captured at
  `/tmp/opencode/ref-counter.png` and `/tmp/opencode/build-counter.png` (the model cannot
  read images).
- Reference Milestones years are static `<p>2022</p>`; the build's year rows still animate
  (approved #11). Left unchanged — say if they should be static too.
- Not committed and not pushed.

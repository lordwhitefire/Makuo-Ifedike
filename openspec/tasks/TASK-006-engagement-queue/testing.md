# TASK-006 — Testing task

You did not build this. Your job is to prove the engagement gate behaves as specified, not to review the code. Run the checks in order and record pass or fail for each, with what you actually saw. If something fails, report what happened — do not fix it.

If the builder runs this list instead of a separate tester, that is allowed. Run every scenario anyway and record each one honestly, including the ones you expect to pass. The independent pass is a separate, optional check.

## Before you start

1. `npm run validate:content` — must pass.
2. `npx tsc --noEmit` — must be clean.
3. `npx next build` — must succeed.
4. `npm run dev` and open `http://localhost:3000/`. **Use `localhost`, not `127.0.0.1`** — the dev server blocks the IP form and React will not hydrate.
5. Flip `ENGAGEMENT_ENABLED` to `true` locally. This is the only code change you make.

## Shorten the cooldown while testing

A 120-second cooldown makes these checks take about 20 minutes of waiting. Temporarily set `PROMPT_COOLDOWN_MS` to `5_000` in `src/components/EngagementProvider.tsx`.

**Before you finish, restore it to `120_000`** and confirm the final diff contains that value. Testing against 5 seconds is fine; shipping 5 seconds is not.

Two timings must **not** be shortened: the 8-second first bubble, and the exit modal's 20-second dwell and 20-second auto-dismiss. If you shorten those, you are testing something else.

## How to reset between scenarios

Create a fresh browser profile or clear storage between runs. Note the difference:

- `localStorage.ifedike_visit_count` — drives the returning-visitor copy. Clear it for a new visitor; set it to `5` for a returning visitor.
- `sessionStorage` keys — `bubble_shown`, `scroll50_shown`, `idle_shown`, `exit_intent_shown`, `footer_shown`, `ifedike_inquiry_submitted`. Clear these to start a session fresh.
- Reloading does **not** persist the cooldown. That is expected.

## Scenario 1 — first bubble at 8 seconds

Fresh visitor, clear all storage, load the page, do not touch the mouse.

- At 3 seconds: no bubble.
- At 8 seconds: the bubble appears, bottom right, with "Hey — quick question: are you here for a marketing site, a web app, or fixing something that's broken?" and the three buttons.
- It auto-dismisses after about 14 seconds.

**Pass:** the bubble appears at 8s and not before.

## Scenario 2 — returning visitor copy

Set `ifedike_visit_count` to `5`, clear session keys, reload.

- The bubble reads "Welcome back. Are you here to see the work, or talk about a project?"
- It is not the Athletica line ("Athletica went into preview…").
- It is not a LinkedIn/Twitter referrer line.

**Pass:** exactly the returning copy above.

## Scenario 3 — skip, not queue

Fresh session. Wait for the bubble at 8s, then scroll past 50% while the bubble is still on screen.

- No banner appears while the bubble is up.
- The bubble is not replaced by the banner.

Then close the bubble and scroll away and back past 50% **after** the cooldown.

- The banner appears.

**Pass:** the skipped banner was not queued, and it still works on a later crossing.

## Scenario 4 — nothing for the cooldown

Dismiss any prompt, then immediately:

- scroll past 50%;
- stop touching the mouse and keyboard for 45 seconds;
- move the pointer out of the window.

- Nothing appears for the full cooldown (120s in real config).
- After it expires, the next eligible trigger can show.

**Pass:** no prompt appears inside the window, and prompting resumes after it.

## Scenario 5 — exit intent

Desktop browser with a mouse (not a touch emulator). Fresh session.

**First appearance and auto-dismiss:**

- Before 20 seconds on the page: move the pointer out of the top of the window — nothing.
- After 20 seconds: move the pointer out — the modal appears.
- Let it sit: it auto-dismisses after about 20 seconds.

**Then test Escape and the CTA.** The modal's session key (`exit_intent_shown`) was written when it appeared, so it will not come back on its own. Clear that one key, then move the pointer out again.

- Press Escape: it closes.
- Clear `exit_intent_shown` again, move the pointer out, and click "Tell me what's broken": the form opens with **What do you need?** already set to **fix**.
- Clear the key once more, re-trigger, and click "Email instead": it is a `mailto:` link, and the modal closes with the cooldown running.

**Touch check:** open the page in a mobile emulator with touch, and confirm the gate's own check agrees — in the console, `matchMedia("(hover: hover) and (pointer: fine)").matches` must be `false`. Move the pointer out repeatedly.

- The modal never appears.

**Pass:** all of the above, including the preset need type and the touch check.

## Scenario 6 — exit during a prompt or cooldown

Fresh session, wait for the bubble at 8s, then move the pointer out of the window.

- No exit modal appears.
- The bubble is unaffected.

Close the bubble, then move the pointer out again during the cooldown.

- No exit modal.

After the cooldown, move the pointer out again.

- The exit modal appears (it was not marked as shown when skipped).

**Pass:** skipped, not marked, and still available later.

## Scenario 7 — form suppresses prompts

Fresh session. Open the form three ways: the orange launcher; the bubble's Talk button; the exit modal's primary button.

For each:

- The form opens.
- Any prompt that was on screen disappears.
- While the form is open, wait past 8 seconds and past the 45-second idle threshold, and scroll past 50%: no bubble, no banner, no panel, no toast, no confetti.

**Pass:** nothing appears behind or over the open form, from any trigger.

## Scenario 8 — form close and submit

- Close the form with the ×. For the full cooldown, no prompt appears. After it, prompting resumes.
- Reopen the form and submit a valid inquiry (or submit against a stubbed 200 response). From that point, no prompt appears for the rest of the session on any trigger.

**Pass:** close starts the cooldown; submit ends prompting entirely.

## Scenario 9 — the launcher is not a prompt

- Dismiss a prompt, then immediately click the orange launcher.
- The form opens. The button is not disabled and the ring is not draining.
- Close the form: the ring drains over its 20 seconds, then the button works again.

**Pass:** the 120-second prompt cooldown does not disable the launcher, and the ring is still 20 seconds.

## Scenario 10 — footer toast and confetti

Fresh session, scroll to the footer.

- The toast and confetti appear once.
- Scroll away and back: they do not repeat.

With `prefers-reduced-motion: reduce` (dev tools → Rendering → Emulate CSS media feature):

- The toast appears.
- No confetti falls.

**Pass:** once per session, and reduced motion keeps the message without the animation.

## Scenario 11 — no cap, and the session key rule

Fresh session. Let the bubble show at 8s and dismiss it. After the cooldown, trigger the banner, dismiss it. After the cooldown, idle 45s, dismiss the panel.

- All of them appear. There is no cap stopping the fourth or fifth prompt.
- Reload: the bubble, banner and panel do not show again (their keys persisted).
- A prompt that was **skipped** (not shown) before the reload is still eligible after it.

**Pass:** no session cap, shown prompts stay shown, skipped prompts stay eligible.

## Scenario 12 — accessibility pause

- Show the bubble. Move the pointer onto it and leave it there for 30 seconds. The bubble does not disappear.
- Move the pointer off. It disappears roughly the remaining time later, not a fresh 14 seconds.
- Repeat with keyboard focus inside the bubble (Tab to a button).
- Same check on the exit modal, plus Escape closes it.

**Pass:** the timer freezes and resumes; focus works the same as hover.

## Scenario 13 — final diff

Restore `PROMPT_COOLDOWN_MS` to `120_000`, then confirm all of the following in the diff:

- `ENGAGEMENT_ENABLED` is `false`.
- No work-card tooltip was restored.
- The hero time-of-day greeting is unchanged.
- No pending list, queue array, or retry logic exists in the code.
- The bubble still sits at `bottom-[145px]` / `min-[576px]:bottom-[190px]` with its thin border.
- The form's border, shared field height, and hidden scrollbar are intact.
- Only the two named copy lines changed; no other prompt copy was rewritten.
- No new animation was added.

**Pass:** every line above holds.

## What to hand back

For each scenario: pass or fail, what you did, and what you saw. For any failure, include the exact trigger, the timing, and a screenshot or console output. Also state the final values of `ENGAGEMENT_ENABLED` and `PROMPT_COOLDOWN_MS` in your report.

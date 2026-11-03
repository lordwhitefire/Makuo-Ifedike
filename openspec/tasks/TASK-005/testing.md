# TASK-005 Testing — Business logic — inquiries

## What must be checked

The tester verifies that all four Group 5 entries are complete. This is handed to a separate agent session that did not do the building.

## How the tester knows it passed

### 1. Form validation and spam protection

- Submit the popup form with missing/invalid fields → returns 400 with field errors.
- Submit with the honeypot field filled → returns 200, sends nothing to any adapter.
- Submit repeatedly beyond the rate limit → returns 429 with retryAfter: 600.
- Valid submission → passes validation and reaches adapter logic.

### 2. Route submissions

- With all keys present: submission writes one row to Google Sheet tab `Portfolio Inquiries`, fires email subject `[PORTFOLIO] New inquiry — {name}`, fires WhatsApp alert starting `[PORTFOLIO] New inquiry`, visitor receives auto-reply `Thanks — I'll reply within one business day.`
- With no keys: route returns honest 503 with `fallbackEmail: mifedike@gmail.com`; no fake success.
- Each adapter is skipped with a log when its keys are missing.
- No accounts created; no keys provisioned during this task.

### 3. Privacy page

- /privacy returns 200.
- Form consent checkbox links to /privacy.
- Privacy page explains how inquiry details are used.

### 4. Analytics events

- page_view fires on page load.
- project_view fires when a visitor views a project card.
- cta_click fires when a visitor clicks a CTA.
- inquiry_start fires when the form opens.
- inquiry_submit fires when the form submits.
- outbound_project_click fires when a visitor clicks a live-project link.
- No personal data is sent in events.
- No cookie banner (no analytics cookies introduced).

## Pass / fail

- **Pass:** all four checks above are true.
- **Fail:** invalid submissions not rejected, honeypot not silently dropped, rate limit not enforced, keys present but sends not attempted, keys missing but fake success returned, privacy page missing or not linked, analytics events missing, personal data in events, cookie banner present without cookies.

## Notes

- Groups 1–4 must be complete before Group 5 — they are (all entries ticked in `openspec/tasks-registry.md`).
- Live sends are NOT verified without keys. Report honestly: `NOT RUN` and `NOT VERIFIED`.
- No UI redesign. Your visible page stays as-is except the ContactLauncher icon button already added.

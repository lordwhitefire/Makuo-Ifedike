# TASK-005 — Business logic — inquiries

## What this is

This is the implementation task for **Group 5 — Business logic — inquiries** of the portfolio task registry. It covers four entries:

1. Form validation and spam protection (honeypot plus rate limit)
2. Route submissions: Google Sheet row + email + WhatsApp + auto-reply ([PORTFOLIO] label)
3. Privacy page linked from consent checkbox
4. Analytics events (page_view, project_view, cta_click, inquiry_start, inquiry_submit, outbound_project_click)

## Why

Group 4 built the ContactLauncher form UI and a minimal /api/inquiries route that returns an honest 503 when no keys exist. Group 5 wires the real submission flow: validation, spam protection, routing to Google Sheet + email + WhatsApp + auto-reply, and the privacy page the consent checkbox points to. It also adds the analytics events the whole site reports.

Much of this was already built during TASK-004 Tasks 1–2 (env-gated adapters, validation, honeypot, rate limit, privacy page, honest 503). This task verifies everything connects, adds the missing analytics events, and confirms no live sends happen without keys.

## What to change

### 1. Form validation and spam protection (honeypot plus rate limit)

The /api/inquiries route already has:
- Server-side validation: name, email, need type, budget range, timeline, message required; consent checkbox required
- Honeypot field: submissions with a filled honeypot are accepted silently and send nothing
- Best-effort in-memory rate limit: 5 per window, then 429 with retryAfter: 600

**Benchmark:** after this change, invalid submissions return 400 with field errors; honeypot submissions return 200 and trigger no adapters; repeated hits return 429.

### 2. Route submissions: Google Sheet row + email + WhatsApp + auto-reply

The route already has env-gated adapters:
- Google Sheets via google-auth-library + Sheets REST values:append RAW to tab `Portfolio Inquiries`
- Resend: owner email subject `[PORTFOLIO] New inquiry — {name}`; visitor auto-reply `Thanks — I'll reply within one business day.`
- Twilio: WhatsApp alert starts `[PORTFOLIO] New inquiry`

All adapters check their own keys. Missing keys = skipped, logged, never faked. If nothing configured, the route returns 503 with `fallbackEmail: mifedike@gmail.com`.

**Benchmark:** after this change, a valid submission with all keys present writes one Sheet row, fires email and WhatsApp alerts, and sends the auto-reply. With no keys, returns honest 503. No account creation or key provisioning happens here.

### 3. Privacy page linked from consent checkbox

Already built at /privacy with metadata and canonical. The form's consent checkbox links to it.

**Benchmark:** after this change, /privacy returns 200; clicking consent checkbox links to /privacy.

### 4. Analytics events

Add client-side analytics event reporting to Next.js/Vercel Analytics custom events:
- page_view — on page load
- project_view — when a visitor views a project card
- cta_click — when a visitor clicks a CTA
- inquiry_start — when the form opens
- inquiry_submit — when the form submits
- outbound_project_click — when a visitor clicks a live-project link

No cookie banner unless analytics cookies are introduced (none are).

**Benchmark:** after this change, the listed events fire on the corresponding visitor actions. No personal data is sent in events.

## Boundaries

- No account creation or key provisioning. Keys go in env vars only when you add them.
- No live sends tested without keys. Route returns honest 503 fallback.
- No testimonial section, no fake quotes.
- No fifth project, no /work/[slug], no project-details.html.
- No CSS-hidden text, white-on-white text, off-screen blocks, or display:none keyword stuffing.
- No UI redesign. Keep dark Andle look.
- Your UI stays as-is except the ContactLauncher icon button already added in Group 4.

## Dependencies on Groups 1–4

Groups 1–4 must be complete (they are — all entries ticked in the registry). Group 5 reads from the inquiry route and project records built in Groups 3–4.

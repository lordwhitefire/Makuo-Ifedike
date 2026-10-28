## Purpose

Captures visitor inquiries through the popup form, validates and qualifies them, routes them to the Google Sheet record plus email and WhatsApp alerts, sends an auto-reply, and applies spam protection.

## ADDED Requirements

### Requirement: Form fields
The popup form SHALL collect name, email, need type (marketing site / web app / fix), budget range, timeline, message, an optional project link, and a consent checkbox linked to the privacy page.

#### Scenario: Form presents all fields
- **WHEN** the popup form opens
- **THEN** name, email, need type, budget range, timeline, message, optional project link, and consent checkbox are present

### Requirement: Submission routing
Every submission SHALL create a row on the Google Sheet tab `Portfolio Inquiries`, trigger an email with subject `[PORTFOLIO] New inquiry — {name}`, trigger a WhatsApp alert starting with `[PORTFOLIO] New inquiry`, and send the visitor an auto-reply.

#### Scenario: Submitting routes to all four destinations
- **WHEN** a visitor submits the form
- **THEN** a Sheet row is added, email and WhatsApp alerts fire with the `[PORTFOLIO]` label, and the visitor receives "Thanks — I'll reply within one business day."

### Requirement: Qualification rubric
A qualified inquiry SHALL be a small-business owner or decision-maker with a concrete project (marketing site, web app, or fix), a timeline, and willingness to discuss budget. Spam, recruiters, students, and vendors SHALL be excluded.

#### Scenario: Owner qualifies an inquiry row
- **WHEN** the owner reviews a Sheet row
- **THEN** status moves from new → qualified → replied → won/lost using the rubric

### Requirement: Spam protection
Submissions SHALL pass a honeypot and rate-limit check before routing. Turnstile SHALL be added if spam appears.

#### Scenario: Honeypot and rate limit run before routing
- **WHEN** a submission arrives
- **THEN** honeypot and rate-limit checks run before the Sheet, email, or WhatsApp destinations are touched

### Requirement: Consent and privacy
The consent checkbox SHALL link to a privacy page. A cookie banner SHALL appear only if analytics cookies are introduced.

#### Scenario: Consent checkbox links to privacy page
- **WHEN** the popup form renders
- **THEN** a consent checkbox with a link to the privacy page is present

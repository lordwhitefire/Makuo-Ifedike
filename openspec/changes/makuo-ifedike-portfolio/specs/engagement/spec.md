## Purpose

Runs all nine engagement touchpoints through one queue so they never stack, with the first bubble at 8 seconds, a 20-second cooldown, and the popup form opened only from the bubble's Talk action or the exit-intent CTA.

## ADDED Requirements

### Requirement: All nine touchpoints stay, once per session
All nine touchpoints SHALL remain in the portfolio. Each prompted touchpoint SHALL appear at most once per session. There SHALL be no three-prompt session cap.

#### Scenario: No session cap removes a touchpoint
- **WHEN** a visitor completes a session
- **THEN** all nine touchpoint types remain eligible (none are capped out early)

### Requirement: One prompt at a time, never stacked
Only one prompted touchpoint SHALL be visible at any time. A trigger that fires during a prompt or cooldown SHALL become pending instead of appearing.

#### Scenario: Concurrent triggers queue instead of stacking
- **WHEN** two prompts become eligible at the same moment
- **THEN** only one is visible and the other waits as pending

### Requirement: First bubble at 8 seconds
The first chat bubble SHALL appear at 8 seconds after page load with the fixed copy "Hey — quick question: are you here for a marketing site, a web app, or fixing something that's broken?" and buttons See the work, About me, Talk.

#### Scenario: First-time visitor sees the bubble at 8 seconds
- **WHEN** a first-time visitor loads the page
- **THEN** the chat bubble appears at 8 seconds with the fixed copy and buttons

### Requirement: 20-second cooldown after every prompt
A 20-second cooldown SHALL follow every prompted touchpoint (close or dismiss). No new prompt SHALL appear during a cooldown.

#### Scenario: Cooldown blocks new prompts
- **WHEN** a prompt closes or is dismissed
- **THEN** no new prompt appears for 20 seconds

### Requirement: Returning visitor copy
For a returning visitor (visit count > 1), bubble #1 SHALL use the copy "Welcome back. Are you here to see the work, or talk about a project?" This SHALL take precedence over the referrer-aware variant.

#### Scenario: Returning visitor gets the returning copy
- **WHEN** the visitor has visited before (count > 1)
- **THEN** bubble #1 uses the returning-visitor copy

### Requirement: Popup form opens only from Talk or exit-intent
The popup contact form SHALL open only from the bubble's Talk action or the exit-intent modal's CTA. There SHALL be no inline form and no form section on the page.

#### Scenario: Form opens only via the two allowed triggers
- **WHEN** a visitor clicks Talk or the exit-intent CTA
- **THEN** the popup form opens; no other touchpoint opens the form

### Requirement: Form lifecycle suppresses engagement
The form SHALL stay open until the visitor submits or closes it. Closing SHALL start a 20-second cooldown. Submitting SHALL end engagement prompts for the session. While the form is open, no prompt, banner, panel, toast, or confetti SHALL appear.

#### Scenario: Submitting ends engagement for the session
- **WHEN** a visitor submits the popup form
- **THEN** no further prompts appear during that session

### Requirement: Exit intent is desktop-only and highest priority
Exit intent SHALL be desktop only (disabled, not faked, on touch devices). It SHALL be the highest-priority pending prompt, auto-dismiss after 20 seconds max, with primary CTA opening the form and email as fallback.

#### Scenario: Exit modal opens the form
- **WHEN** the pointer leaves the viewport after 20s on the page (desktop)
- **THEN** the exit modal shows its copy with primary CTA "Tell me what's broken" opening the form and secondary "Email instead" as a mailto fallback

## Purpose

Runs all five prompted touchpoints through one shared gate so they never stack. A prompt shows only when nothing else is showing and the cooldown has expired; a trigger that fires when it may not show is skipped, not held back. The first bubble appears at 8 seconds, every close starts a 120-second cooldown, and the popup form opens from the orange contact launcher, the bubble's Talk action, or the exit-intent CTA.

## ADDED Requirements

### Requirement: All five prompted touchpoints stay, once per session
The five prompts — first bubble, 50% scroll banner, 45-second idle panel, exit intent, and footer toast with confetti — SHALL remain in the portfolio. Each prompt SHALL appear at most once per session. A prompt's session key SHALL be written only when the prompt actually appears; a skipped attempt SHALL NOT mark it. There SHALL be no three-prompt session cap and no cap on the number of prompts a visitor may see in one session.

#### Scenario: No session cap removes a touchpoint
- **WHEN** a visitor completes a session
- **THEN** all five prompt types remain eligible (none are capped out early)

#### Scenario: A skipped attempt does not consume the prompt
- **WHEN** a prompt's trigger fires while another prompt is showing or during the cooldown
- **THEN** that prompt is not marked as shown, and may appear if its trigger fires again after the cooldown

### Requirement: One prompt at a time, never stacked
Only one prompted touchpoint SHALL be visible at any time. A trigger that fires while another prompt is visible, or during the cooldown, SHALL be skipped. No prompt SHALL be held back to appear later.

#### Scenario: Concurrent triggers skip instead of stacking
- **WHEN** two prompts become eligible at the same moment
- **THEN** only one is visible and the other is skipped, not queued

### Requirement: First bubble at 8 seconds
The first chat bubble SHALL appear at 8 seconds after page load with the fixed copy "Hey — quick question: are you here for a marketing site, a web app, or fixing something that's broken?" and buttons See the work, About me, Talk. The Talk action SHALL open the popup form.

#### Scenario: First-time visitor sees the bubble at 8 seconds
- **WHEN** a first-time visitor loads the page
- **THEN** the chat bubble appears at 8 seconds with the fixed copy and buttons

### Requirement: 120-second cooldown after every prompt
A 120-second cooldown SHALL start after any prompted touchpoint closes, is dismissed, has a link clicked, or auto-dismisses. No new prompt SHALL appear during the cooldown. The cooldown SHALL gate prompts only and SHALL NOT disable the contact launcher.

#### Scenario: Cooldown blocks new prompts
- **WHEN** a prompt closes or is dismissed
- **THEN** no new prompt appears for 120 seconds

#### Scenario: Launcher stays usable during the prompt cooldown
- **WHEN** a prompt closes and the 120-second cooldown starts
- **THEN** the orange contact launcher stays visible and can open the form

### Requirement: Returning visitor copy
For a returning visitor (visit count > 1), bubble #1 SHALL use the copy "Welcome back. Are you here to see the work, or talk about a project?" This SHALL take precedence over the referrer-aware variant.

#### Scenario: Returning visitor gets the returning copy
- **WHEN** the visitor has visited before (count > 1)
- **THEN** bubble #1 uses the returning-visitor copy

### Requirement: Popup form opens from the launcher, Talk, or exit-intent
The popup contact form SHALL open from the orange contact launcher, the bubble's Talk action, or the exit-intent modal's CTA. There SHALL be no inline form and no form section on the page. The launcher SHALL keep its own 20-second guard after it opens the form; that guard SHALL NOT block the form from opening through Talk or the exit modal.

#### Scenario: Form opens from any allowed trigger
- **WHEN** a visitor clicks the launcher, Talk, or the exit-intent CTA
- **THEN** the popup form opens; no other touchpoint opens the form

### Requirement: Form lifecycle suppresses engagement
The form SHALL stay open until the visitor submits or closes it. Opening the form SHALL dismiss the active prompt, and that prompt SHALL NOT resume when the form closes. Closing SHALL start the 120-second cooldown. Submitting SHALL end engagement prompts for the session. While the form is open, no prompt, banner, panel, toast, or confetti SHALL appear.

#### Scenario: Submitting ends engagement for the session
- **WHEN** a visitor submits the popup form
- **THEN** no further prompts appear during that session

#### Scenario: Opening the form dismisses the active prompt
- **WHEN** a prompt is visible and the form opens
- **THEN** the prompt is hidden and does not return after the form closes

### Requirement: Exit intent is desktop-only and skipped when busy
Exit intent SHALL be desktop only, gated on hover and a fine pointer rather than user-agent sniffing. It SHALL be attempted only after 20 seconds on the page, and SHALL be skipped if any prompt is visible or the cooldown is running. It SHALL auto-dismiss after 20 seconds. Its primary CTA "Tell me what's broken" SHALL open the form with the need type preset to "fix"; secondary "Email instead" SHALL remain the mailto fallback.

#### Scenario: Exit modal opens the form
- **WHEN** the pointer leaves the viewport after 20s on the page (desktop, no other prompt showing)
- **THEN** the exit modal shows its copy with primary CTA "Tell me what's broken" opening the form and secondary "Email instead" as a mailto fallback

#### Scenario: Exit intent skipped during a prompt or cooldown
- **WHEN** the pointer leaves the viewport while another prompt is visible or the cooldown is running
- **THEN** the exit modal does not show, is not marked as shown, and may show on a later exit attempt

### Requirement: Footer toast and confetti are one prompt
The footer toast and confetti SHALL be gated together and appear at most once per session. If the footer prompt may not show, neither SHALL appear. Under `prefers-reduced-motion: reduce` the confetti SHALL be suppressed and the toast SHALL still appear.

#### Scenario: Reduced motion keeps the message
- **WHEN** a visitor with reduced motion enabled reaches the footer
- **THEN** the toast appears and no confetti falls

### Requirement: Prompts pause instead of disappearing
While the pointer is over the bubble or the exit modal, or keyboard focus is inside it, the auto-dismiss timer SHALL pause and resume with the remaining time. Escape SHALL close the exit modal. Closing by any path SHALL start the 120-second cooldown.

#### Scenario: Reading the bubble does not rush it
- **WHEN** the visitor moves the pointer onto the bubble
- **THEN** its auto-dismiss timer stops, and continues from where it stopped when the pointer leaves

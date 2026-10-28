## Purpose

Holds the four featured project records as a single source of truth, renders cards and same-page case-study modals from them, and presents the My Stack grid without client logos or unverified proof.

## ADDED Requirements

### Requirement: Four featured projects only
The portfolio SHALL show exactly four projects — Interior-deco, Truespec, Athletica, CP3-legacy — and SHALL NOT add a fifth project.

#### Scenario: Work section shows four cards
- **WHEN** the home page loads
- **THEN** exactly four project cards appear, one for each featured project

### Requirement: Single source of truth for cards, filters, and modals
Project cards, work filters, and case-study modals SHALL read the same project records. No project card SHALL be duplicated across filter tabs.

#### Scenario: Filter tabs do not duplicate cards
- **WHEN** a visitor applies a work filter
- **THEN** no project card appears more than once and each open modal matches its card's record

### Requirement: Case-study modal structure with no numbers
Each case-study modal SHALL present problem → constraints → approach → outcome in words (no numbers) → stack → live link. The modal's only link SHALL go to the real live project. No contact form SHALL appear inside a case-study modal.

#### Scenario: Modal opens from a project card
- **WHEN** a visitor clicks a project card
- **THEN** the modal shows the record's problem, constraints, approach, outcome in words with no numeric outcomes, its stack, screenshots, and exactly one link to the live project

### Requirement: Truespec is the flagship dealership system
Truespec's case study SHALL lead with the public showroom plus private office, documented migration history, auth, and PDF enquiries. It SHALL NOT be described as only an "inventory app".

#### Scenario: Truespec modal describes a dealership system
- **WHEN** the Truespec modal renders
- **THEN** it describes a public showroom and private office, a documented migration history, auth, and PDF enquiries, and never labels Truespec only an inventory app

### Requirement: My Stack grid
The My Stack section SHALL be a static 6x2 grid on desktop (4 columns tablet, 2 mobile) with 28px monochrome marks and visible labels. The stack SHALL be Next.js, React, Remix, TypeScript, Tailwind CSS, Sanity, Supabase, Neon Postgres, Prisma, Clerk, Vercel, Vitest. No marquee and no client logos.

#### Scenario: My Stack renders as a static grid
- **WHEN** the My Stack section loads
- **THEN** twelve marks appear in a 6x2 desktop grid with visible labels and no moving marquee

### Requirement: No unverified proof
The public site SHALL contain no client logos, no testimonials, no stock office photos, no counters, and no numeric outcome claims or invented metrics.

#### Scenario: Public surfaces carry no fake proof
- **WHEN** any page of the site renders
- **THEN** there are no client logos, testimonials, counters, or numeric outcome claims

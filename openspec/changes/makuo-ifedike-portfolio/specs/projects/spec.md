## Purpose

Holds the four featured project records as a single source of truth, renders cards from them, and feeds project stories (problem → constraints → approach → outcome) into SEO structured data. Presents the My Stack grid without client logos or unverified proof.

## ADDED Requirements

### Requirement: Four featured projects only
The portfolio SHALL show exactly four projects — Interior-deco, Truespec, Athletica, CP3-legacy — and SHALL NOT add a fifth project.

#### Scenario: Work section shows four cards
- **WHEN** the home page loads
- **THEN** exactly four project cards appear, one for each featured project

### Requirement: Project statuses reflect records
Interior-deco and Truespec are "live". Athletica and CP3-legacy are "in progress". Truespec is the featured/star project.

#### Scenario: Statuses match records
- **WHEN** the project records are inspected
- **THEN** Interior-deco status is "live", Truespec status is "live", Athletica status is "in progress", CP3-legacy status is "in progress", and Truespec is marked featured

### Requirement: Single source of truth for cards and filters
Project cards and work filters SHALL read the same project records. No project card SHALL be duplicated across filter tabs.

#### Scenario: Filter tabs do not duplicate cards
- **WHEN** a visitor applies a work filter
- **THEN** no project card appears more than once

### Requirement: Truespec is the flagship dealership system
Truespec's story SHALL lead with the public showroom plus private office, documented migration history, auth, and PDF enquiries. It SHALL NOT be described as only an "inventory app".

#### Scenario: Truespec story describes a dealership system
- **WHEN** the Truespec project record is read
- **THEN** it describes a public showroom and private office, a documented migration history, auth, and PDF enquiries, and never labels Truespec only an inventory app

### Requirement: Athletica is client work
Athletica SHALL be described as built for a friend's affiliate business — client work, not the owner's own product.

#### Scenario: Athletica story notes client relationship
- **WHEN** the Athletica project record is read
- **THEN** it states Athletica was built for a friend who runs an affiliate business — client work, not the owner's own product

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

## Purpose

Fixes the portfolio identity so the display name is Makuo Ifedike everywhere visible while the legal name Victor Makuo Ifedike stays in structured data only, and removes Whitefire and superseded name variants from all public surfaces.

## ADDED Requirements

### Requirement: Display name is Makuo Ifedike on every visible surface
The H1, page title, footer, wordmark/logo, and social surfaces SHALL all read "Makuo Ifedike". They SHALL NOT read "Ifedike Victor", "Ifedike Victor Makuo", or present "Whitefire" as the portfolio identity.

#### Scenario: Home page renders the correct display name
- **WHEN** a visitor loads the home page
- **THEN** the H1 and `<title>` contain "Makuo Ifedike" and do not contain "Ifedike Victor" or "Whitefire"

### Requirement: Legal name in structured data only
JSON-LD SHALL carry `legalName` "Victor Makuo Ifedike" and `alternateName` including the full name and aliases. The legal name SHALL never be the H1 or page title.

#### Scenario: Structured data separates display and legal name
- **WHEN** the JSON-LD `@graph` is parsed
- **THEN** the Person `@id` name is "Makuo Ifedike" while `legalName`/`alternateName` contain "Victor Makuo Ifedike"

### Requirement: Aliases preserved in structured data only
`alternateName` SHALL include "Ifedike Victor", "Ifedike Victor Makuo", "lordwhitefire", "makuoifedike", and "lwhitefire" so the superseded names are not lost.

#### Scenario: Aliases appear only in alternateName
- **WHEN** the Person JSON-LD is inspected
- **THEN** `alternateName` lists the superseded variants and none of them appear as the `name` or in visible copy

### Requirement: Location is Onitsha and Awka, Anambra State, Nigeria
The Person JSON-LD SHALL carry address locality "Onitsha and Awka", address region "Anambra State", address country "Nigeria". The owner lives in both cities.

#### Scenario: Structured data carries both cities
- **WHEN** the Person JSON-LD is parsed
- **THEN** addressLocality is "Onitsha and Awka" and addressCountry is "Nigeria"

### Requirement: Education is B.Eng Chemical Engineering, Nnamdi Azikiwe University, Aug 2019–Aug 2025
The Person JSON-LD `alumniOf` SHALL name Nnamdi Azikiwe University. Education dates Aug 2019–Aug 2025 confirmed by LinkedIn data export (C-04 closed; 2025 graduation confirmed).

#### Scenario: Alumni record carries the university and date range
- **WHEN** the Person JSON-LD `alumniOf` is inspected
- **THEN** institution is "Nnamdi Azikiwe University" and education dates are confirmed Aug 2019–Aug 2025

### Requirement: Whitefire is not the owner's studio
Interior-deco SHALL be described as branded Whitefire Interior, the project's brand. Copy SHALL NOT state that Whitefire is the owner's studio or a confirmed client engagement.

#### Scenario: Interior-deco case study notes the brand correctly
- **WHEN** the Interior-deco case-study modal renders
- **THEN** it states Whitefire Interior is the project's brand, not the owner's studio or a confirmed client engagement

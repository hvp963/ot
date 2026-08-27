# Claude Code — Project Instructions

## Engineering Standards

All code in this project follows the Engineering OS at:
`C:\data-code\git\engineering-os`

## Active Skills

- `eng-os-core` — always active; owns the checkpoint table that routes to every skill below
- `design-system` — Next.js/React UI, inherits its token set and component patterns from
  `C:\data-code\git\asset-intelligence` (see Design System Carryover below)
- `prose-style` — every screen is narrative copy read by two OneTrust executives; no AI-cliché
  phrasing, no em dashes joining clauses, no filler
- `documentation-standards` — the source materials in `input/` are working documents; this
  CLAUDE.md and any ADRs must stay in sync with what actually ships
- `code-conventions` — single source of truth for content in `src/data/*.json`; screens read
  from it, never hardcode duplicate copy
- Omitted, not applicable: `api-design` (static site, no backend API), `database-design` (no
  database — JSON files are the data layer per explicit instruction), `security-practices` (no
  auth, no user input, no PII collection — content is pre-authored, not user-submitted),
  `testing-strategy` (static narrative site with no business logic to unit test; visual review
  is the verification method), `deployment-practices` (local-only for now; no CI/CD exists),
  `observability` (no runtime service, nothing to instrument), `ai-ids-authoring` /
  `model-optimization` (no AI system in this app), `team-practices` (single-person project),
  `etl-scaffold` / `service-scaffold` / `system-design` (not a service or pipeline)

This list is the drift-check artifact. Update it if the project's scope changes (e.g. adding a
backend would bring in `api-design`).

---

## Platform Context

Standalone project. Not part of a multi-app suite. Visually, it borrows its design tokens and
component patterns from `C:\data-code\git\asset-intelligence` (see Design System Carryover)
because that app was already shown to the audience (Sriram, DV) and its visual language reads as
familiar, credible work rather than a new unfamiliar style.

## Audience and Framing

Two named readers: **Sriram** (SVP & GM, AI Platform & Emerging Products) and **DV** (CPTO).
Haresh Parekh (HP) shares this app with Sriram, who shows it to DV. Every section must read as
a polished, executive-level narrative — informative and persuasive, never as an internal
strategy memo. No raw organizational politics, no commentary on individual people's motives or
insecurities, no content that would be awkward if screen-shared in a room with DV present. The
tone is confident and grounded, not a pitch that oversells.

Every section reinforces one throughline: OneTrust cannot grow a $400M+ AI business without a
parallel, lean build function — architecture and engineering integrated, not separated — and HP
is the executive who has built exactly this before, at Adobe and Silver Labs scale.

## Core Entities

- **Section** — one scrollable/navigable narrative unit (Business Case, Operating Model,
  Architecture, Evidence, Close). Defined in `src/data/sections.json`.
- **OperatingModelOption** — one of the two proposed structures for HP's role (Field CTO/FDE
  under Sriram vs. distinguished architect under a VP in DV's org); rendered side by side with
  one visually marked as recommended.
- **EvidenceItem** — one quantified proof point (Adobe platform metrics, Silver Labs metrics,
  white paper, Engineering OS). Defined in `src/data/evidence.json`.
- **ArchitectureArtifact** — one embedded diagram (functional architecture bridge, module
  detail, or the asset-intelligence v6 evolution matrices shown as an illustrative work sample).
- **MindMapNode** — one node in the overview mind map tying the narrative sections together;
  clicking a node deep-links to that section.

## Screens and Flows

Four top-level tabs, per HP's explicit restructure request (2026-08-26):

- **Context & Experience** (`/`) — what Sriram and DV each asked for in their conversations
  (Sriram's business case, DV's two pillars), followed by the Adobe/Silver Labs evidence
  reframed as proof a parallel build function works. No mind map on this tab; it moved to
  Appendix.
- **Architecture** (`/architecture`) — link cards only, two groups: OneTrust functional
  architecture diagrams, and Asset Intelligence technical architecture diagrams (labeled
  illustrative work sample, already reviewed with Sriram/DV). No embedded tables or expandable
  detail here — that lives in Appendix.
- **References & POV** (`/references`) — the three testimonials (Nicole, Ankit, Harshiny), a
  link to the full profile PDF, the two-option operating-model comparison (Field CTO/FDE under
  Sriram vs. Distinguished Architect under DV's org, first option recommended), and HP's closing
  POV on dual reporting plus the BMAD-vs-Kiro answer to DV's dev-lifecycle question.
- **Appendix** (`/appendix`) — everything from the original single-narrative build, kept for
  reuse: the interactive mind map, the full business case and $10M→$100M+ scale proposal
  timeline, the full 7-layer architecture with expandable module-level detail, and the
  marketecture-to-engineering crosswalk table. In-page sub-nav via `AppendixNav`.

## Design System Carryover

Inherits design tokens and component classes from `C:\data-code\git\asset-intelligence`
(`src/app/globals.css`, `tailwind.config.js`). Do not retype token values here; copy
`globals.css` into this project once at setup and extend it with project-specific classes that
reference the same custom properties.

**Documented deviation:** the source design system caps content width at 860px. HP explicitly
requested this app use 90% of the viewport width instead (2026-08-26), because the wide link
cards and side-by-side layouts in the Architecture and References tabs read as cramped at
860px. `PageShell` uses `w-[90%]` for the outer container; individual blocks of prose within a
page still cap at `max-w-[820px]` for readability. This is a deliberate per-app override, not
drift — do not silently revert to 860px on a future edit. Canonical tokens (for reference, not to be hand-edited
independently of the source file): `--bg`, `--surface`, `--surface-2/3`, `--border`,
`--border-bright`, `--text`, `--text-muted`, `--text-dim`, `--primary` (#0284c7),
`--indigo`, `--cyan`, `--green`/`--amber`/`--red`, `--shadow-sm`/`--shadow-md`. Font stack:
DM Sans (body) + Space Grotesk (display), loaded via Google Fonts import.

The OneTrust strategy-deck screenshots in `input/` (dark background, green/amber accents) are
reference material for *their* visual language, not this app's. This app keeps the
asset-intelligence light theme so it reads as continuous, credible work from the same hand.

## Mock Data Scale

N/A — no seed/demo data concept. All content in `src/data/*.json` is real, final narrative
content, not sample data at a chosen volume.

## Terminology Lock

- **AEP** — AI Platform & Emerging Products (the function, not "organization")
- **CPS** — Core Platform & Solutions
- **Context Layer** — the specific platform area proposed for HP's direct ownership
- **HP** — Haresh Parekh, referred to as "HP" in internal copy, full name on first mention per
  section
- **Sriram** / **DV** — first name / initials only, matching how the source material refers to
  them; never invent a surname for DV in this app
- **AI Transformation Leadership** — the temporary interview-cycle label; use only when the app
  narrates the interview process, not as the proposed final title
- "Next phase," not "next discussions," when referring to closing/finalization

---

## Project Structure

```
input/          Source context files and reference diagrams (gitignored if sensitive; see note)
src/
  app/          Next.js App Router pages
  components/   Shared React components (mind map, section nav, diagram viewer)
  data/         Static JSON content — sections.json, evidence.json, operating-model.json
  app/globals.css   Copied from asset-intelligence, extended here
docs/
  decisions/    ADRs for significant decisions made while building this app
public/         Static assets (exported diagram images, etc.)
```

---

## Definition of Done

Run every applicable checklist (from each Active Skill above) before marking any task complete.
See `eng-os-core`'s Meta Definition of Done for the enforcement rule.

---

## Non-Obvious Constraints

- This app will be **shared externally** (Sriram, then DV). Treat every piece of copy as
  final, reviewed content, not a draft — apply `prose-style`'s Definition of Done before
  considering any section done.
- Do not publish this app to any hosted/public URL (including claude.ai Artifacts) without
  explicit permission — confirm the sharing mechanism with HP before deploying anywhere.
- The `input/` folder contains sensitive personal negotiation material (real names, internal
  politics, compensation-adjacent discussion). The app's content must be a filtered, polished
  subset of this material, never a direct dump.
- Diagrams currently exist as `.drawio` XML. They need to be exported to SVG/PNG (via the
  draw.io desktop app or CLI) before they can be embedded as static images, or rebuilt as
  inline SVG/HTML components for interactivity — decide per-diagram based on whether
  interactivity adds value.
- **Prose rules for this app (HP directive, 2026-08-26):** no em dash as a clause joiner
  anywhere; use a colon, period, semicolon, or comma matched to the actual relationship
  instead. The only em dashes that stay are label:definition pairs (a title like
  "OneTrust — CPS + AEP", a mind-map node chip, a table cell crosswalk row) and the
  title-bar convention in `<title>` tags. Section eyebrows and headings drop a leading
  "The" (e.g. "Business case" not "The business case", "Point of view" not "The point of
  view") since the article reads as a generic AI-labeled section title rather than
  something a person would actually write.
- **Two-size type system (HP directive, 2026-08-26):** exactly two font sizes app-wide.
  Every heading (`h1`, `h2`, `h3`, card titles) uses `.section-heading` (28px/32px,
  Archivo, `font-medium`: bold/extrabold read as too heavy at this size and weight was
  the actual complaint, not size). Every paragraph, list item, label, eyebrow, caption,
  and badge uses `text-base`. Hierarchy comes from weight, color, and uppercase/
  letter-spacing (`.section-eyebrow`), never a third font size. The one documented
  exception is `.stat-number` (large KPI figures like "140B+", "$19B+"): a numeric data
  display, not a text-hierarchy level, so it keeps its own larger `font-extrabold` size.
  The Appendix's expandable architecture module list (`ArchitectureLayers.tsx`) is also
  exempt below the layer-title level: three real nesting tiers (layer → module →
  component) need visual distinction that two sizes can't carry, so `text-sm`/`text-xs`
  survive there as a deliberate denser reference tier, not sprawl.
- **Headline font:** Archivo (Google Fonts, weights 500–800), replacing Space Grotesk
  (HP directive, 2026-08-26: Space Grotesk didn't have "the feel" bolded). Body font
  stays DM Sans. `.font-display` / `font-family: 'Archivo', ...` is the display stack;
  never introduce a third typeface.
- **Content width (HP directive, 2026-08-26):** `PageShell` uses 90% of the viewport
  (see Design System Carryover above), and prose/cards use that full width with no
  artificial `max-w-*` cap reintroduced on top of it. An earlier revision capped
  paragraphs at `max-w-[1100px]`; HP explicitly asked for that removed so text, card
  width, and titles all use the full 90% container. Only genuinely narrow standalone
  elements (a single link card) may size themselves intentionally, not the main prose
  flow.

## Dependency Notes

Next.js (App Router) + React + Tailwind, matching asset-intelligence's stack, so the copied
`globals.css` and component patterns work without adaptation. No database. No backend API.

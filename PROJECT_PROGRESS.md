# Loque Agent Website Redesign — Project Progress & Single Source of Truth

> **Last Updated:** 2026-08-27
> **Status:** Active — **build complete, not launched.** All 13 pages built and imaged; 37 of 40 assets installed. Blocked on one content decision (case studies) and one unresolved defect (mobile overflow). No deployment path exists yet.
> **Maintainer:** Chris Barbieri, Principal — chrisb@loquelogic.com

---

**What this document is.** The SSoT for the loqueagent.com redesign — the Astro rebuild that replaces the hand-written static site. It covers the build, the imagery programme, the launch gates and what stands between the current state and going live.

**Reading order for someone new:** §2 for what this is → §3 for what it's built on → §6 for where it stands → §7 for what's in the way.

**Relationship to other docs.** `WEBSITE_PROCESS.md` (Drive `1lqN6iLpT_RqrAHSYMzX4QsKNY2pcePvXa29UGFL8d5U`) is the source of record for pricing, claims policy and the numbered launch gates. Where this file conflicts with it, that document wins and this one should be corrected. The sibling project — the delivery system that fulfils what this site sells — has its own `PROJECT_PROGRESS.md` under *Loque Assistant*.

---

## 1. Quick Reference & Core Metadata

* **Git repository:** `github.com/phnatik/loquedigital` · local working copy `~/DEV/loqueagent`
* **Working branch:** `redesign-2026` (4 commits, branched from `main` at `7f8533f`) — **not yet pushed; no upstream configured**
* **Primary branch:** `main`, currently 1 commit ahead of `origin/main`
* **Build:** Astro 5.18.2, static output, `build.format: 'file'`, `trailingSlash: 'never'`
* **Local dev:** `npm run dev` from `astro-site/` → `http://localhost:4321`
* **Production environment:** `[Confirm — loqueagent.com did not answer on :443 when checked 2026-08-27. Unknown whether this is a host issue or a local network restriction.]`
* **CI/CD:** **None.** No `netlify.toml`, `vercel.json`, `CNAME` or GitHub Actions in the repo. `dist/` is gitignored. Nothing currently publishes the Astro build.
* **Legacy site:** `index.html`, `legal.html`, `healthcare.html` still at repo root — presumed to be what serves today. `[Confirm before the cutover, and decide whether they are deleted or kept as a rollback.]`

### Key artifacts

| Artifact | Location |
| :--- | :--- |
| Process & launch gates | `WEBSITE_PROCESS.md` — Drive `1lqN6iLpT_RqrAHSYMzX4QsKNY2pcePvXa29UGFL8d5U` |
| Launch audit script | `astro-site/audit.py` — run after `npm run build` |
| Image shot list | `image-brief.csv` (repo) · Sheet `18QWhDdGokSAwnfmXBrvrMRZsBK74PEPTKLxCCHQnOZI` |
| Image prompt sheet | `astro-site/gemini-prompts.md` — house style + 37 prompts |
| Generated photography | Drive *Marketing / Loque Website Redesign / Loque Agent / LQAgent Photos* |
| Site source | `astro-site/src/` |

---

## 2. Project Vision & Architecture Overview

### Core objective

Replace the single-page hand-written site with a per-vertical Astro build, so a prospect lands on a page written for their practice rather than a generic pitch. Five verticals, one shared engine underneath.

### Structure

The homepage routes to five vertical pages. Each vertical follows the same section arc, established on `/legal` as the reference implementation:

> hook → where the week goes → what you get back → the risk → pre-built workflow map → the arithmetic → the security/compliance section → the approval promise → proof → which plan → lead magnet → contact

Supporting pages — plans, pricing, proof, book, about, compliance, handwritten — carry the shared material so vertical pages stay focused.

### Key patterns

* **`verticals.js` is the router.** Nav, dropdown and per-page config all read from it; adding a vertical is one entry plus one page file.
* **`GetBack` enforces the six categories** from WEBSITE_PROCESS §4 in the same order on every vertical. Only the copy differs.
* **`ImageSlot` is presence-driven.** It renders the real photograph if `src/assets/img/<id>.jpg` exists and an art-direction placeholder if not. Installing an image is dropping the file in — no markup change.
* **Placeholders are two different things, deliberately kept apart.** `[data-placeholder]` marks an *unearned claim* and must not survive launch (gates #11 / #13a). `[data-image-slot]` marks a *missing asset*, which is a production task. `audit.py` counts them separately so gate 13a stays honest.
* **Theme is token-driven.** Components read `--ink-card` / `--line` / `--muted` / `--paper` / `--text`, so a section flips to light by redefining tokens rather than by restyling components.

---

## 3. Technology Stack, Connections & Integrations

* **Framework:** Astro 5.18.2 — static, no islands, no client framework
* **Images:** `astro:assets` `<Picture>` via sharp 0.34.5 — AVIF + WebP + JPEG fallback, 5 widths each, per-variant `sizes`
* **Fonts:** Google Fonts — Outfit (display), Hanken Grotesk (body)
* **Forms:** Web3Forms, key centralised in `src/data/site.js`; 11 forms across the site (5 vertical enquiry, 5 lead magnet, 1 book)
* **Analytics:** GTM container `GTM-5LMTM2MK`, gated in `Base.astro` to production hostnames only (ADR-W12) — does not fire on localhost
* **Styling:** one hand-written stylesheet, 1,318 lines, no framework

---

## 4. Architectural Decision Records — ADR-W

| ID | Decision | Rationale |
| :--- | :--- | :--- |
| ADR-W08 | Every split page ends on one primary ask | Multiple CTAs on a page split intent; `PageCta` makes it structural |
| ADR-W12 | GTM fires on production hostnames only | Keeps local and preview traffic out of analytics |
| ADR-W13 | `/proof` argues from design properties, not case studies | The properties are verifiable today; the case studies are not |
| ADR-W14 | Image assets live in `src/assets`, not `public` | `public/` is served byte-for-byte; `src/assets` gets the Astro pipeline (~97% smaller) |
| ADR-W15 | Missing-asset and unearned-claim placeholders are distinct | Conflating them lets a credibility problem hide inside a production backlog |
| ADR-W16 | Light sections redefine tokens, not components | One `.sec-light` block themes every component; no per-component light CSS |
| ADR-W17 | Founder portrait and handwritten shots must be real photographs | The handwritten page's claim *is* that the object is physically real; a generated image would be evidence against it |

---

## 5. Current Progress & Milestone Tracker

### Build phases

| Phase | State |
| :--- | :--- |
| 1 — Astro scaffold, `/legal` as reference | ✅ Complete (`adc7fb1`) |
| 2 — Remaining four verticals | ✅ Complete (`28bdbd8`) |
| 3 — Supporting pages | ✅ Complete — 13 pages total |
| 4 — Imagery system + assets | ⏳ 37 of 40 installed |
| 5 — Visual pass (palette, light sections) | ✅ Complete (`222aea3`) |
| 6 — Case studies | ⛔ Blocked — BLK-W07 |
| 7 — Deploy | ⛔ Not started — no pipeline exists |

### Launch gate status (per WEBSITE_PROCESS.md)

| Gate | State |
| :--- | :--- |
| #10 — every vertical complete or removed | ✅ Pass — all five built, none stubbed |
| #11 — case studies filled or relabelled | ⛔ **Fail** — 6 placeholders live |
| #12 — live form key restored | ⚠️ `FORM_KEY_IS_TEST = false`, 11 forms carry a live key. `[Confirm the key is the production one]` |
| #13a — no `[data-placeholder]` survives | ⛔ **Fail** — same 6 blocks as #11 |
| #15 — canonicals and OG | ✅ Pass |
| gate 3/§9 — pricing figures | ✅ Pass |
| gate 4 — unearned numbers | ✅ Pass — 3 reported hits are false positives (see §6) |
| gate 5 — handwritten wording | ✅ Pass |
| gate 6 — ZDR/BAA exclusivity | ✅ Pass |
| SEO/a11y — titles, descriptions, h1, alt | ✅ Pass — no duplicates, every image has alt |

### By the numbers

* 13 pages · 18 light sections · 1,318 lines CSS
* 37 of 40 images installed, 0 dimension mismatches
* Imagery payload ~9.9MB source → ~0.27MB delivered (~97% reduction)
* Build: ~28s cold with image processing, ~1s incremental

---

## 6. Known Issues, Bugs & Blockers

### Active — highest severity first

* **BLK-W07 — case-study rights.** 6 `[data-placeholder]` blocks live: one on each of the five verticals, four on `/proof`. Blocks gates #11 and #13a, and is the only outstanding item that is a credibility problem rather than a production task. **Decision needed, not work:** write anonymous versions ("a 14-attorney firm in Salt Lake"), which the process doc says is acceptable in the interim, or cut the sections.
* **Horizontal overflow at 390px.** Nav, hero headline and body copy clip on the vertical pages. **Predates the redesign work** — confirmed by reverting to the pre-change source and reproducing identically. Two overflow bugs were fixed on 2026-08-26 (`.addon-rows`, `.alt-rows`); something else is still escaping. Not yet diagnosed.
* **No deployment path.** No CI config of any kind. Needs deciding and building before launch.
* **3 images outstanding** — `about-chris.jpg`, `handwritten-card.jpg`, `handwritten-macro.jpg`. All must be real photographs (ADR-W17). Phone camera in window light is sufficient.

### Lower severity

* **3 false positives in `audit.py` gate 4.** The `/proof` hit matches "ROI" inside the sentence listing what the site *won't* show; the healthcare and pricing hits match `30%` where the attribution falls outside the regex window and where the figure is a discount. Worth tightening so the output stays trustworthy.
* **Forms remain dark inside light sections.** Field styling assumes a dark background, so `/book` and the vertical `#contact` sections were left dark deliberately. Fine as a choice; needs its own pass if that changes.
* **`professional-services-drain-desk.jpg` was overwritten** by a newer Drive version on 2026-08-27. `[Confirm intentional]`

### Open questions

* How is loqueagent.com served today, and what is the intended host for the Astro build?
* Do the legacy root HTML files get deleted at cutover, or kept as a rollback?
* Should the 15 vertical `gain` tiles stay bespoke, or collapse to one shared set of three? They are briefed as texture rather than scenes precisely so they *could* be shared — would cut future image cost from 40 to 28.

---

## 7. Next Actions

1. Push `redesign-2026` and set upstream — **done this session, see §1**
2. Shoot the three real photographs
3. Decide BLK-W07: anonymous case studies or cut the sections
4. Diagnose the 390px overflow
5. Choose and build the deploy path
6. Confirm the Web3Forms production key (gate #12)
7. Silence the three audit false positives

# Design System

The visual language of the AI Resume Builder interface (deliverable D2). Tokens live in
`client/src/index.css` (`@theme` block) and become Tailwind classes such as `bg-navy` or `text-maroon`.

## Idea

A resume is a **ticket to one destination company**. The interface borrows from Indian Railways signage that
every student knows: a navy shell, and a **yellow station-board strip** naming the target company and role. That
strip is the one signature element. It sits above the wizard, editor and ATS checker, so the tailoring is always
visible. Everything else is standard, calm web UI, so the resume itself stays the focus.

## Colour

| Token | Hex | Job |
|---|---|---|
| `navy` | `#12284a` | App shell (sidebar, footer), primary buttons |
| `navy-soft` / `navy-deep` | `#1d3a66` / `#0b1a33` | Hover state / footer and toasts |
| `board` | `#f5c11b` | **Only** the target strip and selected states (active nav item, chosen template) |
| `board-soft` | `#fff4c7` | Highlighted autocomplete option, table row hover |
| `maroon` / `maroon-soft` | `#8c2a1f` / `#f9e5e1` | Missing keywords, errors, destructive actions |
| `signal` / `signal-soft` | `#17703f` / `#def2e5` | Matched keywords, success, strong ATS score |
| `amber` / `amber-soft` | `#8a5300` / `#fcefd6` | "Needs work" scores, unsaved changes |
| `ink` / `ink-soft` / `ink-faint` | `#121620` / `#464e5c` / `#5a6271` | Text: primary / secondary / hints (all at least 4.5:1 on white) |
| `ground` / `paper` | `#f3f5f8` / `#ffffff` | Page background / panels |
| `line` / `line-strong` | `#d6dbe3` / `#a9b2c0` | Dividers / input borders |

Status colours always come with an icon or a word (tick, cross, "Missing"), never colour alone.

## Type

| Use | Face | Notes |
|---|---|---|
| UI text | Barlow 400–700 | Self-hosted through `@fontsource` (no external font requests) |
| Headings, labels, stamps | Barlow Condensed 600–700 | `.board-text` = condensed, bold, uppercase; used for labels and the target strip |
| Scores, dates, counts | `.tabular` | Tabular numerals so figures line up |

Resume templates use their own ATS-safe faces: Georgia (Classic), Barlow/Arial (Modern), Helvetica/Arial (Minimal).

## Components

| Component | Notes |
|---|---|
| `TargetStrip` | Yellow board with a 3 px ink frame; company in condensed caps, role beside it; flips in when the target changes |
| `StatusStamp` | Double-ruled "rubber stamp" badge for states: ATS 82, Draft, Saved, Unsaved, Recommended, High/Medium/Low |
| `Button` | Variants: primary (navy), board (yellow, final call to action only), secondary, ghost, danger |
| `KeywordChips` | Green tick = found, maroon cross = missing, maroon plus = click to add |
| `ScoreCircle` | Ring + very large numeral; colour by band (75+ green, 50–74 amber, below 50 maroon) |
| Forms | Labelled inputs, required marker, inline error with icon, hint text linked by `aria-describedby` |

## Shape, depth and motion

- Corners: 6 px for controls, 8 px for panels; stamps are near-square (3 px).
- Shadows: soft and offset (`shadow-panel`, `shadow-paper` for the A4 sheet, `shadow-pop` for dialogs).
- Motion: one signature move (the target board flips in, 420 ms) plus the ATS ring sweep. Everything respects `prefers-reduced-motion`.

## Accessibility

Visible focus ring on every control (navy, or yellow on navy). Keyboard reordering with up/down buttons
(no drag-only actions). Labels on every field. Dialogs trap attention, close on Escape and return focus.
Layouts work from 360 px phones up.

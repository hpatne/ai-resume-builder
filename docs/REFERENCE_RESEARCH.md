# Reference Research: User Flow Blueprint

**Purpose:** Before designing our AI Resume Builder, we studied how existing resume
builders and ATS checkers structure their user flow. We took **only flow and UX
patterns** as inspiration. No design, colors, logos, brand names, templates, images
or text were copied. All UI, templates and copy in this project are original work.

**Products studied**

| Type | Products |
|---|---|
| Resume builders | Resume.io, Zety, Novoresume, Kickresume, Enhancv, Rezi, Teal |
| ATS checkers | Jobscan, Resume Worded |

**Method:** Each product's public homepage was fetched and read for structure. Where a
site blocked automated fetching (Teal returned HTTP 403, Zety timed out), we used the
product's public help center or independent reviews describing the flow. All sources
are listed at the end.

---

## 1. Comparison table

| # | What we looked at | Resume.io | Zety | Novoresume | Kickresume | Enhancv | Rezi | Teal | Jobscan | Resume Worded |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Landing page structure** | Hero + CTA, rating strip, feature cards, template showcase, examples, reviews, FAQ | Hero + CTA, 4-step "how it works", templates, FAQ | Hero + 2 CTAs, stats, employer logos, template grid with filters, 3-step process, comparison, FAQ, final CTA | Hero, stats + logos, feature showcase, success stories, pricing, FAQ | Hero, template gallery, feature highlights, stats, FAQ | Hero, upload/score CTA, feature tabs, "Build, Score, Target" workflow, templates, pricing, FAQ | Hero, tool tour, reviews, FAQ | Hero with "scan" CTA, feature showcase, FAQ | Upload box in hero, before/after score example, features, testimonials, final CTA |
| 2 | **Signup / onboarding timing** | Browse first; email needed to open builder | Account at start or at download | Account before/during building; no card | Login required to create | Account to save | Free account early | Signup before most features | Signup to see scan results | Upload first, signup modal after seeing feedback |
| 3 | **Resume creation flow** | Template first, then guided sections (personal, summary, links, experience, education, skills, extra) | Quiz picks template, then contact, work history, education, skills, summary, finalize | Pick template, fill forms, optional AI refine, download | Template, or AI writer from job title, or LinkedIn import | Upload / LinkedIn / template, then sections in order | Upload or scratch; target job comes later in "Target" step | Start blank or "from job description" | n/a (upload resume + paste JD) | n/a (upload resume, optionally paste JD) |
| 4 | **Editor layout** | Form left, preview right; drag handle to reorder, pencil to rename, bin to delete | Step forms + preview; hover menus to move/delete sections | Inline editing on the page, draggable sections | Section-by-section forms, phrase library | Inline editing, drag-and-drop sections, side-by-side preview | Form/customize panel left, preview right | Section tabs + inputs on one side, live preview on other | n/a | n/a |
| 5 | **AI suggestion presentation** | Toggle for AI phrasing per field | "Improve with AI" per section + pre-written bullets by job title | AI turns duties into measurable achievements, flags weak sections | Searchable pre-written phrases by job title; AI writer/rewriter | Inline "improve" prompts, preset actions (rephrase, quantify), accept/reject with undo | "Generate bullet" inline; "Yes, add" / "Skip" for missing keywords | Bullet generator modes (auto, keywords, job description) | "AI optimize" after scan | AutoFix rewrites; user approves each change |
| 6 | **ATS / score presentation** | n/a | Real-time content score | Built-in checker while editing | Score + feedback | Job match score, many checks, bullet-level fixes | 0-100 gauge split into 4 categories | Match % vs job description, keyword list, section scores | Match rate %, hard skills first, then soft skills, formatting and section checks | Score /100 with before/after, green (found) / amber (missing) keywords |
| 7 | **Dashboard & card actions** | Doc cards: rename, duplicate ("make a copy"), download, more menu | Document list | Multiple versions for tailoring | Document list | Resumes + job tracker | Resume list | Hub of resumes + job tracker; duplicate per job | Scan history | Upload history |
| 8 | **Download / export flow** | PDF/Word (TXT on free) | PDF behind paywall (TXT free) | PDF with real text layer | PDF | PDF, TXT | PDF (limited on free) | PDF | n/a | Export needs account |

---

## 2. Key observations

1. **Template-first is the norm.** Almost every builder asks for a template before
   anything else. Only Teal ("start from job description") and Rezi ("Target" step)
   bring the target job into the flow, and even they do it late or optionally.
2. **The target job is usually an afterthought.** Keyword tailoring happens *after* the
   resume is written, often in a separate tool. This is exactly the gap our project
   addresses.
3. **Split screen (form + live preview) is the dominant editor layout.** Inline editing
   on the page exists (Novoresume, Enhancv) but is harder to make accessible and to
   explain.
4. **AI is offered per section, never all-at-once.** Users stay in control through
   "improve", "add" / "skip", and accept / reject actions.
5. **ATS results follow one shape:** a single headline score, then matched vs missing
   keywords (colour-coded), then structural checks, then a prioritised fix list.
   Jobscan prioritises hard skills over soft skills.
6. **Dashboards are card lists** with duplicate as a first-class action, because users
   keep one version per job application.
7. **Signup timing varies.** Tools that let people try first (Resume Worded, Resume.io)
   delay the signup wall; others gate early.

---

## 3. Patterns we adopted and why

| Pattern adopted | Seen in | How we use it | Objective / Deliverable |
|---|---|---|---|
| **Target company + job role as Step 1** (our differentiator) | Partially in Teal, Rezi (late, optional) | The create wizard *starts* with company + role. Everything after (template recommendation, AI content, keywords, section order, ATS check) is driven by that choice. | O2, O3, D5, D6 |
| Short guided wizard before the editor | Zety, Resume.io | 3 steps: Target, Template, Basics + "Generate with AI". Then the full editor. | O5 |
| Recommended templates, others still selectable | Zety (quiz-based pick), Novoresume (filters) | Step 2 shows templates recommended for the chosen company/role first; the rest remain one click away. | O4, D2, D6 |
| Split-screen editor with live preview | Resume.io, Rezi, Teal, Enhancv | Section forms left, live preview right; Edit / Preview tabs on mobile. | O4 |
| Add / remove / reorder sections with simple controls | Resume.io, Enhancv | Up/down buttons (keyboard friendly) instead of drag-and-drop. | O4 |
| AI per section with a clear action | Zety, Enhancv, Rezi | "Improve with AI" button on each section, with a loading state; the result can be kept or undone. | O3, D5 |
| Suggested keyword panel tied to the target | Rezi, Teal | Panel in the editor listing company + role keywords, showing which are already used. | O3, D6 |
| ATS result shape: score, matched / missing, checks, prioritised fixes | Jobscan, Resume Worded, Rezi | Circular score /100, matched and missing keyword chips, section checks, suggestions ordered by impact, "Fix in editor" link. | O5, D7 |
| Hard skills weighted above soft skills | Jobscan | Our scoring formula weights role skills more than general keywords (see `utils/atsScore.js`). | D7 |
| Dashboard of resume cards with Duplicate | Resume.io, Teal | Cards show company, role, template, last edited, ATS badge; actions Edit, Duplicate, Download, Delete. | O6, D8 |
| Template gallery with filters | Novoresume, Kickresume | Filter by industry, company type and role. | O4, D2 |
| Landing: hero, features, how-it-works steps, CTA | All builders | Same skeleton, but the hero demonstrates company + role tailoring instead of making generic claims. | O1, O5, D2 |
| Free PDF download | Novoresume | PDF download is never behind a wall; it is a core objective, not an upsell. | O4 |

### Patterns we deliberately did NOT adopt

| Pattern | Why not |
|---|---|
| Paywalls on download, trial pricing | Not part of our problem definition; download is objective O4. |
| Job trackers, auto-apply, interview prep, cover letters | Outside the scope of our objectives and deliverables. |
| Ratings, user counts, "x times more interviews" claims | We have no real data to back such claims; we will not invent them. |
| Inline editing directly on the page | Harder to make accessible and to explain; the form + preview split is clearer. |
| Drag-and-drop only reordering | Not keyboard accessible; we use up/down buttons. |

---

## 4. Sources

- Resume.io homepage: https://resume.io/
- Resume.io help, creating a resume: https://help.resume.io/article/35-how-do-i-create-a-resume
- Resume.io help, duplicating resumes: https://help.resume.io/article/18-how-do-i-duplicate-or-create-multiple-versions-of-my-resume
- Zety review (Resume Genius): https://resumegenius.com/reviews/zety-reviews
- Zety review (Enhancv blog): https://enhancv.com/blog/zety-review/
- Novoresume homepage: https://novoresume.com/
- Kickresume homepage: https://www.kickresume.com/en/
- Enhancv homepage: https://enhancv.com/
- Rezi homepage: https://rezi.ai/
- Teal review (Rezi blog): https://www.rezi.ai/posts/teal-review
- Teal reviews (Resume Genius): https://resumegenius.com/reviews/teal-resume-builder-reviews
- Jobscan homepage: https://www.jobscan.co/
- Resume Worded homepage: https://resumeworded.com/

Research conducted October 2026. Product features change often; this table reflects
what was publicly visible at that time.

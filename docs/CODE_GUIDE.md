# Code Guide (Viva Guide)

This guide answers "which part of the code does what". All paths are inside `client/src/`.
Every source file also starts with a comment block saying what it is, what it does and which page uses it.

**Contents**
1. Traceability: objectives and deliverables → pages and files
2. Feature table: feature → files → how it works
3. How the app is wired (routing, protected and admin routes, Context API, mock service layer)
4. How company + role customisation works
5. ATS score calculation
6. PDF generation
7. Where the backend connects in Phase 2

---

## 1. Traceability table

### Objectives

| Objective | Implemented in Phase 1 by | Main files |
|---|---|---|
| **O1** AI-powered, ATS-friendly resumes | "Generate with AI" in the wizard and "Improve with AI" in the editor; three single-column ATS-safe templates; PDF keeps real text | `services/aiService.js`, `components/templates/*`, `utils/pdf.js` |
| **O2** Tailor by target company + role | Wizard step 1 asks for company + role first; target strip stays on screen; "Change target" in the editor | `pages/CreateResumePage.jsx`, `components/wizard/StepTarget.jsx`, `components/TargetStrip.jsx`, `components/editor/RetargetDialog.jsx` |
| **O3** AI + company data → customised content | The draft uses the role's summary, skills and bullets plus the company's summary sentence, section order and emphasis | `services/aiService.js`, `data/companies.js`, `data/roles.js`, `utils/targetProfile.js` |
| **O4** Templates, real-time editing, preview, PDF | Templates gallery; split-screen editor with live preview; template switch keeps content; Download PDF | `pages/TemplatesPage.jsx`, `pages/ResumeEditorPage.jsx`, `components/editor/EditorWorkspace.jsx`, `components/templates/ResumePreview.jsx` |
| **O5** Less effort, better shortlisting | 3-step wizard produces a full draft; ATS checker with score, missing keywords and ranked fixes | `pages/CreateResumePage.jsx`, `pages/AtsCheckerPage.jsx`, `utils/atsScore.js` |
| **O6** Secure platform for multiple resumes | Login/signup, protected routes, dashboard with Edit / Duplicate / Download / Delete, search and filter | `context/AuthContext.jsx`, `routes/ProtectedRoute.jsx`, `pages/DashboardPage.jsx`, `context/ResumeContext.jsx` |

### Deliverables

| Deliverable | Phase 1 status | Pages | Main files |
|---|---|---|---|
| **D1** Documentation | README, this guide, frontend architecture, design system, reference research; SRS / ER / DFD / system architecture are placeholders for Phase 2 | – | `README.md`, `docs/*` |
| **D2** UI/UX design | Responsive UI with a consistent design system; company- and role-based templates | all | `index.css`, `components/*`, `docs/DESIGN_SYSTEM.md` |
| **D3** Responsive website | All 13 pages + 404 at phone, tablet and desktop widths | all | `pages/*`, `components/DashboardLayout.jsx`, `components/PublicLayout.jsx` |
| **D4** Authentication & user management | Signup, login, validation, show/hide password, protected routes, profile edit, change password (mock) | `/signup`, `/login`, `/profile` | `pages/SignupPage.jsx`, `pages/LoginPage.jsx`, `pages/ProfilePage.jsx`, `context/AuthContext.jsx`, `services/authService.js`, `utils/validation.js` |
| **D5** AI generation & customisation | Generate with AI (wizard), Improve with AI per section with Undo (editor), loading states (mock AI) | `/create`, `/editor/:id` | `services/aiService.js`, `components/wizard/GeneratingState.jsx`, `components/editor/ImproveWithAiButton.jsx` |
| **D6** Company & role based customisation | Each company sets template, section order, emphasis and keywords; each role sets skills, keywords, summary and bullets; the wizard, editor and ATS checker visibly change | `/create`, `/editor/:id`, `/ats-checker`, `/templates` | `data/companies.js`, `data/roles.js`, `utils/targetProfile.js`, `components/wizard/CompanyInsight.jsx`, `components/editor/KeywordPanel.jsx` |
| **D7** ATS compatibility checker | Score /100, breakdown, matched/missing keywords, section checks, prioritised suggestions | `/ats-checker` | `pages/AtsCheckerPage.jsx`, `utils/atsScore.js`, `services/atsService.js`, `components/ats/*` |
| **D8** Dashboards | User dashboard (resume management) and admin dashboard (templates, companies, roles) | `/dashboard`, `/admin/*` | `pages/DashboardPage.jsx`, `pages/admin/*`, `services/adminService.js`, `services/catalogService.js` |
| D9 Testing | Phase 4 | – | – |
| D10 Deployment | Phase 4 | – | – |

---

## 2. Feature table

| Feature | File(s) | How it works (plain English) |
|---|---|---|
| Page routing | `routes/AppRoutes.jsx` | Lists every URL and the page it shows. Public pages are wrapped in `PublicLayout` (navbar + footer); logged-in pages in `DashboardLayout` (sidebar). |
| Protected pages | `routes/ProtectedRoute.jsx` | If nobody is logged in, it redirects to `/login` and remembers the wanted page, so login can send the user back there. |
| Admin-only pages | `routes/AdminRoute.jsx` | Same check, plus `user.role === 'admin'`; normal users are sent to `/dashboard`. |
| Signup / login validation | `pages/SignupPage.jsx`, `pages/LoginPage.jsx`, `utils/validation.js` | On submit, the form values go through a validate function that returns an `errors` object; each field shows its own message. Typing in a field clears its error. |
| Password show/hide | `components/PasswordInput.jsx` | A state flag switches the input `type` between `password` and `text`. |
| Logged-in user everywhere | `context/AuthContext.jsx` | Stores `user` in React state and shares it through Context. `useAuth()` gives any component `user`, `login`, `logout`, `isAdmin`. |
| Dashboard resume cards | `pages/DashboardPage.jsx`, `components/ResumeCard.jsx` | Reads `resumes` from `ResumeContext` and draws one card each, with a real mini preview of the template. Search and filters are applied with `Array.filter` before rendering. |
| Duplicate / delete | `context/ResumeContext.jsx`, `services/resumeService.js` | Each action calls the service first (saves to storage), then updates the list in context so the dashboard re-renders. Delete asks first with `ConfirmDialog`. |
| Target company + role step | `components/wizard/StepTarget.jsx`, `components/Autocomplete.jsx` | Autocomplete suggests sample companies and roles; typing anything else is allowed (custom target). `utils/targetProfile.js` finds the matching profile or builds a generic one. |
| Recommended templates | `pages/CreateResumePage.jsx`, `components/wizard/StepTemplate.jsx` | Recommended = the company's preferred template + templates whose `roles` include the chosen role. They are sorted first and stamped "Recommended"; all others remain selectable. |
| Generate with AI | `services/aiService.js` (`buildResumeDraft`, `generateResume`) | Builds the draft from the role (summary, skills, bullets, projects) and the company (summary sentence, section order, emphasis), then returns it after a delay so the loading screen shows. |
| Live preview | `pages/ResumeEditorPage.jsx`, `components/editor/EditorWorkspace.jsx`, `components/templates/ResumePreview.jsx` | `ResumeEditorPage` keeps `resumeData` in state. Each form calls `onChange`, which updates that state, and the same object is passed as a prop to the template. So the preview re-renders on every keystroke. |
| Reorder sections | `components/editor/EditorSection.jsx`, `ResumeEditorPage.jsx` (`handleMoveSection`) | Up/down buttons swap two items in `resumeData.sectionOrder`. Templates draw sections in that order, so the preview changes immediately. Buttons are used instead of drag-and-drop so it works with a keyboard. |
| Add / remove entries | `components/editor/EntryListEditor.jsx` | One shared component draws a list of entries from a field list. Experience, Projects, Education and Certifications only describe their fields. |
| Improve with AI + Undo | `ResumeEditorPage.jsx` (`handleImprove`), `services/aiService.js` (`improveSection`) | Saves the old section value, asks the mock AI for a new one, puts it in place, and shows a toast with an **Undo** button that restores the old value. |
| Keyword panel | `components/editor/KeywordPanel.jsx` | Lists the target's role skills and company/role keywords and checks each against the resume text on every render (green = used, maroon = missing). Missing skills can be added with one click. |
| Change template (content kept) | `components/editor/EditorToolbar.jsx`, `components/templates/TemplateRenderer.jsx` | Only `resumeData.templateId` changes; `TemplateRenderer` picks Classic, Modern or Minimal for that id and draws the same content. |
| Change target | `components/editor/RetargetDialog.jsx` | Points the resume at another company/role and can apply that company's section order. Useful after duplicating a resume for a new application. |
| Unsaved changes | `ResumeEditorPage.jsx` | The last saved version is kept as JSON text; if the current `resumeData` differs, an "Unsaved" stamp shows and the browser warns before closing the tab. |
| ATS checker | `pages/AtsCheckerPage.jsx`, `utils/atsScore.js` | The user picks a resume and pastes a job description (or uses a sample). `calculateAtsScore` returns the score, breakdown, keywords, checks and suggestions; the score is saved on the resume. |
| Score ring | `components/ScoreCircle.jsx` | An SVG circle whose dashed stroke is shifted so exactly `score%` of the ring is visible; a CSS animation sweeps it in. |
| Templates gallery filters | `pages/TemplatesPage.jsx` | Industry, company type and role filters; a template is shown only if it matches every filter that is set. |
| Profile | `pages/ProfilePage.jsx`, `components/ProfileDetailsForm.jsx`, `components/ChangePasswordForm.jsx` | Edit name/email and change password through `authService`; the summary card counts resumes and the average ATS score. |
| Admin CRUD | `pages/admin/Manage*.jsx`, `components/admin/*Form.jsx`, `services/catalogService.js` | A table plus a form in a dialog. Saving calls `catalogService`, then updates `CatalogContext`, so the wizard, editor and ATS checker use the new data right away. |
| Toast notifications | `context/ToastContext.jsx`, `components/Toast.jsx` | `showToast(message, type, { actionLabel, onAction })` from anywhere; toasts disappear after a few seconds. |

---

## 3. How the app is wired

### Routing
`main.jsx` mounts `<App />`. `App.jsx` wraps everything in providers, then renders `AppRoutes`:

```
BrowserRouter
 └ ToastProvider          notifications
   └ AuthProvider         who is logged in
     └ ResumeProvider     that user's resumes
       └ CatalogProvider  companies, roles, templates
         └ AppRoutes      which page to show
```

`AppRoutes.jsx` has three groups:

| Group | Guard | Layout | Pages |
|---|---|---|---|
| Public | none | `PublicLayout` | `/`, `/login`, `/signup`, `/templates`, 404 |
| User | `ProtectedRoute` | `DashboardLayout` | `/dashboard`, `/create`, `/editor/:resumeId`, `/ats-checker`, `/profile` |
| Admin | `AdminRoute` | `DashboardLayout` | `/admin`, `/admin/templates`, `/admin/companies`, `/admin/roles` |

The guards and layouts are "layout routes": they render `<Outlet />`, which is where React Router places the child page.

### Context API (instead of Redux)
| Context | Holds | Used by |
|---|---|---|
| `AuthContext` | `user`, `isAdmin`, `login`, `signup`, `logout`, `updateUser` | route guards, navbar, sidebar, profile |
| `ResumeContext` | the user's `resumes` + create/save/delete/duplicate/saveScore | dashboard, wizard, editor, ATS checker, profile |
| `CatalogContext` | `companies`, `roles`, `templates` + setters for admin edits | wizard, editor, ATS checker, gallery, admin |
| `ToastContext` | `showToast()` | everywhere |

### Mock service layer
Pages never touch storage directly. They call functions in `services/`, which return **Promises** after a
short delay (`utils/mockApi.js`), exactly like a real `fetch()` call would. Data is saved in `localStorage`
(`utils/storage.js`), seeded from `data/` the first time. In Phase 2, only the body of each service function
changes, to `fetch('/api/...')`. Pages, components and contexts stay the same.

---

## 4. How company + role customisation works

1. `utils/targetProfile.js` → `resolveCompany()` / `resolveRole()` find the profile for the user's target
   (or build a generic one for a custom name).
2. The **company** profile (`data/companies.js`) supplies `preferredTemplate`, `sectionOrder`, `emphasis`,
   `keywords`, `focus` and `summaryLine`.
3. The **role** profile (`data/roles.js`) supplies `requiredSkills`, `keywords`, `sampleSummary`,
   `experienceBullets`, `projects` and `certifications`.
4. Where it becomes visible:

| Screen | What changes with the target |
|---|---|
| Wizard step 1 | "What this company looks for" panel: type, emphasis, recommended template, section order, keywords, role skills |
| Wizard step 2 | Template order and "Recommended" stamps; previews use the company's section order |
| Generated draft | Summary (role text + company sentence), skills, number of experience bullets vs projects (emphasis), section order |
| Editor | Target strip; keyword panel (used vs missing); Improve with AI uses the target's keywords |
| ATS checker | Hard skills, company keywords and the "target alignment" points |

Try it: create one resume for **Sprintly + Full Stack Developer** and one for **Ledgerline Capital + Data Analyst**.
They get different templates, section orders, summaries, keywords and ATS results.

---

## 5. ATS score calculation (`utils/atsScore.js`)

The checker uses simple, explainable keyword matching. Total = 100 points:

| Part | Points | Formula |
|---|---|---|
| A. Hard skills | 40 | 40 × (hard skills found ÷ hard skills the job description asks for) |
| B. Other keywords | 20 | 20 × (other job-description keywords found ÷ total) |
| C. Sections present | 20 | 4 each: contact (email + phone), summary, skills (5+), experience or projects, education |
| D. Content quality | 10 | 5 if the summary is 40–80 words + 5 × (share of bullet points containing a number) |
| E. Target alignment | 10 | 5 if the summary or title names the role + 5 × (share of the company's keywords used) |

Step by step (matching the comments in the file):
1. The resume is flattened into one lowercase text block (`resumeToText`).
2. **Hard skills** = every skill in our role data that the job description mentions. **Other keywords** = role/company keywords found in the job description, plus words it repeats at least twice (stop words removed).
3. Each keyword is marked found or missing with a whole-word match (`containsKeyword`), so "Java" does not match inside "JavaScript".
4. Section checks are run.
5. Points are added up using the table above.
6. Suggestions are built (missing skills and sections = high; unmeasured bullets, missing words, role not named = medium; summary length = low) and sorted by priority.

Hard skills carry the most weight because recruiters filter on them first, a pattern we observed in Jobscan
(see `docs/REFERENCE_RESEARCH.md`).

---

## 6. PDF generation (`utils/pdf.js`)

- We use **react-to-print**. `useReactToPrint({ contentRef })` copies the resume page (the element in
  `printRef`) into a hidden frame and opens the browser's print window; the user chooses **Save as PDF**.
- **Why not an image-based PDF library:** tools that screenshot the page into a PDF produce an image, which an
  ATS cannot read. Printing keeps the resume as real, selectable text.
- `PRINT_PAGE_STYLE` sets A4 paper and margins and keeps background colours (the Modern template's header band).
- The preview is a full-size 794 px A4 page scaled down with a CSS transform; the printed copy is the unscaled
  page. The dashboard's Download button prints an off-screen copy (`components/PrintableResume.jsx`).

---

## 7. Where the backend connects in Phase 2

Search the code for `TODO (Phase 2)`. Every marker is a place where a mock will be replaced with a real API call:

| Service | Planned endpoint(s) |
|---|---|
| `authService.js` | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, `PUT /api/users/me` |
| `resumeService.js` | `GET/POST /api/resumes`, `GET/PUT/DELETE /api/resumes/:id` |
| `catalogService.js` | `GET /api/companies`, `/api/roles`, `/api/templates` (admin-only POST/PUT/DELETE) |
| `aiService.js` | `POST /api/ai/generate`, `POST /api/ai/improve` |
| `atsService.js` | `POST /api/ats/analyze` |
| `adminService.js` | `GET /api/admin/stats` |

Security note: in Phase 1, passwords and the admin role live in the browser because the data is mock data.
Phase 2 moves password hashing (bcrypt), tokens (JWT) and role checks to the server.

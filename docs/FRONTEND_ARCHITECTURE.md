# Frontend Architecture (Phase 1)

A short overview of how the React frontend is built. For "which file does what", see [CODE_GUIDE.md](CODE_GUIDE.md).

## Layers

```
 Pages (pages/)                 one file per screen; owns that screen's state and handlers
   │ uses
 Components (components/)       reusable UI; receive data through props, report changes through callbacks
   │ read shared state from
 Context (context/)             Auth, Resume, Catalog, Toast: app-wide state without Redux
   │ call
 Services (services/)           the ONLY layer that "talks to the server" (mock today)
   │ use
 Data + utils (data/, utils/)   sample data, storage, validation, ATS scoring, formatting
```

Rules followed throughout:
- **One component per file**, each starting with a comment block (what it is, what it does, where it is used).
- **Data flows down, changes flow up.** For example, the editor page holds `resumeData`; forms receive slices of it and call `onChange`; the preview receives the same object.
- **Pages never touch `localStorage`.** They go through services, so Phase 2 can replace the services without touching the UI.
- **Business logic lives in plain functions** (`utils/atsScore.js`, `utils/targetProfile.js`, `services/aiService.js`), so it can later move to the backend unchanged.

## Request flow example: "Generate with AI"

```
StepBasics form ──► CreateResumePage.handleGenerate()
                      ├─ validateRequiredFields()            utils/validation.js
                      ├─ generateResume()  ──(Promise, 2.2 s)  services/aiService.js
                      ├─ createResume()    ──(Promise)         context/ResumeContext.jsx → services/resumeService.js
                      └─ navigate('/editor/:id')
```

In Phase 2 the two Promise calls become HTTP requests to Express; the page code stays the same.

## Phase 2 backend shape (planned)

```
React client ──HTTP/JSON──► Express API ──► MongoDB
                              ├─ /api/auth        (bcrypt + JWT)
                              ├─ /api/resumes
                              ├─ /api/companies, /api/roles, /api/templates
                              ├─ /api/ai          (calls the AI model, Phase 3)
                              └─ /api/ats         (scoring engine, Phase 3)
```

Planned collections: `users`, `resumes`, `companies`, `roles`, `templates`. They mirror the shapes in `client/src/data/`.

## Responsive strategy

- Tailwind breakpoints: phones first, then `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- Logged-in pages: sidebar on `lg` and up; a top bar with a slide-in drawer below that.
- Editor: two columns on `lg` and up; **Edit / Preview tabs** below.
- Grids use `repeat(auto-fill, minmax(min(100%, Npx), 1fr))` so cards reflow without fixed breakpoints.
- Admin tables scroll sideways on small screens instead of squashing columns.

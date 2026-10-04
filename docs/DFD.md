# Data Flow Diagrams (DFD)

> **Status: To be completed in Phase 2.**

Planned diagrams:
- **Level 0 (context):** Job seeker and Admin ↔ AI Resume Builder ↔ AI service.
- **Level 1:** 1.0 Authenticate user · 2.0 Manage resumes · 3.0 Generate/customise content · 4.0 Check ATS score · 5.0 Manage catalog (companies, roles, templates); data stores D1 Users, D2 Resumes, D3 Companies, D4 Roles, D5 Templates.
- **Level 2:** detailed flows for 3.0 (target → profile lookup → AI prompt → draft) and 4.0 (resume + job description → keyword extraction → scoring → suggestions).

The Phase 1 frontend already follows these flows through its mock services; see [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md).

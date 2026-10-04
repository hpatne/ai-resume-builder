# System Architecture

> **Status: To be completed in Phase 2.**

Planned three-tier MERN architecture:

```
React client (Vite, Tailwind)  ──HTTP/JSON──►  Node.js + Express API  ──►  MongoDB
                                                   │
                                                   └──► AI model API (Phase 3)
```

Covered in Phase 2: deployment view, API module breakdown, authentication flow (bcrypt + JWT), and how the
Phase 1 mock services are replaced. The current frontend architecture is described in
[FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md).

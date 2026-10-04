# Server

Backend: Phase 2 (Node.js, Express, MongoDB)

This folder is intentionally empty in Phase 1. The frontend in `client/` talks to a
mock service layer (`client/src/services/`). In Phase 2 each mock function will be
replaced by a real call to an Express API backed by MongoDB. Every place that needs
to change is marked in the client code with:

```js
// TODO (Phase 2): replace mock with real API call to the Express backend
```

/*
 * users.js
 * SAMPLE DATA: mock accounts used for login in Phase 1.
 * Passwords are stored in plain text ONLY because this is mock data in the
 * browser. In Phase 2 the Express backend will hash passwords (bcrypt) and
 * issue a token (JWT); the frontend will never see a password again.
 * TODO (Phase 2): replace mock with real API call to the Express backend
 *
 * Demo logins:  demo@resumeai.dev / demo1234   (user, has 3 sample resumes)
 *               admin@resumeai.dev / admin1234 (admin)
 */
const users = [
  {
    id: 'u-demo',
    name: 'Aarav Sharma',
    email: 'demo@resumeai.dev',
    password: 'demo1234',
    role: 'user',
    createdAt: '2026-08-12T10:00:00.000Z',
  },
  {
    id: 'u-admin',
    name: 'Placement Admin',
    email: 'admin@resumeai.dev',
    password: 'admin1234',
    role: 'admin',
    createdAt: '2026-07-01T09:00:00.000Z',
  },
  {
    id: 'u-priya',
    name: 'Priya Nair',
    email: 'priya@example.com',
    password: 'sample1234',
    role: 'user',
    createdAt: '2026-09-03T08:30:00.000Z',
  },
  {
    id: 'u-rohan',
    name: 'Rohan Mehta',
    email: 'rohan@example.com',
    password: 'sample1234',
    role: 'user',
    createdAt: '2026-09-21T14:15:00.000Z',
  },
]

export default users

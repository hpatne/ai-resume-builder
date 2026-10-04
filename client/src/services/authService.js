/*
 * authService.js
 * MOCK authentication: signup, login, logout, profile update, change password.
 * Accounts live in localStorage (seeded from data/users.js).
 * Used by: AuthContext (which the Login, Signup and Profile pages call).
 *
 * TODO (Phase 2): replace mock with real API call to the Express backend
 *   login  -> POST /api/auth/login   (returns a JWT)
 *   signup -> POST /api/auth/signup
 *   profile/password -> PUT /api/users/me
 */
import seedUsers from '../data/users'
import { loadCollection, saveToStorage, loadFromStorage, removeFromStorage } from '../utils/storage'
import { simulateRequest, simulateError, createId } from '../utils/mockApi'

const USERS_KEY = 'users'
const SESSION_KEY = 'session'

function getStoredUsers() {
  return loadCollection(USERS_KEY, seedUsers)
}

// Never hand the password to the UI
function withoutPassword(user) {
  const { password: _password, ...safeUser } = user
  return safeUser
}

function findUserByEmail(users, email) {
  return users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase())
}

export function login(email, password) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const user = findUserByEmail(getStoredUsers(), email)
  if (!user || user.password !== password) {
    return simulateError('Incorrect email or password. Check both and try again.')
  }
  saveToStorage(SESSION_KEY, { userId: user.id })
  return simulateRequest(withoutPassword(user), 600)
}

export function signup({ name, email, password }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const users = getStoredUsers()
  if (findUserByEmail(users, email)) {
    return simulateError('An account with this email already exists. Log in instead.')
  }
  const newUser = {
    id: createId('user'),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  }
  saveToStorage(USERS_KEY, [...users, newUser])
  saveToStorage(SESSION_KEY, { userId: newUser.id })
  return simulateRequest(withoutPassword(newUser), 700)
}

export function logout() {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  removeFromStorage(SESSION_KEY)
  return simulateRequest(true, 150)
}

// Who is logged in right now (checked once when the app starts)
export function getCurrentUser() {
  // TODO (Phase 2): replace mock with real API call to the Express backend (GET /api/auth/me)
  const session = loadFromStorage(SESSION_KEY, null)
  const user = session && getStoredUsers().find((storedUser) => storedUser.id === session.userId)
  return simulateRequest(user ? withoutPassword(user) : null, 250)
}

export function updateProfile(userId, { name, email }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const users = getStoredUsers()
  const emailOwner = findUserByEmail(users, email)
  if (emailOwner && emailOwner.id !== userId) {
    return simulateError('Another account already uses this email.')
  }
  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, name: name.trim(), email: email.trim().toLowerCase() } : user
  )
  saveToStorage(USERS_KEY, updatedUsers)
  return simulateRequest(withoutPassword(updatedUsers.find((user) => user.id === userId)), 500)
}

export function changePassword(userId, currentPassword, newPassword) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const users = getStoredUsers()
  const user = users.find((storedUser) => storedUser.id === userId)
  if (!user || user.password !== currentPassword) {
    return simulateError('Your current password is incorrect.')
  }
  saveToStorage(USERS_KEY, users.map((storedUser) => (storedUser.id === userId ? { ...storedUser, password: newPassword } : storedUser)))
  return simulateRequest(true, 500)
}

// Used by the admin dashboard to count users
export function getAllUsers() {
  // TODO (Phase 2): replace mock with real API call to the Express backend (admin only)
  return simulateRequest(getStoredUsers().map(withoutPassword), 300)
}

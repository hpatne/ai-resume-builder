/*
 * storage.js
 * Tiny wrapper around the browser's localStorage. The mock services use it so
 * that logins, resumes and admin edits survive a page refresh during the demo.
 * In Phase 2 this is replaced by MongoDB on the server.
 */
const PREFIX = 'arb_'

// Read a saved value, or return `fallbackValue` if nothing is saved / it is unreadable
export function loadFromStorage(key, fallbackValue) {
  try {
    const savedText = localStorage.getItem(PREFIX + key)
    return savedText ? JSON.parse(savedText) : fallbackValue
  } catch {
    return fallbackValue
  }
}

// Save any value as JSON text
export function saveToStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage is full or blocked (e.g. private mode): the app keeps working for this session
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Nothing to do if storage is blocked
  }
}

// Load a list (users, resumes, companies...). The first time, seed it from the sample data.
export function loadCollection(key, seedData) {
  const savedList = loadFromStorage(key, null)
  if (savedList) return savedList
  saveToStorage(key, seedData)
  return seedData
}

// Remove every saved item so the app goes back to the original sample data
export function resetAllData() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    // Storage blocked: nothing was saved anyway
  }
}

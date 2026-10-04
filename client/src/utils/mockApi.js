/*
 * mockApi.js
 * Helpers that make the mock services behave like a real network API:
 * results come back as Promises after a short delay, so loading spinners and
 * error messages can be built and shown now, before the backend exists.
 */

// Resolve with a copy of `result` after `delayMs` milliseconds
export function simulateRequest(result, delayMs = 400) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result === undefined ? undefined : structuredClone(result)), delayMs)
  })
}

// Reject with an error message after `delayMs`, like a failed API call
export function simulateError(message, delayMs = 400) {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(message)), delayMs)
  })
}

// Create a unique id such as "resume-lq3k9-x7a2" (MongoDB will create real ids in Phase 2)
export function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

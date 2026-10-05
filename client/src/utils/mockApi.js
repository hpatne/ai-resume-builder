// Makes the mock services act like a real API (Promise + short delay).
// Returns a copy of result after a short delay
export function simulateRequest(result, delayMs = 400) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result === undefined ? undefined : structuredClone(result)), delayMs)
  })
}

export function simulateError(message, delayMs = 400) {
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error(message)), delayMs)
  })
}

// Unique id like "resume-lq3k9-x7a2" (MongoDB will make ids in Phase 2)
export function createId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

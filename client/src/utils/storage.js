// Saves and loads data in the browser (localStorage).
const PREFIX = 'arb_'

export function loadFromStorage(key, fallbackValue) {
  try {
    const savedText = localStorage.getItem(PREFIX + key)
    return savedText ? JSON.parse(savedText) : fallbackValue
  } catch {
    return fallbackValue
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Storage blocked or full: keep working for this session
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Storage blocked
  }
}

// The first time, fill the list with the sample data
export function loadCollection(key, seedData) {
  const savedList = loadFromStorage(key, null)
  if (savedList) return savedList
  saveToStorage(key, seedData)
  return seedData
}

export function resetAllData() {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    // Storage blocked
  }
}

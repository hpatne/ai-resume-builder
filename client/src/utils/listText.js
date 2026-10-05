// Converts "a, b, c" text to a list and back (used in admin forms).
// "React, Node.js" -> ['React', 'Node.js']
export function textToList(text) {
  const seen = new Set()
  return text
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter((item) => {
      const key = item.toLowerCase()
      if (!item || seen.has(key)) return false
      seen.add(key)
      return true
    })
}

// ['React', 'Node.js'] -> "React, Node.js"
export function listToText(list) {
  return (list || []).join(', ')
}

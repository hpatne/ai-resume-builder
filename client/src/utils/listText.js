/*
 * listText.js
 * Admin forms edit lists (keywords, skills) as one comma-separated text box.
 * These two helpers convert between that text and an array.
 */

// "React, Node.js , react" -> ['React', 'Node.js'] (trimmed, no empties, no duplicates)
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

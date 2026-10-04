/*
 * resumeFormat.js
 * Small formatting helpers shared by the three resume templates.
 */

// Bullet points are stored as plain text, one bullet per line
export function splitBullets(bulletText) {
  return (bulletText || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

// "May 2026 – Jul 2026", "May 2026", or "" when both are empty
export function formatDateRange(start, end) {
  if (start && end) return `${start} – ${end}`
  return start || end || ''
}

// Contact details that are filled in, in a fixed order
export function getContactItems(personal) {
  return [personal.email, personal.phone, personal.location, personal.linkedin, personal.portfolio].filter(Boolean)
}

// Does this section have anything to show? Empty sections are left out of the resume.
export function hasSectionContent(resume, sectionKey) {
  const value = resume[sectionKey]
  if (Array.isArray(value)) return value.length > 0
  return Boolean(value && value.trim())
}

// Which drawing layout (classic / modern / minimal) a template id uses.
// Admin-created templates reuse one of the three layouts.
export function getTemplateLayout(templates, templateId) {
  return templates.find((template) => template.id === templateId)?.layout || templateId || 'classic'
}

// "2 Oct 2026" (Indian English date format)
export function formatDate(isoDate) {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

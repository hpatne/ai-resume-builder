/*
 * keywordUtils.js
 * Text helpers shared by the ATS score, the editor keyword panel and the mock AI:
 *   resumeToText()   - flattens a resume object into one block of plain text
 *   containsKeyword() - checks if a keyword appears as a whole word/phrase
 *   extractFrequentWords() - finds words a job description repeats often
 */

// Common English words that are never useful keywords
export const STOP_WORDS = new Set(
  'a an and are as at be been but by can for from has have in into is it its of on or our that the their them they this to was we were will with you your who what when where which while within able about across after also any both each etc etc. more most must new not only other over per such than then there these those through using very well work working years year experience strong good great team role job candidate looking join plus preferred requirements responsibilities skills knowledge ability including like'.split(' ')
)

// Join every text field of the resume, so we can search it in one go
export function resumeToText(resume) {
  const parts = [resume.title, resume.summary, (resume.skills || []).join(', ')]

  ;(resume.experience || []).forEach((job) => parts.push(job.jobTitle, job.company, job.bullets))
  ;(resume.projects || []).forEach((project) => parts.push(project.name, project.techStack, project.bullets))
  ;(resume.education || []).forEach((edu) => parts.push(edu.degree, edu.institution))
  ;(resume.certifications || []).forEach((cert) => parts.push(cert.name, cert.issuer))

  return parts.filter(Boolean).join(' \n ').toLowerCase()
}

// Escape characters like + . # so "C++" or "Node.js" can be used inside a RegExp
function escapeForRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// True if `keyword` appears in `text` as a separate word or phrase
// ("java" should not match inside "javascript")
export function containsKeyword(text, keyword) {
  const pattern = new RegExp(`(^|[^a-z0-9+#])${escapeForRegex(keyword.toLowerCase())}(?=$|[^a-z0-9+#])`)
  return pattern.test(text.toLowerCase())
}

// Words the job description uses at least twice (and that are not stop words),
// most frequent first. Catches important terms that are not in our skill lists.
export function extractFrequentWords(text, limit = 8) {
  const counts = {}
  const words = text.toLowerCase().match(/[a-z][a-z0-9+#.-]{3,}/g) || []

  words.forEach((rawWord) => {
    const word = rawWord.replace(/[.-]+$/, '')
    if (!STOP_WORDS.has(word)) counts[word] = (counts[word] || 0) + 1
  })

  return Object.entries(counts)
    .filter(([, count]) => count >= 2)
    .sort((first, second) => second[1] - first[1])
    .slice(0, limit)
    .map(([word]) => word)
}

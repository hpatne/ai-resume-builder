/*
 * atsScore.js
 * Calculates the ATS (Applicant Tracking System) score shown on the ATS
 * Checker page (deliverable D7). It is simple keyword matching, written to be
 * easy to explain; Phase 3 will move a stronger engine to the backend.
 *
 * THE FORMULA (total = 100 points)
 *   A. Hard skills match ..... 40 pts = 40 x (hard skills found / hard skills the job asks for)
 *   B. Other keywords ........ 20 pts = 20 x (other job keywords found / other job keywords)
 *   C. Sections present ...... 20 pts = 4 pts each: contact, summary, skills,
 *                                       experience or projects, education
 *   D. Content quality ....... 10 pts = 5 if summary is 40-80 words
 *                                     + 5 x (share of bullet points that contain a number)
 *   E. Target alignment ...... 10 pts = 5 if the summary or title names the job role
 *                                     + 5 x (share of the company's keywords used)
 * Hard skills weigh the most because recruiters filter on them first.
 */
import { resumeToText, containsKeyword, extractFrequentWords } from './keywordUtils'
import { splitBullets, hasSectionContent } from './resumeFormat'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

// Share of items found (0 to 1). An empty list counts as fully covered.
function shareFound(keywords) {
  if (keywords.length === 0) return 1
  return keywords.filter((keyword) => keyword.matched).length / keywords.length
}

// Remove duplicates, ignoring upper/lower case
function uniqueWords(words) {
  const seen = new Set()
  return words.filter((word) => {
    const key = word.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function calculateAtsScore({ resume, jobDescription, company, role, knownSkills }) {
  // ---- Step 1: turn the resume into one block of searchable text ----
  const resumeText = resumeToText(resume)
  const jdText = jobDescription.toLowerCase()

  // ---- Step 2: find the keywords the job description asks for ----
  // Hard skills = any skill from our role data that the job description mentions.
  // If it mentions none we know, fall back to the target role's required skills.
  let hardSkillWords = knownSkills.filter((skill) => containsKeyword(jdText, skill))
  if (hardSkillWords.length === 0) hardSkillWords = role.requiredSkills

  // Other keywords = role/company keywords found in the job description,
  // plus words the job description repeats (not already counted as a skill)
  const targetWords = [...role.keywords, ...company.keywords].filter((word) => containsKeyword(jdText, word))
  const repeatedWords = extractFrequentWords(jdText, 6).filter((word) => !hardSkillWords.some((skill) => skill.toLowerCase().includes(word)))
  const otherWords = uniqueWords([...targetWords, ...repeatedWords]).filter((word) => !hardSkillWords.some((skill) => skill.toLowerCase() === word.toLowerCase()))

  // ---- Step 3: mark each keyword as found (matched) or missing in the resume ----
  const hardSkills = uniqueWords(hardSkillWords).map((word) => ({ word, matched: containsKeyword(resumeText, word) }))
  const otherKeywords = otherWords.map((word) => ({ word, matched: containsKeyword(resumeText, word) }))

  // ---- Step 4: section checks ----
  const allBullets = [...resume.experience, ...resume.projects].flatMap((entry) => splitBullets(entry.bullets))
  const bulletsWithNumbers = allBullets.filter((bullet) => /\d/.test(bullet))
  const quantifiedShare = allBullets.length ? bulletsWithNumbers.length / allBullets.length : 0
  const summaryWords = resume.summary.trim() ? resume.summary.trim().split(/\s+/).length : 0

  const sectionChecks = [
    { id: 'contact', label: 'Email and phone number', passed: Boolean(resume.personal.email && resume.personal.phone), section: 'personal' },
    { id: 'summary', label: 'Professional summary', passed: hasSectionContent(resume, 'summary'), section: 'summary' },
    { id: 'skills', label: 'Skills section with 5 or more skills', passed: resume.skills.length >= 5, section: 'skills' },
    { id: 'experience', label: 'Experience or projects', passed: resume.experience.length + resume.projects.length > 0, section: 'experience' },
    { id: 'education', label: 'Education', passed: hasSectionContent(resume, 'education'), section: 'education' },
  ]

  // ---- Step 5: add up the points (see THE FORMULA above) ----
  const companyKeywords = company.keywords.map((word) => ({ word, matched: containsKeyword(resumeText, word) }))
  const mentionsRole = containsKeyword(`${resume.summary} ${resume.title}`, role.title)

  const breakdown = [
    { label: 'Hard skills', maxPoints: 40, points: 40 * shareFound(hardSkills) },
    { label: 'Other keywords', maxPoints: 20, points: 20 * shareFound(otherKeywords) },
    { label: 'Sections present', maxPoints: 20, points: 4 * sectionChecks.filter((check) => check.passed).length },
    { label: 'Content quality', maxPoints: 10, points: (summaryWords >= 40 && summaryWords <= 80 ? 5 : 0) + 5 * quantifiedShare },
    { label: 'Target alignment', maxPoints: 10, points: (mentionsRole ? 5 : 0) + 5 * shareFound(companyKeywords) },
  ].map((item) => ({ ...item, points: Math.round(item.points) }))

  const score = Math.min(100, breakdown.reduce((total, item) => total + item.points, 0))

  // ---- Step 6: suggestions, most important first ----
  const suggestions = []
  const missingSkills = hardSkills.filter((keyword) => !keyword.matched).map((keyword) => keyword.word)
  const missingWords = otherKeywords.filter((keyword) => !keyword.matched).map((keyword) => keyword.word)

  if (missingSkills.length) suggestions.push({ priority: 'high', section: 'skills', text: `Add the skills this job asks for, if you have them: ${missingSkills.slice(0, 6).join(', ')}.` })
  sectionChecks.filter((check) => !check.passed).forEach((check) => suggestions.push({ priority: 'high', section: check.section, text: `Add this missing part: ${check.label.toLowerCase()}.` }))
  if (allBullets.length && quantifiedShare < 0.5) suggestions.push({ priority: 'medium', section: resume.experience.length ? 'experience' : 'projects', text: `Add numbers to ${allBullets.length - bulletsWithNumbers.length} bullet points (%, users, time saved) to show impact.` })
  if (missingWords.length) suggestions.push({ priority: 'medium', section: 'summary', text: `Use these words from the job description in your summary or bullets: ${missingWords.slice(0, 6).join(', ')}.` })
  if (!mentionsRole) suggestions.push({ priority: 'medium', section: 'summary', text: `Mention the role “${role.title}” in your summary so it matches the job title.` })
  if (summaryWords && (summaryWords < 40 || summaryWords > 80)) suggestions.push({ priority: 'low', section: 'summary', text: `Keep the summary between 40 and 80 words (it is ${summaryWords} now).` })

  suggestions.sort((first, second) => PRIORITY_ORDER[first.priority] - PRIORITY_ORDER[second.priority])

  return { score, breakdown, hardSkills, otherKeywords, sectionChecks, suggestions }
}

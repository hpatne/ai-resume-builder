// ATS score: an estimate (like Jobscan) of how well a resume matches a job description.
// One function, used by the ATS checker, the editor score box and "Tailor for a new job".
//
// With a job description (out of 100):
//   Skills from the job found in the resume ... 50
//   Job title mentioned ........................ 10
//   Sections present ........................... 20 (4 each)
//   Bullet quality ............................. 20 (numbers 8, action verbs 8, summary length 4)
// Without a job description, only sections and bullet quality are checked (40 points),
// and the result is shown out of 100.
import { containsKeyword, resumeToPlainText } from './keywordUtils'
import { findSkillsInText, textHasSkill, guessJobTitle } from './jobDescription'
import { splitBullets } from './resumeFormat'

// Common strong first words for bullet points
export const ACTION_VERBS = [
  'achieved', 'analysed', 'analyzed', 'automated', 'built', 'cleaned', 'collaborated', 'completed', 'conducted', 'contributed',
  'created', 'cut', 'debugged', 'delivered', 'deployed', 'designed', 'developed', 'documented', 'drove', 'enhanced',
  'fixed', 'handled', 'implemented', 'improved', 'increased', 'integrated', 'launched', 'led', 'maintained', 'managed',
  'mentored', 'migrated', 'modelled', 'modeled', 'optimised', 'optimized', 'organised', 'organized', 'planned', 'presented',
  'prepared', 'reduced', 'refactored', 'researched', 'resolved', 'saved', 'shipped', 'simplified', 'solved', 'streamlined',
  'supported', 'tested', 'trained', 'wrote',
]

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

// Strong start = a known action verb, or any past-tense word like "Created"
function startsWithActionVerb(bullet) {
  const firstWord = bullet.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, '')
  return ACTION_VERBS.includes(firstWord) || (firstWord.length > 4 && firstWord.endsWith('ed'))
}

// "Frontend Developer Intern (0-2 years)" → "Frontend Developer"
function coreTitle(title) {
  return title
    .replace(/\(.*?\)/g, '')
    .replace(/\b(senior|junior|jr|sr|intern|internship|trainee|fresher|graduate|associate|entry level|entry-level|i|ii)\b\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function share(part, total) {
  return total ? part / total : 0
}

export function calculateAtsScore(resume, jobDescription = '') {
  const jdText = (jobDescription || '').trim()
  const hasJobDescription = jdText.length > 0
  const resumeText = resumeToPlainText(resume)

  // Part 1: skills the job asks for, found or missing in the resume
  const jobSkills = findSkillsInText(jdText)
  const matchedSkills = jobSkills.filter((skill) => textHasSkill(resumeText, skill))
  const missingSkills = jobSkills.filter((skill) => !matchedSkills.includes(skill))

  // Part 2: job title in the summary or experience
  const jobTitle = (resume.roleTitle || guessJobTitle(jdText) || '').trim()
  const titleText = [resume.summary, ...(resume.experience || []).flatMap((job) => [job.jobTitle, job.bullets])].filter(Boolean).join(' \n ')
  const titleFound = Boolean(jobTitle) && [jobTitle, coreTitle(jobTitle)].some((title) => title && containsKeyword(titleText, title))

  // Part 3: sections
  const sectionChecks = [
    { id: 'contact', label: 'Email and phone number', passed: Boolean(resume.personal?.email && resume.personal?.phone), section: 'personal' },
    { id: 'summary', label: 'Professional summary', passed: Boolean(resume.summary?.trim()), section: 'summary' },
    { id: 'skills', label: 'Skills', passed: (resume.skills || []).length > 0, section: 'skills' },
    { id: 'work', label: 'Projects or experience', passed: (resume.projects || []).length + (resume.experience || []).length > 0, section: (resume.projects || []).length ? 'experience' : 'projects' },
    { id: 'education', label: 'Education', passed: (resume.education || []).length > 0, section: 'education' },
  ]

  // Part 4: bullet quality
  const bullets = [...(resume.experience || []), ...(resume.projects || [])].flatMap((entry) => splitBullets(entry.bullets))
  const bulletsWithNumbers = bullets.filter((bullet) => /\d/.test(bullet))
  const weakBullets = bullets.filter((bullet) => !startsWithActionVerb(bullet))
  const summaryWords = resume.summary?.trim() ? resume.summary.trim().split(/\s+/).length : 0
  const summaryIsGoodLength = summaryWords >= 40 && summaryWords <= 80

  // Add up the points; parts that can't be measured are left out
  const breakdown = []
  if (hasJobDescription && jobSkills.length) breakdown.push({ label: 'Skills from the job', maxPoints: 50, points: 50 * share(matchedSkills.length, jobSkills.length) })
  if (hasJobDescription) breakdown.push({ label: 'Job title mentioned', maxPoints: 10, points: titleFound ? 10 : 0 })
  breakdown.push({ label: 'Sections present', maxPoints: 20, points: 4 * sectionChecks.filter((check) => check.passed).length })
  breakdown.push({
    label: 'Bullet quality',
    maxPoints: 20,
    points: 8 * share(bulletsWithNumbers.length, bullets.length) + 8 * share(bullets.length - weakBullets.length, bullets.length) + (summaryIsGoodLength ? 4 : 0),
  })
  const roundedBreakdown = breakdown.map((item) => ({ ...item, points: Math.round(item.points) }))
  const totalPoints = roundedBreakdown.reduce((total, item) => total + item.points, 0)
  const maxPoints = roundedBreakdown.reduce((total, item) => total + item.maxPoints, 0)
  const score = Math.round((totalPoints / maxPoints) * 100)

  // Suggestions, most important first
  const suggestions = []
  if (missingSkills.length) suggestions.push({ priority: 'high', section: 'skills', text: `This job asks for ${missingSkills.slice(0, 6).join(', ')}${missingSkills.length > 6 ? ' and more' : ''}. Add the ones you really have to Skills or your bullet points.` })
  sectionChecks.filter((check) => !check.passed).forEach((check) => suggestions.push({ priority: 'high', section: check.section, text: `Add the missing section: ${check.label.toLowerCase()}.` }))
  if (hasJobDescription && jobTitle && !titleFound) suggestions.push({ priority: 'medium', section: 'summary', text: `Mention the job title “${jobTitle}” in your summary.` })
  if (bullets.length > bulletsWithNumbers.length) suggestions.push({ priority: 'medium', section: (resume.experience || []).length ? 'experience' : 'projects', text: `Add a number to ${bullets.length - bulletsWithNumbers.length} bullet point(s): users, %, time saved or size.` })
  if (weakBullets.length) suggestions.push({ priority: 'medium', section: (resume.experience || []).length ? 'experience' : 'projects', text: `Start ${weakBullets.length} bullet point(s) with an action verb like Built, Developed or Improved.` })
  if (summaryWords && !summaryIsGoodLength) suggestions.push({ priority: 'low', section: 'summary', text: `Keep the summary between 40 and 80 words (it is ${summaryWords} now).` })
  suggestions.sort((first, second) => PRIORITY_ORDER[first.priority] - PRIORITY_ORDER[second.priority])

  return { score, hasJobDescription, jobTitle, titleFound, jobSkills, matchedSkills, missingSkills, breakdown: roundedBreakdown, sectionChecks, suggestions }
}

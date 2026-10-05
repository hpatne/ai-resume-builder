// Calculates the ATS score (out of 100) by matching keywords.
// Hard skills found ........ 40
// Other keywords found ..... 20
// Sections present ......... 20 (4 each)
// Content quality .......... 10 (summary length + bullets with numbers)
// Matches the target ....... 10 (role named + company keywords used)
import { resumeToText, containsKeyword, extractFrequentWords } from './keywordUtils'
import { splitBullets, hasSectionContent } from './resumeFormat'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

// Share found, 0 to 1 (an empty list counts as all found)
function shareFound(keywords) {
  if (keywords.length === 0) return 1
  return keywords.filter((keyword) => keyword.matched).length / keywords.length
}

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
  // Step 1: the resume as one block of text
  const resumeText = resumeToText(resume)
  const jdText = jobDescription.toLowerCase()

  // Step 2: keywords the job asks for
  // Hard skills = known skills found in the job text
  // (if none are found, use the role's required skills)
  let hardSkillWords = knownSkills.filter((skill) => containsKeyword(jdText, skill))
  if (hardSkillWords.length === 0) hardSkillWords = role.requiredSkills

  // Other keywords = role/company keywords in the job text + words it repeats
  const targetWords = [...role.keywords, ...company.keywords].filter((word) => containsKeyword(jdText, word))
  const repeatedWords = extractFrequentWords(jdText, 6).filter((word) => !hardSkillWords.some((skill) => skill.toLowerCase().includes(word)))
  const otherWords = uniqueWords([...targetWords, ...repeatedWords]).filter((word) => !hardSkillWords.some((skill) => skill.toLowerCase() === word.toLowerCase()))

  // Step 3: mark each keyword as found or missing
  const hardSkills = uniqueWords(hardSkillWords).map((word) => ({ word, matched: containsKeyword(resumeText, word) }))
  const otherKeywords = otherWords.map((word) => ({ word, matched: containsKeyword(resumeText, word) }))

  // Step 4: section checks
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

  // Step 5: add up the points (formula at the top)
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

  // Step 6: suggestions, most important first
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

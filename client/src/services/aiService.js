// AI service (DEMO MODE).
// These functions follow simple written rules for now, and use only what the user typed.
// Phase 3: only the bodies of these functions change. Each one will call the Express backend,
// which calls a real AI model and keeps the API key secret. Pages and components only call these
// functions, and they already return the same data the backend will return, so nothing else changes.
import { simulateRequest, createId } from '../utils/mockApi'
import { findSkillsInText, textHasSkill, findListedSkill } from '../utils/jobDescription'

const AI_DELAY_MS = 900

// ---------- Small text helpers ----------

// Weak openings and the action verb that replaces them
const WEAK_STARTS = [
  [/^(i\s+)?worked on\s+/i, 'Developed '],
  [/^(i\s+)?was responsible for\s+/i, 'Handled '],
  [/^(i\s+)?responsible for\s+/i, 'Handled '],
  [/^(i\s+)?helped (with |in )?/i, 'Supported '],
  [/^(i\s+)?was part of\s+/i, 'Contributed to '],
  [/^(i\s+)?made\s+/i, 'Built '],
  [/^(i\s+)?did\s+/i, 'Completed '],
  [/^i\s+/i, ''],
]

const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1)
const countWords = (text) => (text.trim() ? text.trim().split(/\s+/).length : 0)

// "worked on the login page." → "Developed the login page"
function cleanBullet(line) {
  let bullet = line.trim().replace(/^[•\-*–·]\s*/, '').replace(/[.;]+$/, '')
  WEAK_STARTS.forEach(([pattern, replacement]) => {
    bullet = bullet.replace(pattern, replacement)
  })
  return capitalise(bullet.trim())
}

// Splits a paragraph into sentences and lines; numbers are never changed
function textToBullets(text) {
  return (text || '')
    .split(/\n|(?<=[a-z0-9%)])\.\s+(?=[A-Za-z])/)
    .map(cleanBullet)
    .filter((bullet) => bullet.length > 2)
}

// "React, Node.js and MongoDB" → "React, Node.js and MongoDB"; one item → itself
function joinWithAnd(items) {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

// User's skills, with the ones the job asks for first
function sortSkillsByJob(skills, jobDescription) {
  const jobSkills = findSkillsInText(jobDescription)
  const inJob = skills.filter((skill) => jobSkills.some((jobSkill) => textHasSkill(skill, jobSkill)))
  return [...inJob, ...skills.filter((skill) => !inJob.includes(skill))]
}

// The project with the most numbers in it (numbers show impact), else the first one
function pickBestProject(projects) {
  const withName = projects.filter((project) => project.name?.trim())
  const numberCount = (project) => (project.bullets || '').match(/\d+/g)?.length || 0
  return [...withName].sort((first, second) => numberCount(second) - numberCount(first))[0] || null
}

// ---------- Summary ----------

// profile: { degree, graduationYear, roleTitle, companyName, skills, projects, experience }
function buildSummary(profile, jobDescription) {
  const thisYear = new Date().getFullYear()
  const year = Number(profile.graduationYear)
  const degree = profile.degree?.trim()
  const role = profile.roleTitle?.trim() || 'entry-level'
  const company = profile.companyName?.trim()

  const sentences = []
  if (degree) {
    const stage = year && year >= thisYear ? `student graduating in ${year}` : year ? `graduate (${year})` : 'graduate'
    sentences.push(`${degree} ${stage}, applying for the ${role} role${company ? ` at ${company}` : ''}.`)
  } else {
    sentences.push(`Applying for the ${role} role${company ? ` at ${company}` : ''}.`)
  }

  const topSkills = sortSkillsByJob(profile.skills || [], jobDescription).slice(0, 5)
  if (topSkills.length) sentences.push(`Skilled in ${joinWithAnd(topSkills)}.`)

  const project = pickBestProject(profile.projects || [])
  if (project) {
    const firstPoint = textToBullets(project.bullets)[0]
    const tech = project.techStack?.trim() ? ` using ${project.techStack.trim()}` : ''
    sentences.push(`Built ${project.name.trim()}${tech}${firstPoint ? `: ${firstPoint.charAt(0).toLowerCase()}${firstPoint.slice(1)}` : ''}.`)
  }

  const internship = (profile.experience || []).find((entry) => entry.jobTitle?.trim())
  if (internship) sentences.push(`Worked as ${internship.jobTitle.trim()}${internship.company?.trim() ? ` at ${internship.company.trim()}` : ''}.`)

  // Neutral closing lines (no new facts) until the summary reaches 40 words
  const closingLines = [
    `Looking to apply these skills to real problems${company ? ` at ${company}` : ''} and keep learning.`,
    'Open to feedback and ready to learn the tools the team uses.',
  ]
  let summary = sentences.join(' ')
  closingLines.forEach((line) => {
    if (countWords(summary) < 40) summary = `${summary} ${line}`
  })

  // Keep it under 80 words
  const words = summary.split(/\s+/)
  return words.length > 80 ? `${words.slice(0, 80).join(' ').replace(/[,:;]$/, '')}.` : summary
}

// Resume → the profile used to write a summary
function profileFromResume(resume) {
  const education = resume.education?.[0] || {}
  return {
    degree: education.degree,
    graduationYear: education.endYear,
    roleTitle: resume.roleTitle,
    companyName: resume.companyName,
    skills: resume.skills,
    projects: resume.projects,
    experience: resume.experience,
  }
}

// ---------- The AI functions pages call ----------

// Turns the user's sentences into bullet points. Returns { bullets: [...] }
export function generateBullets(text, jobDescription = '') {
  // TODO (Phase 3): POST /api/ai/bullets { text, jobDescription }
  void jobDescription
  return simulateRequest({ bullets: textToBullets(text) }, AI_DELAY_MS)
}

// A 40–80 word summary from the user's own degree, role, skills and best project. Returns { summary }
export function writeSummary(profile, jobDescription = '') {
  // TODO (Phase 3): POST /api/ai/summary { profile, jobDescription }
  return simulateRequest({ summary: buildSummary(profile, jobDescription) }, AI_DELAY_MS)
}

// Cleans up one section without adding facts. content = the section's value
// (summary text, skills list, or experience/project entries). Returns { value, note }
export function improveSection(section, content, jobDescription = '') {
  // TODO (Phase 3): POST /api/ai/improve { section, content, jobDescription }
  void jobDescription
  let result

  if (section === 'summary') {
    const cleaned = content
      .replace(/\s+/g, ' ')
      .replace(/\bi am\b/gi, '')
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => capitalise(sentence.trim()))
      .filter(Boolean)
      .join(' ')
    result = { value: cleaned, note: 'Summary cleaned up: spacing, capital letters and "I am" removed.' }
  }

  if (section === 'skills') {
    // Use the standard name for each skill ("reactjs" → "React") and remove repeats
    const standardNames = content.map((skill) => findListedSkill(skill)?.name || skill.trim())
    const unique = standardNames.filter((skill, index) => skill && standardNames.findIndex((other) => other.toLowerCase() === skill.toLowerCase()) === index)
    const changed = content.length - unique.length + standardNames.filter((name, index) => name !== content[index]).length
    result = { value: unique, note: changed ? 'Skill names standardised and repeats removed.' : 'Skills already look clean.' }
  }

  if (section === 'experience' || section === 'projects') {
    const entries = content.map((entry) => ({ ...entry, bullets: textToBullets(entry.bullets).join('\n') }))
    const withoutNumbers = entries.flatMap((entry) => entry.bullets.split('\n')).filter((line) => line && !/\d/.test(line)).length
    result = {
      value: entries,
      note: withoutNumbers ? `Bullets now start with action verbs. ${withoutNumbers} still need a number (%, users, time saved).` : 'Bullets now start with action verbs.',
    }
  }

  return simulateRequest(result, AI_DELAY_MS)
}

// Rewrites the summary for the resume's (new) job title and the job's skills. Returns { summary }
export function tailorSummary(resume, jobDescription) {
  // TODO (Phase 3): POST /api/ai/tailor-summary { resume, jobDescription }
  return simulateRequest({ summary: buildSummary(profileFromResume(resume), jobDescription) }, AI_DELAY_MS)
}

// ---------- First draft from the create form ----------

// Builds the resume right away from what the user typed (also used for the live preview).
// companyName = the company the user typed ('' if none).
export function buildResumeDraft({ basics, company, role, templateId, jobDescription = '', companyName = company.name }) {
  const skills = sortSkillsByJob(basics.skills || [], jobDescription)
  const toEntry = (entry, prefix) => ({ ...entry, id: entry.id || createId(prefix), bullets: textToBullets(entry.bullets).join('\n') })
  const experience = (basics.experience || []).filter((entry) => entry.jobTitle?.trim() || entry.company?.trim()).map((entry) => toEntry(entry, 'exp'))
  const projects = (basics.projects || []).filter((entry) => entry.name?.trim()).map((entry) => toEntry(entry, 'proj'))
  const graduationYear = Number(basics.graduationYear) || ''

  return {
    title: [companyName, role.title].filter(Boolean).join(' – '),
    companyId: company.id,
    companyName,
    roleId: role.id,
    roleTitle: role.title,
    templateId,
    sectionOrder: [...company.sectionOrder],
    personal: {
      fullName: basics.fullName,
      email: basics.email,
      phone: basics.phone,
      location: basics.location,
      linkedin: '',
      portfolio: '',
    },
    summary: buildSummary({ ...basics, roleTitle: role.title, companyName, skills, projects, experience }, jobDescription),
    skills,
    experience,
    education: [
      {
        id: createId('edu'),
        degree: basics.degree,
        institution: basics.institution,
        location: '',
        startYear: graduationYear ? String(graduationYear - 4) : '',
        endYear: graduationYear ? String(graduationYear) : '',
        score: basics.score || '',
      },
    ],
    projects,
    certifications: [],
  }
}

export function generateResume(options) {
  // TODO (Phase 3): POST /api/ai/generate (the backend writes the draft with a real AI model)
  return simulateRequest(buildResumeDraft(options), 2200)
}

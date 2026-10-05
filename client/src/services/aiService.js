// Mock AI: writes the first draft and improves sections using the company and role data.
import { simulateRequest, createId } from '../utils/mockApi'
import { containsKeyword } from '../utils/keywordUtils'

// Role summary + the company's own sentence
function writeSummary(company, role) {
  const roleSummary = role.sampleSummary.replaceAll('{company}', company.name)
  return company.summaryLine ? `${roleSummary} ${company.summaryLine}` : roleSummary
}

// Experience-focused companies get more bullets; project-focused ones get more projects
function writeExperience(basics, company, role) {
  if (basics.experienceLevel === 'fresher') return []
  const bulletCount = company.emphasis === 'experience' ? 4 : 3
  return [
    {
      id: createId('exp'),
      jobTitle: basics.experienceLevel === 'internship' ? `${role.title} Intern` : role.title,
      company: basics.lastCompany || '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: role.experienceBullets.slice(0, bulletCount).join('\n'),
    },
  ]
}

function writeProjects(company, role) {
  const projectCount = company.emphasis === 'projects' ? role.projects.length : 1
  return role.projects.slice(0, projectCount).map((project) => ({
    id: createId('proj'),
    name: project.name,
    techStack: project.techStack,
    link: '',
    bullets: project.bullets.join('\n'),
  }))
}

// Builds the draft right away (also used by the landing page demo)
export function buildResumeDraft({ basics, company, role, templateId }) {
  const graduationYear = Number(basics.graduationYear) || new Date().getFullYear()

  const draft = {
    title: `${company.name} – ${role.title}`,
    companyId: company.id,
    companyName: company.name,
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
    summary: writeSummary(company, role),
    skills: [...role.requiredSkills],
    experience: writeExperience(basics, company, role),
    education: [
      {
        id: createId('edu'),
        degree: basics.degree,
        institution: basics.institution,
        location: '',
        startYear: String(graduationYear - 4),
        endYear: String(graduationYear),
        score: basics.score || '',
      },
    ],
    projects: writeProjects(company, role),
    certifications: role.certifications.map((cert) => ({ id: createId('cert'), name: cert.name, issuer: cert.issuer, year: '' })),
  }
  return draft
}

export function generateResume({ basics, company, role, templateId }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const draft = buildResumeDraft({ basics, company, role, templateId })
  // Delay so the loading screen is visible
  return simulateRequest(draft, 2200)
}

// Weak openings and stronger replacements
const WEAK_PHRASES = [
  [/^worked on/i, 'Led work on'],
  [/^responsible for/i, 'Took ownership of'],
  [/^helped (the team )?(with )?/i, 'Contributed to '],
  [/^was part of/i, 'Collaborated on'],
  [/^did /i, 'Completed '],
  [/^made /i, 'Built '],
]

// Stronger first word, capital letter, no full stop
function strengthenBullets(bulletText) {
  return bulletText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      let improvedLine = line.replace(/\.$/, '')
      WEAK_PHRASES.forEach(([pattern, replacement]) => {
        improvedLine = improvedLine.replace(pattern, replacement)
      })
      return improvedLine.charAt(0).toUpperCase() + improvedLine.slice(1)
    })
    .join('\n')
}

function countUnmeasuredBullets(entries) {
  return entries.flatMap((entry) => entry.bullets.split('\n').filter((line) => line.trim() && !/\d/.test(line))).length
}

// Returns { value, note }: the new section content and a short message for the toast
export function improveSection(sectionKey, resume, { company, role }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  let result

  if (sectionKey === 'summary') {
    const currentSummary = resume.summary.trim()
    if (currentSummary.length < 60) {
      result = { value: writeSummary(company, role), note: `Summary rewritten for ${role.title} at ${company.name}.` }
    } else {
      // Keep the user's text and add missing keywords
      const missingKeywords = [...company.keywords, ...role.keywords].filter((word) => !containsKeyword(currentSummary, word)).slice(0, 2)
      const addition = missingKeywords.length ? ` Comfortable with ${missingKeywords.join(' and ')}.` : ''
      const hasCompanyLine = company.summaryLine && currentSummary.includes(company.summaryLine)
      const companyLine = company.summaryLine && !hasCompanyLine ? ` ${company.summaryLine}` : ''
      result = {
        value: `${currentSummary}${companyLine}${addition}`.trim(),
        note: missingKeywords.length ? `Added keywords: ${missingKeywords.join(', ')}.` : 'Summary already covers the key terms.',
      }
    }
  }

  if (sectionKey === 'skills') {
    const missingSkills = role.requiredSkills.filter((skill) => !resume.skills.some((existing) => existing.toLowerCase() === skill.toLowerCase())).slice(0, 4)
    result = {
      value: [...resume.skills, ...missingSkills],
      note: missingSkills.length ? `Added ${missingSkills.length} skills ${role.title}s are expected to have.` : 'Your skills already cover this role.',
    }
  }

  if (sectionKey === 'experience' || sectionKey === 'projects') {
    const entries = resume[sectionKey].map((entry) => ({ ...entry, bullets: strengthenBullets(entry.bullets) }))
    const unmeasured = countUnmeasuredBullets(entries)
    result = {
      value: entries,
      note: unmeasured ? `Stronger action verbs added. ${unmeasured} bullet(s) still need a number (%, users, time saved).` : 'Stronger action verbs added.',
    }
  }

  return simulateRequest(result, 1300)
}

/*
 * sections.js
 * The resume sections a user can fill in, and their display names.
 * Personal info is always at the top; these six can be reordered per company.
 */
export const SECTION_LABELS = {
  summary: 'Summary',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications',
}

export const DEFAULT_SECTION_ORDER = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications']

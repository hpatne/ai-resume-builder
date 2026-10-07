// Mock storage for resumes (create, load, save, delete, copy).
import seedResumes from '../data/sampleResumes'
import { loadCollection, saveToStorage } from '../utils/storage'
import { simulateRequest, simulateError, createId } from '../utils/mockApi'

const RESUMES_KEY = 'resumes'

function getStoredResumes() {
  return loadCollection(RESUMES_KEY, seedResumes)
}

export function getResumes(userId) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const userResumes = getStoredResumes()
    .filter((resume) => resume.userId === userId)
    .sort((first, second) => second.updatedAt.localeCompare(first.updatedAt))
  return simulateRequest(userResumes, 450)
}

export function getResumeById(resumeId, userId) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const resume = getStoredResumes().find((storedResume) => storedResume.id === resumeId)
  if (!resume || resume.userId !== userId) {
    return simulateError('This resume could not be found. It may have been deleted.')
  }
  return simulateRequest(resume, 350)
}

export function createResume(userId, resumeData) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const now = new Date().toISOString()
  const newResume = { ...resumeData, id: createId('resume'), userId, atsScore: null, createdAt: now, updatedAt: now }
  saveToStorage(RESUMES_KEY, [...getStoredResumes(), newResume])
  return simulateRequest(newResume, 400)
}

export function updateResume(resumeId, updates) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  let updatedResume = null
  const resumes = getStoredResumes().map((resume) => {
    if (resume.id !== resumeId) return resume
    updatedResume = { ...resume, ...updates, updatedAt: new Date().toISOString() }
    return updatedResume
  })
  if (!updatedResume) return simulateError('This resume no longer exists.')
  saveToStorage(RESUMES_KEY, resumes)
  return simulateRequest(updatedResume, 450)
}

export function deleteResume(resumeId) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  saveToStorage(RESUMES_KEY, getStoredResumes().filter((resume) => resume.id !== resumeId))
  return simulateRequest(true, 350)
}

export function duplicateResume(resumeId) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const original = getStoredResumes().find((resume) => resume.id === resumeId)
  if (!original) return simulateError('This resume no longer exists.')
  const now = new Date().toISOString()
  const copy = { ...structuredClone(original), id: createId('resume'), title: `${original.title} (copy)`, createdAt: now, updatedAt: now }
  saveToStorage(RESUMES_KEY, [...getStoredResumes(), copy])
  return simulateRequest(copy, 400)
}

// Saving a score does not change "last edited". extra = the job description it was checked against.
export function saveAtsScore(resumeId, score, extra = {}) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const resumes = getStoredResumes().map((resume) =>
    resume.id === resumeId ? { ...resume, ...extra, atsScore: score, atsCheckedAt: new Date().toISOString() } : resume
  )
  saveToStorage(RESUMES_KEY, resumes)
  return simulateRequest(resumes.find((resume) => resume.id === resumeId), 200)
}

export function getAllResumes() {
  // TODO (Phase 2): replace mock with real API call to the Express backend (admin only)
  return simulateRequest(getStoredResumes(), 300)
}

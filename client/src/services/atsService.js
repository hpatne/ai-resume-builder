// Runs the ATS check (mock).
import { calculateAtsScore } from '../utils/atsScore'
import { simulateRequest } from '../utils/mockApi'

export function analyzeResume({ resume, jobDescription, company, role, knownSkills }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const report = calculateAtsScore({ resume, jobDescription, company, role, knownSkills })
  return simulateRequest(report, 1500)
}

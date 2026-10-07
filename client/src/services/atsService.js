// Runs the ATS check (in the browser for now).
import { calculateAtsScore } from '../utils/atsScore'
import { simulateRequest } from '../utils/mockApi'

export function analyzeResume({ resume, jobDescription }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  return simulateRequest(calculateAtsScore(resume, jobDescription), 900)
}

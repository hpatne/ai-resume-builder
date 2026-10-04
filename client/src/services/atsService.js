/*
 * atsService.js
 * MOCK ATS analysis (deliverable D7). Runs the keyword-matching formula from
 * utils/atsScore.js after a short "scanning" delay, like a real API would.
 * Used by: AtsCheckerPage.
 *
 * TODO (Phase 2): replace mock with real API call to the Express backend
 * (POST /api/ats/analyze); Phase 3 adds a stronger ATS engine on the server.
 */
import { calculateAtsScore } from '../utils/atsScore'
import { simulateRequest } from '../utils/mockApi'

export function analyzeResume({ resume, jobDescription, company, role, knownSkills }) {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  const report = calculateAtsScore({ resume, jobDescription, company, role, knownSkills })
  return simulateRequest(report, 1500)
}

// ATS Checker page (/ats-checker).
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ScanSearch, ClipboardList } from 'lucide-react'
import { useResumes } from '../context/ResumeContext'
import { useCatalog } from '../context/CatalogContext'
import { useToast } from '../context/ToastContext'
import { analyzeResume } from '../services/atsService'
import { resolveCompany, resolveRole } from '../utils/targetProfile'
import sampleJobDescriptions from '../data/sampleJobDescriptions'
import PageHeader from '../components/PageHeader'
import PageLoader from '../components/PageLoader'
import EmptyState from '../components/EmptyState'
import Select from '../components/Select'
import TextArea from '../components/TextArea'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import TargetStrip from '../components/TargetStrip'
import AtsResultPanel from '../components/ats/AtsResultPanel'

const MIN_JD_LENGTH = 80

function AtsCheckerPage() {
  const { resumes, isResumesLoading, saveScore } = useResumes()
  const { companies, roles } = useCatalog()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()

  const [selectedId, setSelectedId] = useState(searchParams.get('resume') || '')
  const [jobDescription, setJobDescription] = useState('')
  const [jdError, setJdError] = useState('')
  const [report, setReport] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  if (isResumesLoading) return <PageLoader message="Loading your resumes…" />
  if (resumes.length === 0) {
    return <EmptyState icon={<ScanSearch size={24} aria-hidden="true" />} title="No resume to check yet" description="Create a resume first, then come back to score it against a job description." action={<Button to="/create">Create a resume</Button>} />
  }

  const resume = resumes.find((item) => item.id === selectedId) || resumes[0]
  const company = resolveCompany(companies, resume.companyId, resume.companyName)
  const role = resolveRole(roles, resume.roleId, resume.roleTitle)
  const sampleJd = sampleJobDescriptions[role.id]

  const handleResumeChange = (event) => {
    setSelectedId(event.target.value)
    setReport(null) // an old report would describe a different resume
  }

  const handleCheck = async () => {
    if (jobDescription.trim().length < MIN_JD_LENGTH) {
      setJdError(`Paste the full job description (at least ${MIN_JD_LENGTH} characters).`)
      return
    }
    setJdError('')
    setIsAnalyzing(true)
    // All known skills, used to spot hard skills in the job description
    const knownSkills = [...new Set(roles.flatMap((item) => item.requiredSkills))]
    const newReport = await analyzeResume({ resume, jobDescription, company, role, knownSkills })
    await saveScore(resume.id, newReport.score)
    setReport(newReport)
    setIsAnalyzing(false)
    showToast(`ATS score ${newReport.score}/100 saved to this resume.`)
  }

  return (
    <>
      <PageHeader title="ATS checker" description="Score a resume against a job description the way an applicant tracking system would." />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <section aria-label="Resume and job description" className="space-y-4 rounded-lg border border-line bg-paper p-5 xl:sticky xl:top-6">
          <Select id="ats-resume" label="Resume to check" value={resume.id} onChange={handleResumeChange} options={resumes.map((item) => ({ value: item.id, label: item.title }))} />
          <TargetStrip companyName={company.name} roleTitle={role.title} />
          <TextArea
            id="job-description"
            label="Job description"
            rows={11}
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the job description from the job portal here…"
            error={jdError}
            hint={`${jobDescription.trim().length} characters`}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={handleCheck} loading={isAnalyzing}>
              {!isAnalyzing && <ScanSearch size={18} aria-hidden="true" />} Check ATS score
            </Button>
            {sampleJd && (
              <Button variant="secondary" size="lg" onClick={() => setJobDescription(sampleJd)}>
                <ClipboardList size={18} aria-hidden="true" /> Use a sample job description
              </Button>
            )}
          </div>
        </section>

        <div>
          {isAnalyzing && (
            <div role="status" className="flex flex-col items-center gap-3 rounded-lg border border-line bg-paper px-6 py-16 text-center">
              <Spinner size={30} label="Checking" />
              <p className="text-[15px] font-semibold">Scanning “{resume.title}” against the job description…</p>
            </div>
          )}
          {!isAnalyzing && report && <AtsResultPanel report={report} resumeId={resume.id} />}
          {!isAnalyzing && !report && (
            <EmptyState
              icon={<ScanSearch size={24} aria-hidden="true" />}
              title="Your report will appear here"
              description="You will get a score out of 100, the keywords you matched and missed, section checks, and a ranked list of fixes."
            />
          )}
        </div>
      </div>
    </>
  )
}

export default AtsCheckerPage

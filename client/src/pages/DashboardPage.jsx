/*
 * DashboardPage.jsx  (route: /dashboard, protected)
 * The user's home: every saved resume as a card (objective O6, deliverable D8).
 * - search and filter by company or role
 * - Edit, Duplicate, Download (PDF) and Delete (after confirmation)
 * - an empty state that sends new users to the create wizard
 */
import { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { FilePlus2, FileText, SearchX } from 'lucide-react'
import { useResumes } from '../context/ResumeContext'
import { useCatalog } from '../context/CatalogContext'
import { useToast } from '../context/ToastContext'
import { getTemplateLayout } from '../utils/resumeFormat'
import { PRINT_PAGE_STYLE, buildPdfFileName } from '../utils/pdf'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'
import ResumeCard from '../components/ResumeCard'
import ResumeFilters from '../components/ResumeFilters'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import PrintableResume from '../components/PrintableResume'

function DashboardPage() {
  const { resumes, isResumesLoading, deleteResume, duplicateResume } = useResumes()
  const { templates } = useCatalog()
  const { showToast } = useToast()

  // ---- State ----
  const [filters, setFilters] = useState({ search: '', company: '', role: '' })
  const [resumeToDelete, setResumeToDelete] = useState(null)
  const [resumeToPrint, setResumeToPrint] = useState(null)
  const printRef = useRef(null)

  // ---- PDF download: render the resume off-screen, then open the print window ----
  const printResume = useReactToPrint({
    contentRef: printRef,
    documentTitle: resumeToPrint ? buildPdfFileName(resumeToPrint) : 'Resume',
    pageStyle: PRINT_PAGE_STYLE,
    onAfterPrint: () => setResumeToPrint(null),
  })

  useEffect(() => {
    if (resumeToPrint) printResume()
  }, [resumeToPrint, printResume])

  // ---- Handlers ----
  const handleDownload = (resume) => {
    showToast('In the print window, choose “Save as PDF”.', 'info')
    setResumeToPrint(resume)
  }

  const handleDuplicate = async (resume) => {
    await duplicateResume(resume.id)
    showToast(`Copied “${resume.title}”. Retarget the copy for your next application.`)
  }

  const handleConfirmDelete = async () => {
    const { id, title } = resumeToDelete
    setResumeToDelete(null)
    await deleteResume(id)
    showToast(`Deleted “${title}”.`)
  }

  // ---- Search and filters ----
  const companyNames = [...new Set(resumes.map((resume) => resume.companyName))].sort()
  const roleTitles = [...new Set(resumes.map((resume) => resume.roleTitle))].sort()
  const searchText = filters.search.trim().toLowerCase()
  const visibleResumes = resumes.filter(
    (resume) =>
      (!filters.company || resume.companyName === filters.company) &&
      (!filters.role || resume.roleTitle === filters.role) &&
      (!searchText || `${resume.title} ${resume.companyName} ${resume.roleTitle}`.toLowerCase().includes(searchText))
  )
  const getTemplateName = (templateId) => templates.find((template) => template.id === templateId)?.name || templateId

  return (
    <>
      <PageHeader
        title="My resumes"
        description="Keep one resume per application, each tailored to its target company and role."
        actions={
          <Button to="/create">
            <FilePlus2 size={18} aria-hidden="true" /> Create resume
          </Button>
        }
      />

      {/* Loading skeletons */}
      {isResumesLoading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-5" aria-hidden="true">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-[22rem] animate-pulse rounded-lg border border-line bg-paper" />
          ))}
        </div>
      )}

      {/* New user: nothing saved yet */}
      {!isResumesLoading && resumes.length === 0 && (
        <EmptyState
          icon={<FileText size={24} aria-hidden="true" />}
          title="Create your first resume"
          description="Start with the company and job role you are applying for. We recommend a template and write a tailored first draft for you."
          action={<Button to="/create">Start with my target</Button>}
        />
      )}

      {!isResumesLoading && resumes.length > 0 && (
        <>
          <ResumeFilters filters={filters} onChange={setFilters} companyNames={companyNames} roleTitles={roleTitles} />
          <p className="tabular mb-3 text-sm text-ink-faint" aria-live="polite">
            Showing {visibleResumes.length} of {resumes.length} resumes
          </p>

          {visibleResumes.length === 0 ? (
            <EmptyState
              icon={<SearchX size={24} aria-hidden="true" />}
              title="No resumes match"
              description="Try another search, or clear the filters to see all your resumes."
              action={<Button variant="secondary" onClick={() => setFilters({ search: '', company: '', role: '' })}>Clear filters</Button>}
            />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,380px),1fr))] gap-5">
              {visibleResumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  layout={getTemplateLayout(templates, resume.templateId)}
                  templateName={getTemplateName(resume.templateId)}
                  onDuplicate={handleDuplicate}
                  onDownload={handleDownload}
                  onDelete={setResumeToDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

      {resumeToDelete && (
        <ConfirmDialog
          title="Delete this resume?"
          message={`“${resumeToDelete.title}” will be deleted permanently. This cannot be undone.`}
          confirmLabel="Delete resume"
          onConfirm={handleConfirmDelete}
          onCancel={() => setResumeToDelete(null)}
        />
      )}

      <PrintableResume resume={resumeToPrint} layout={resumeToPrint && getTemplateLayout(templates, resumeToPrint.templateId)} printRef={printRef} />
    </>
  )
}

export default DashboardPage

/*
 * ResumeEditorPage.jsx  (route: /editor/:resumeId, protected)
 * Split-screen editor (objective O4; deliverables D5, D6):
 *   left  - keyword panel + section forms (add/remove entries, reorder, Improve with AI)
 *   right - LIVE PREVIEW: resumeData is kept in state here and passed as a prop to
 *           the template, so the preview re-renders on every keystroke
 * Toolbar: change template (content kept), Check ATS, Download PDF, Save.
 * On phones the two halves become "Edit" and "Preview" tabs.
 */
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { useAuth } from '../context/AuthContext'
import { useCatalog } from '../context/CatalogContext'
import { useResumes } from '../context/ResumeContext'
import { useToast } from '../context/ToastContext'
import { getResumeById } from '../services/resumeService'
import { improveSection } from '../services/aiService'
import { resolveCompany, resolveRole } from '../utils/targetProfile'
import { getTemplateLayout } from '../utils/resumeFormat'
import { PRINT_PAGE_STYLE, buildPdfFileName } from '../utils/pdf'
import PageLoader from '../components/PageLoader'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'
import TargetStrip from '../components/TargetStrip'
import ResumePreview from '../components/templates/ResumePreview'
import EditorToolbar from '../components/editor/EditorToolbar'
import EditorSections from '../components/editor/EditorSections'
import KeywordPanel from '../components/editor/KeywordPanel'
import RetargetDialog from '../components/editor/RetargetDialog'

function ResumeEditorPage() {
  const { resumeId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { companies, roles, templates } = useCatalog()
  const { saveResume } = useResumes()
  const { showToast } = useToast()
  const printRef = useRef(null)

  // ---- State ----
  const [resumeData, setResumeData] = useState(null) // the resume being edited
  const [savedSnapshot, setSavedSnapshot] = useState('') // last saved version, to detect unsaved changes
  const [loadError, setLoadError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [improvingSection, setImprovingSection] = useState('')
  const [openSections, setOpenSections] = useState([searchParams.get('section') || 'personal'])
  const [activeTab, setActiveTab] = useState('edit') // phones only
  const [isRetargetOpen, setIsRetargetOpen] = useState(false)

  // ---- Load the resume once ----
  useEffect(() => {
    getResumeById(resumeId, user.id)
      .then((resume) => {
        setResumeData(resume)
        setSavedSnapshot(JSON.stringify(resume))
      })
      .catch((error) => setLoadError(error.message))
  }, [resumeId, user.id])

  // Coming from "Fix in editor" (ATS checker): scroll to the section to fix
  const requestedSection = searchParams.get('section')
  const isLoaded = Boolean(resumeData)
  useEffect(() => {
    if (isLoaded && requestedSection) document.getElementById(`section-${requestedSection}`)?.scrollIntoView({ behavior: 'smooth' })
  }, [isLoaded, requestedSection])

  const hasUnsavedChanges = isLoaded && JSON.stringify(resumeData) !== savedSnapshot

  // Warn before closing the tab with unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges) return
    const warn = (event) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasUnsavedChanges])

  const handlePrint = useReactToPrint({ contentRef: printRef, documentTitle: resumeData ? buildPdfFileName(resumeData) : 'Resume', pageStyle: PRINT_PAGE_STYLE })

  if (loadError) {
    return <EmptyState title="Resume not found" description={loadError} action={<Button to="/dashboard">Back to my resumes</Button>} />
  }
  if (!resumeData) return <PageLoader message="Opening your resume…" />

  const company = resolveCompany(companies, resumeData.companyId, resumeData.companyName)
  const role = resolveRole(roles, resumeData.roleId, resumeData.roleTitle)

  // ---- Handlers: editing ----
  const updateResume = (changes) => setResumeData((current) => ({ ...current, ...changes }))
  const handleSectionChange = (sectionKey, value) => updateResume({ [sectionKey]: value })
  const handleToggleSection = (sectionKey) => setOpenSections((open) => (open.includes(sectionKey) ? open.filter((key) => key !== sectionKey) : [...open, sectionKey]))

  // Swap a section with its neighbour (direction -1 = up, +1 = down)
  const handleMoveSection = (index, direction) => {
    const newOrder = [...resumeData.sectionOrder]
    ;[newOrder[index], newOrder[index + direction]] = [newOrder[index + direction], newOrder[index]]
    updateResume({ sectionOrder: newOrder })
  }

  const handleAddSkill = (skill) => {
    updateResume({ skills: [...resumeData.skills, skill] })
    showToast(`Added “${skill}” to Skills.`)
  }

  // Improve with AI: keep the old value so the user can undo
  const handleImprove = async (sectionKey) => {
    const previousValue = resumeData[sectionKey]
    setImprovingSection(sectionKey)
    const result = await improveSection(sectionKey, resumeData, { company, role })
    setImprovingSection('')
    handleSectionChange(sectionKey, result.value)
    setOpenSections((open) => (open.includes(sectionKey) ? open : [...open, sectionKey]))
    showToast(result.note, 'success', { actionLabel: 'Undo', onAction: () => handleSectionChange(sectionKey, previousValue) })
  }

  const handleRetarget = (newTarget, useCompanyOrder) => {
    const newCompany = resolveCompany(companies, newTarget.companyId, newTarget.companyName)
    const newRole = resolveRole(roles, newTarget.roleId, newTarget.roleTitle)
    updateResume({
      companyId: newCompany.id,
      companyName: newCompany.name,
      roleId: newRole.id,
      roleTitle: newRole.title,
      title: `${newCompany.name} – ${newRole.title}`,
      ...(useCompanyOrder && { sectionOrder: [...newCompany.sectionOrder] }),
    })
    setIsRetargetOpen(false)
    showToast(`Now targeting ${newCompany.name}. Check the keyword panel for what is missing.`)
  }

  // ---- Handlers: saving ----
  const handleSave = async () => {
    setIsSaving(true)
    const savedResume = await saveResume(resumeData.id, resumeData)
    setResumeData(savedResume)
    setSavedSnapshot(JSON.stringify(savedResume))
    setIsSaving(false)
    showToast('Resume saved.')
  }

  // The ATS checker reads the saved version, so save first
  const handleCheckAts = async () => {
    if (hasUnsavedChanges) await handleSave()
    navigate(`/ats-checker?resume=${resumeData.id}`)
  }

  const tabClasses = (tab) => `h-10 flex-1 rounded-md text-[15px] font-semibold ${activeTab === tab ? 'bg-navy text-white' : 'text-ink-soft'}`

  return (
    <div className="space-y-4">
      <EditorToolbar
        title={resumeData.title}
        onTitleChange={(title) => updateResume({ title })}
        templates={templates}
        templateId={resumeData.templateId}
        onTemplateChange={(templateId) => updateResume({ templateId })}
        hasUnsavedChanges={hasUnsavedChanges}
        isSaving={isSaving}
        onSave={handleSave}
        onDownload={() => {
          showToast('In the print window, choose “Save as PDF”.', 'info')
          handlePrint()
        }}
        onCheckAts={handleCheckAts}
      />

      <TargetStrip
        companyName={company.name}
        roleTitle={role.title}
        detail={`${company.type} · ${company.emphasis === 'projects' ? 'projects first' : 'experience first'}`}
        action={<Button variant="secondary" size="sm" onClick={() => setIsRetargetOpen(true)}>Change target</Button>}
      />

      {/* Phone tabs */}
      <div role="tablist" aria-label="Editor view" className="flex gap-1 rounded-lg border border-line bg-paper p-1 lg:hidden">
        <button type="button" role="tab" aria-selected={activeTab === 'edit'} className={tabClasses('edit')} onClick={() => setActiveTab('edit')}>Edit</button>
        <button type="button" role="tab" aria-selected={activeTab === 'preview'} className={tabClasses('preview')} onClick={() => setActiveTab('preview')}>Preview</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: keywords + forms */}
        <div className={`${activeTab === 'edit' ? 'block' : 'hidden'} min-w-0 space-y-3 lg:block`}>
          <KeywordPanel company={company} role={role} resumeData={resumeData} onAddSkill={handleAddSkill} />
          <EditorSections
            resumeData={resumeData}
            onSectionChange={handleSectionChange}
            onMoveSection={handleMoveSection}
            onImprove={handleImprove}
            improvingSection={improvingSection}
            openSections={openSections}
            onToggleSection={handleToggleSection}
          />
        </div>

        {/* Right: live preview (this exact page is what gets printed) */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} min-w-0 lg:block`}>
          <div className="rounded-lg bg-[#dfe3ea] p-3 sm:p-5 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto">
            <ResumePreview resume={resumeData} layout={getTemplateLayout(templates, resumeData.templateId)} printRef={printRef} showPageBreaks />
          </div>
        </div>
      </div>

      {isRetargetOpen && (
        <RetargetDialog
          companies={companies}
          roles={roles}
          currentTarget={{ companyName: company.name, companyId: company.id, roleTitle: role.title, roleId: role.id }}
          onApply={handleRetarget}
          onClose={() => setIsRetargetOpen(false)}
        />
      )}
    </div>
  )
}

export default ResumeEditorPage

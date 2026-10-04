/*
 * EditorWorkspace.jsx
 * The editor's two halves: forms on the left, live preview on the right.
 * On phones and tablets they become two tabs ("Edit" / "Preview").
 * The preview's page is the element react-to-print prints (via printRef).
 */
import { useState } from 'react'
import ResumePreview from '../templates/ResumePreview'
import KeywordPanel from './KeywordPanel'
import EditorSections from './EditorSections'

function EditorWorkspace({ resumeData, layout, company, role, printRef, onAddSkill, sectionProps }) {
  const [activeTab, setActiveTab] = useState('edit')
  const tabClasses = (tab) => `h-10 flex-1 rounded-md text-[15px] font-semibold ${activeTab === tab ? 'bg-navy text-white' : 'text-ink-soft'}`

  return (
    <>
      {/* Phone / tablet tabs */}
      <div role="tablist" aria-label="Editor view" className="flex gap-1 rounded-lg border border-line bg-paper p-1 lg:hidden">
        <button type="button" role="tab" aria-selected={activeTab === 'edit'} className={tabClasses('edit')} onClick={() => setActiveTab('edit')}>Edit</button>
        <button type="button" role="tab" aria-selected={activeTab === 'preview'} className={tabClasses('preview')} onClick={() => setActiveTab('preview')}>Preview</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: keywords + forms */}
        <div className={`${activeTab === 'edit' ? 'block' : 'hidden'} min-w-0 space-y-3 lg:block`}>
          <KeywordPanel company={company} role={role} resumeData={resumeData} onAddSkill={onAddSkill} />
          <EditorSections resumeData={resumeData} {...sectionProps} />
        </div>

        {/* Right: live preview; resumeData arrives as a prop, so it re-renders on every keystroke */}
        <div className={`${activeTab === 'preview' ? 'block' : 'hidden'} min-w-0 lg:block`}>
          <div className="rounded-lg bg-[#dfe3ea] p-3 sm:p-5 lg:sticky lg:top-6 lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto">
            <ResumePreview resume={resumeData} layout={layout} printRef={printRef} showPageBreaks />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditorWorkspace

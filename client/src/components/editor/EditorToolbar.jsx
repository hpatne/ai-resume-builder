// Editor top bar: title, template, Check ATS, Download PDF, Save.
import { FileDown, ScanSearch, Save } from 'lucide-react'
import Select from '../Select'
import Button from '../Button'
import StatusStamp from '../StatusStamp'

function EditorToolbar({ title, onTitleChange, templates, templateId, onTemplateChange, hasUnsavedChanges, isSaving, onSave, onDownload, onCheckAts }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line bg-paper p-2.5">
      <label htmlFor="resume-title" className="sr-only">Resume title</label>
      <input
        id="resume-title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        className="h-10 min-w-0 flex-[1_1_220px] rounded-md border border-transparent px-2 text-lg font-bold hover:border-line focus:border-line-strong"
      />

      {hasUnsavedChanges ? <StatusStamp tone="amber">Unsaved</StatusStamp> : <StatusStamp tone="signal">Saved</StatusStamp>}

      <Select
        id="editor-template"
        label="Template"
        hideLabel
        className="w-full sm:w-36"
        value={templateId}
        onChange={(event) => onTemplateChange(event.target.value)}
        options={templates.map((template) => ({ value: template.id, label: template.name }))}
      />

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={onCheckAts}>
          <ScanSearch size={17} aria-hidden="true" /> Check ATS
        </Button>
        <Button variant="secondary" onClick={onDownload}>
          <FileDown size={17} aria-hidden="true" /> Download PDF
        </Button>
        <Button onClick={onSave} loading={isSaving} disabled={!hasUnsavedChanges}>
          {!isSaving && <Save size={17} aria-hidden="true" />} Save
        </Button>
      </div>
    </div>
  )
}

export default EditorToolbar

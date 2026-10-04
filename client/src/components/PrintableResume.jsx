/*
 * PrintableResume.jsx
 * Renders a resume off-screen at full A4 size so it can be printed to PDF
 * from pages that do not show a full preview (the dashboard's Download button).
 */
import TemplateRenderer from './templates/TemplateRenderer'

function PrintableResume({ resume, layout, printRef }) {
  if (!resume) return null

  return (
    <div aria-hidden="true" className="fixed top-0 -left-[10000px] w-[794px]">
      <TemplateRenderer ref={printRef} resume={resume} layout={layout} />
    </div>
  )
}

export default PrintableResume

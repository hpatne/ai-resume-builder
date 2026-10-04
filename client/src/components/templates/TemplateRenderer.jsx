/*
 * TemplateRenderer.jsx
 * Picks the right template component for a resume and draws it.
 * `layout` is "classic", "modern" or "minimal" (from the template's data).
 * Changing the template only changes this layout value; the resume content
 * stays the same, which is how "Change Template (content kept)" works.
 * The `ref` is attached to the page so react-to-print can print it to PDF.
 */
import ClassicTemplate from './ClassicTemplate'
import ModernTemplate from './ModernTemplate'
import MinimalTemplate from './MinimalTemplate'

const TEMPLATE_COMPONENTS = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
}

function TemplateRenderer({ resume, layout, ref }) {
  const SelectedTemplate = TEMPLATE_COMPONENTS[layout] || ClassicTemplate

  return (
    <div ref={ref}>
      <SelectedTemplate resume={resume} />
    </div>
  )
}

export default TemplateRenderer

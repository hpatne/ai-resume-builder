// Picks the right template design for a resume.
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

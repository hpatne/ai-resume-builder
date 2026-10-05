// Wizard step 2: choose a template.
import TemplateCard from '../TemplateCard'

function StepTemplate({ templates, selectedTemplateId, onSelect, recommendedIds, previewResume, companyName }) {
  // Recommended templates first
  const getRank = (templateId) => (recommendedIds.includes(templateId) ? recommendedIds.indexOf(templateId) : recommendedIds.length)
  const sortedTemplates = [...templates].sort((first, second) => getRank(first.id) - getRank(second.id))

  return (
    <div>
      <p className="mb-4 text-[15px] text-ink-soft">
        Recommended templates match how {companyName} and similar employers like resumes laid out. You can change the
        template later in the editor without losing any content.
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-5">
        {sortedTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            sampleResume={previewResume}
            isRecommended={recommendedIds.includes(template.id)}
            isSelected={template.id === selectedTemplateId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default StepTemplate

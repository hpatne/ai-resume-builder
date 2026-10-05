// Found and missing keywords from the job description.
import KeywordChips from '../KeywordChips'

function KeywordResults({ hardSkills, otherKeywords }) {
  const groups = [
    { title: 'Hard skills', keywords: hardSkills },
    { title: 'Other keywords', keywords: otherKeywords },
  ].filter((group) => group.keywords.length > 0)

  return (
    <div className="space-y-5">
      {groups.map(({ title, keywords }) => (
        <div key={title}>
          <h3 className="mb-2 flex items-baseline justify-between gap-3">
            <span className="font-bold">{title}</span>
            <span className="tabular text-sm font-semibold text-ink-soft">
              {keywords.filter((keyword) => keyword.matched).length} of {keywords.length} found
            </span>
          </h3>
          <KeywordChips keywords={[...keywords].sort((first, second) => Number(first.matched) - Number(second.matched))} />
        </div>
      ))}
    </div>
  )
}

export default KeywordResults

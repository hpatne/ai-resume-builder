// Editor form for education.
import EntryListEditor from './EntryListEditor'
import { createId } from '../../utils/mockApi'

const EDUCATION_FIELDS = [
  { name: 'degree', label: 'Degree', wide: true },
  { name: 'institution', label: 'College / university' },
  { name: 'location', label: 'City' },
  { name: 'startYear', label: 'Start year' },
  { name: 'endYear', label: 'End year' },
  { name: 'score', label: 'CGPA or percentage', placeholder: 'e.g. CGPA 8.6 / 10', wide: true },
]

function EducationForm({ value, onChange }) {
  return (
    <EntryListEditor
      entries={value}
      onChange={onChange}
      fields={EDUCATION_FIELDS}
      entryName="education"
      getEntryTitle={(entry) => entry.degree}
      createEmptyEntry={() => ({ id: createId('edu'), degree: '', institution: '', location: '', startYear: '', endYear: '', score: '' })}
    />
  )
}

export default EducationForm

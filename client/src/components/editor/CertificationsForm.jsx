// Editor form for certifications.
import EntryListEditor from './EntryListEditor'
import { createId } from '../../utils/mockApi'

const CERTIFICATION_FIELDS = [
  { name: 'name', label: 'Certification', wide: true },
  { name: 'issuer', label: 'Issued by', placeholder: 'e.g. NPTEL' },
  { name: 'year', label: 'Year' },
]

function CertificationsForm({ value, onChange }) {
  return (
    <EntryListEditor
      entries={value}
      onChange={onChange}
      fields={CERTIFICATION_FIELDS}
      entryName="certification"
      getEntryTitle={(entry) => entry.name}
      createEmptyEntry={() => ({ id: createId('cert'), name: '', issuer: '', year: '' })}
    />
  )
}

export default CertificationsForm

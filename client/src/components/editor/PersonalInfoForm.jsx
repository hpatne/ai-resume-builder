// Editor form for name and contact details.
import Input from '../Input'

const PERSONAL_FIELDS = [
  { name: 'fullName', label: 'Full name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { name: 'location', label: 'City', placeholder: 'e.g. Mumbai, Maharashtra' },
  { name: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/your-name' },
  { name: 'portfolio', label: 'GitHub / portfolio', placeholder: 'github.com/your-name' },
]

function PersonalInfoForm({ value, onChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PERSONAL_FIELDS.map((field) => (
        <Input
          key={field.name}
          id={`personal-${field.name}`}
          label={field.label}
          type={field.type || 'text'}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          value={value[field.name] || ''}
          onChange={(event) => onChange({ ...value, [field.name]: event.target.value })}
        />
      ))}
    </div>
  )
}

export default PersonalInfoForm

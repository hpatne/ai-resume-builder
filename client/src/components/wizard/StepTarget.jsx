// Wizard step 1: choose the target company and role.
import Autocomplete from '../Autocomplete'
import CompanyInsight from './CompanyInsight'

function StepTarget({ target, onTargetChange, companies, roles, errors, company, role, templateName }) {
  const companyOptions = companies.map((item) => ({ id: item.id, label: item.name, meta: item.type }))
  const roleOptions = roles.map((item) => ({ id: item.id, label: item.title, meta: item.category }))
  const hasTarget = target.companyName.trim() && target.roleTitle.trim()

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Autocomplete
          id="target-company"
          label="Target company"
          value={target.companyName}
          options={companyOptions}
          placeholder="e.g. Nimbus Labs"
          hint="Pick a sample company or type any other company name."
          error={errors.companyName}
          // Typing clears the id, so the text can be a custom company
          onTextChange={(text) => onTargetChange({ ...target, companyName: text, companyId: '' })}
          onSelect={(option) => onTargetChange({ ...target, companyName: option.label, companyId: option.id })}
        />
        <Autocomplete
          id="target-role"
          label="Job role"
          value={target.roleTitle}
          options={roleOptions}
          placeholder="e.g. Frontend Developer"
          hint="Pick a role or type your own."
          error={errors.roleTitle}
          onTextChange={(text) => onTargetChange({ ...target, roleTitle: text, roleId: '' })}
          onSelect={(option) => onTargetChange({ ...target, roleTitle: option.label, roleId: option.id })}
        />
      </div>

      {hasTarget && <CompanyInsight company={company} role={role} templateName={templateName} />}
    </div>
  )
}

export default StepTarget

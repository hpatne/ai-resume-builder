/*
 * TemplateForm.jsx
 * Add / edit a template (admin). A template reuses one of the three built-in
 * layouts and says which company types, industries and roles it suits; those
 * drive the gallery filters and the wizard's "Recommended" stamp.
 */
import { useState } from 'react'
import Modal from '../Modal'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import TextArea from '../TextArea'
import { textToList, listToText } from '../../utils/listText'

const LAYOUT_OPTIONS = [
  { value: 'classic', label: 'Classic layout' },
  { value: 'modern', label: 'Modern layout' },
  { value: 'minimal', label: 'Minimal layout' },
]

function TemplateForm({ template, roles, onSave, onCancel, isSaving }) {
  const [formValues, setFormValues] = useState({
    name: template?.name || '',
    layout: template?.layout || 'classic',
    description: template?.description || '',
    companyTypesText: listToText(template?.companyTypes),
    industriesText: listToText(template?.industries),
    roleIds: template?.roles || [],
  })
  const [nameError, setNameError] = useState('')

  const handleChange = (event) => setFormValues({ ...formValues, [event.target.name]: event.target.value })

  // Tick / untick a role
  const toggleRole = (roleId) => {
    const roleIds = formValues.roleIds.includes(roleId) ? formValues.roleIds.filter((id) => id !== roleId) : [...formValues.roleIds, roleId]
    setFormValues({ ...formValues, roleIds })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formValues.name.trim()) {
      setNameError('Enter the template name.')
      return
    }
    onSave({
      ...template,
      name: formValues.name.trim(),
      layout: formValues.layout,
      description: formValues.description.trim(),
      companyTypes: textToList(formValues.companyTypesText),
      industries: textToList(formValues.industriesText),
      roles: formValues.roleIds,
    })
  }

  return (
    <Modal
      title={template ? `Edit ${template.name}` : 'Add template'}
      size="lg"
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit" form="template-form" loading={isSaving}>Save template</Button>
        </>
      }
    >
      <form id="template-form" noValidate onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <Input id="template-name" name="name" label="Template name" value={formValues.name} onChange={handleChange} error={nameError} required />
        <Select id="template-layout" name="layout" label="Layout" value={formValues.layout} onChange={handleChange} options={LAYOUT_OPTIONS} />
        <TextArea id="template-description" name="description" label="Description" rows={2} className="sm:col-span-2" value={formValues.description} onChange={handleChange} />
        <Input id="template-company-types" name="companyTypesText" label="Best for company types" hint="Separate with commas." value={formValues.companyTypesText} onChange={handleChange} />
        <Input id="template-industries" name="industriesText" label="Industries" hint="Separate with commas." value={formValues.industriesText} onChange={handleChange} />
        <fieldset className="sm:col-span-2">
          <legend className="mb-1.5 text-sm font-semibold">Recommended for roles</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {roles.map((role) => (
              <label key={role.id} className="flex items-center gap-2.5 text-[15px]">
                <input type="checkbox" checked={formValues.roleIds.includes(role.id)} onChange={() => toggleRole(role.id)} className="size-4" />
                {role.title}
              </label>
            ))}
          </div>
        </fieldset>
      </form>
    </Modal>
  )
}

export default TemplateForm

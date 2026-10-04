/*
 * ManageCompaniesPage.jsx  (route: /admin/companies, admin only)
 * Table of company profiles with add / edit / delete (deliverables D6, D8).
 * Each profile's preferred template, section order, emphasis and keywords
 * change what the wizard, editor and ATS checker show for that company.
 */
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCatalog } from '../../context/CatalogContext'
import { useToast } from '../../context/ToastContext'
import { saveCompany, deleteCompany } from '../../services/catalogService'
import { SECTION_LABELS } from '../../data/sections'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import StatusStamp from '../../components/StatusStamp'
import ConfirmDialog from '../../components/ConfirmDialog'
import DataTable from '../../components/admin/DataTable'
import CompanyForm from '../../components/admin/CompanyForm'

function ManageCompaniesPage() {
  const { companies, templates, setCompanies } = useCatalog()
  const { showToast } = useToast()
  // editingCompany: null = form closed, {} = adding new, a company = editing it
  const [editingCompany, setEditingCompany] = useState(null)
  const [companyToDelete, setCompanyToDelete] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (company) => {
    setIsSaving(true)
    setCompanies(await saveCompany(company))
    setIsSaving(false)
    setEditingCompany(null)
    showToast(`Saved ${company.name}. The wizard and editor now use this profile.`)
  }

  const handleDelete = async () => {
    const { id, name } = companyToDelete
    setCompanyToDelete(null)
    setCompanies(await deleteCompany(id))
    showToast(`Deleted ${name}.`)
  }

  const columns = [
    {
      key: 'name',
      label: 'Company',
      render: (company) => (
        <div>
          <p className="font-semibold">{company.name}</p>
          <p className="text-sm text-ink-faint">{company.type} · {company.industry}</p>
          {company.isSample && <StatusStamp className="mt-1">Sample</StatusStamp>}
        </div>
      ),
    },
    { key: 'preferredTemplate', label: 'Template', render: (company) => templates.find((template) => template.id === company.preferredTemplate)?.name || '–' },
    { key: 'emphasis', label: 'Emphasis', render: (company) => (company.emphasis === 'projects' ? 'Projects' : 'Experience') },
    { key: 'sectionOrder', label: 'Section order', render: (company) => <span className="text-sm">{company.sectionOrder.map((key) => SECTION_LABELS[key]).join(' → ')}</span> },
    { key: 'keywords', label: 'Keywords', render: (company) => <span className="text-sm">{company.keywords.join(', ')}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Manage companies"
        description="Company profiles decide the recommended template, section order, emphasis and keywords."
        actions={<Button onClick={() => setEditingCompany({})}><Plus size={18} aria-hidden="true" /> Add company</Button>}
      />
      <DataTable caption="Companies" columns={columns} rows={companies} onEdit={setEditingCompany} onDelete={setCompanyToDelete} getRowName={(company) => company.name} />

      {editingCompany && (
        <CompanyForm company={editingCompany.id ? editingCompany : null} templates={templates} onSave={handleSave} onCancel={() => setEditingCompany(null)} isSaving={isSaving} />
      )}
      {companyToDelete && (
        <ConfirmDialog
          title="Delete this company?"
          message={`${companyToDelete.name} will be removed from the wizard. Existing resumes keep their target name but fall back to a general format.`}
          confirmLabel="Delete company"
          onConfirm={handleDelete}
          onCancel={() => setCompanyToDelete(null)}
        />
      )}
    </>
  )
}

export default ManageCompaniesPage

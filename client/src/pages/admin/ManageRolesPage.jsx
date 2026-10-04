/*
 * ManageRolesPage.jsx  (route: /admin/roles, admin only)
 * Table of job roles with add / edit / delete (deliverables D6, D8).
 * A role's required skills and keywords drive the AI draft, the keyword
 * panel and the ATS score.
 */
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useCatalog } from '../../context/CatalogContext'
import { useToast } from '../../context/ToastContext'
import { saveRole, deleteRole } from '../../services/catalogService'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import ConfirmDialog from '../../components/ConfirmDialog'
import DataTable from '../../components/admin/DataTable'
import RoleForm from '../../components/admin/RoleForm'

function ManageRolesPage() {
  const { roles, setRoles } = useCatalog()
  const { showToast } = useToast()
  // editingRole: null = form closed, {} = adding new, a role = editing it
  const [editingRole, setEditingRole] = useState(null)
  const [roleToDelete, setRoleToDelete] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (role) => {
    setIsSaving(true)
    setRoles(await saveRole(role))
    setIsSaving(false)
    setEditingRole(null)
    showToast(`Saved ${role.title}.`)
  }

  const handleDelete = async () => {
    const { id, title } = roleToDelete
    setRoleToDelete(null)
    setRoles(await deleteRole(id))
    showToast(`Deleted ${title}.`)
  }

  const columns = [
    { key: 'title', label: 'Role', render: (role) => <p className="font-semibold">{role.title}</p> },
    { key: 'category', label: 'Category' },
    { key: 'requiredSkills', label: 'Required skills', render: (role) => <span className="text-sm">{role.requiredSkills.join(', ')}</span> },
    { key: 'keywords', label: 'Keywords', render: (role) => <span className="text-sm">{role.keywords.join(', ')}</span> },
  ]

  return (
    <>
      <PageHeader
        title="Manage roles"
        description="Each role's skills and keywords shape the AI draft, the keyword panel and the ATS score."
        actions={<Button onClick={() => setEditingRole({})}><Plus size={18} aria-hidden="true" /> Add role</Button>}
      />
      <DataTable caption="Job roles" columns={columns} rows={roles} onEdit={setEditingRole} onDelete={setRoleToDelete} getRowName={(role) => role.title} />

      {editingRole && <RoleForm role={editingRole.id ? editingRole : null} onSave={handleSave} onCancel={() => setEditingRole(null)} isSaving={isSaving} />}
      {roleToDelete && (
        <ConfirmDialog
          title="Delete this role?"
          message={`${roleToDelete.title} will be removed from the wizard. Existing resumes keep their role name.`}
          confirmLabel="Delete role"
          onConfirm={handleDelete}
          onCancel={() => setRoleToDelete(null)}
        />
      )}
    </>
  )
}

export default ManageRolesPage

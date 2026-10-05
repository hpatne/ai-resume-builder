// Mock storage for companies, roles and templates.
import seedCompanies from '../data/companies'
import seedRoles from '../data/roles'
import seedTemplates from '../data/templates'
import { loadCollection, saveToStorage } from '../utils/storage'
import { simulateRequest, createId } from '../utils/mockApi'

const SEED_DATA = { companies: seedCompanies, roles: seedRoles, templates: seedTemplates }
const ID_PREFIXES = { companies: 'company', roles: 'role', templates: 'template' }

function readCollection(collectionName) {
  return loadCollection(collectionName, SEED_DATA[collectionName])
}

// Adds a new item, or replaces the one with the same id
function saveItem(collectionName, item) {
  const items = readCollection(collectionName)
  const isNew = !item.id || !items.some((existing) => existing.id === item.id)
  const savedItem = isNew ? { ...item, id: item.id || createId(ID_PREFIXES[collectionName]) } : item
  const updatedItems = isNew ? [...items, savedItem] : items.map((existing) => (existing.id === item.id ? savedItem : existing))
  saveToStorage(collectionName, updatedItems)
  return simulateRequest(updatedItems, 400)
}

function deleteItem(collectionName, itemId) {
  const updatedItems = readCollection(collectionName).filter((item) => item.id !== itemId)
  saveToStorage(collectionName, updatedItems)
  return simulateRequest(updatedItems, 350)
}

export function getCatalog() {
  // TODO (Phase 2): replace mock with real API call to the Express backend
  return simulateRequest(
    { companies: readCollection('companies'), roles: readCollection('roles'), templates: readCollection('templates') },
    250
  )
}

// TODO (Phase 2): replace mock with real API call to the Express backend (admin only)
export const saveCompany = (company) => saveItem('companies', company)
export const deleteCompany = (companyId) => deleteItem('companies', companyId)
export const saveRole = (role) => saveItem('roles', role)
export const deleteRole = (roleId) => deleteItem('roles', roleId)
export const saveTemplate = (template) => saveItem('templates', template)
export const deleteTemplate = (templateId) => deleteItem('templates', templateId)

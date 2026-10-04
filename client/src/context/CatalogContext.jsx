/*
 * CatalogContext.jsx
 * Shares the catalog (companies, roles, templates) with every page.
 * It is loaded once when the app starts. When an admin edits a company, role or
 * template, the Manage page calls setCompanies/setRoles/setTemplates so the
 * wizard, editor and ATS checker see the change immediately.
 * Usage: const { companies, roles, templates } = useCatalog()
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCatalog } from '../services/catalogService'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const [catalog, setCatalog] = useState({ companies: [], roles: [], templates: [] })
  const [isCatalogLoading, setIsCatalogLoading] = useState(true)

  // Load the catalog once from the (mock) API
  useEffect(() => {
    getCatalog().then((loadedCatalog) => {
      setCatalog(loadedCatalog)
      setIsCatalogLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({
      ...catalog,
      isCatalogLoading,
      setCompanies: (companies) => setCatalog((current) => ({ ...current, companies })),
      setRoles: (roles) => setCatalog((current) => ({ ...current, roles })),
      setTemplates: (templates) => setCatalog((current) => ({ ...current, templates })),
    }),
    [catalog, isCatalogLoading]
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  return useContext(CatalogContext)
}

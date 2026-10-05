// Search box and company/role filters on the dashboard.
import { Search } from 'lucide-react'
import Select from './Select'

function ResumeFilters({ filters, onChange, companyNames, roleTitles }) {
  const updateFilter = (field) => (event) => onChange({ ...filters, [field]: event.target.value })

  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_200px_200px]">
      <div className="relative">
        <label htmlFor="resume-search" className="sr-only">Search resumes</label>
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-faint" />
        <input
          id="resume-search"
          type="search"
          value={filters.search}
          onChange={updateFilter('search')}
          placeholder="Search by title, company or role"
          className="h-10 w-full rounded-md border border-line-strong bg-paper pr-3 pl-10 text-[15px] placeholder:text-ink-faint hover:border-ink-faint"
        />
      </div>
      <Select
        id="filter-company"
        label="Filter by company"
        hideLabel
        value={filters.company}
        onChange={updateFilter('company')}
        options={[{ value: '', label: 'All companies' }, ...companyNames.map((name) => ({ value: name, label: name }))]}
      />
      <Select
        id="filter-role"
        label="Filter by role"
        hideLabel
        value={filters.role}
        onChange={updateFilter('role')}
        options={[{ value: '', label: 'All roles' }, ...roleTitles.map((title) => ({ value: title, label: title }))]}
      />
    </div>
  )
}

export default ResumeFilters

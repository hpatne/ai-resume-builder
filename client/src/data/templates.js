/*
 * templates.js
 * SAMPLE DATA: resume templates shown in the gallery and the wizard.
 * `layout` picks which React template component draws it (Classic, Modern or
 * Minimal in components/templates/). All three are single-column and ATS-safe:
 * real text, standard headings, no tables, images or text inside graphics.
 * `companyTypes`, `industries` and `roles` power the gallery filters and the
 * "recommended" badge in the wizard. Admins manage these on /admin/templates.
 * TODO (Phase 2): replace mock with real API call to the Express backend
 */
const templates = [
  {
    id: 'classic',
    name: 'Classic',
    layout: 'classic',
    description: 'Serif type with ruled section headings. Conservative, formal and easy for any ATS to parse.',
    companyTypes: ['Service-based', 'Consulting', 'Finance'],
    industries: ['IT Services & Consulting', 'Management & Technology Consulting', 'Banking & Financial Services'],
    roles: ['software-engineer', 'backend-developer', 'data-analyst'],
  },
  {
    id: 'modern',
    name: 'Modern',
    layout: 'modern',
    description: 'Clean sans-serif with a navy name band and skill tags. Suits product companies and startups.',
    companyTypes: ['Product-based', 'Startup'],
    industries: ['Technology (SaaS)', 'Consumer Tech'],
    roles: ['frontend-developer', 'full-stack-developer', 'ui-ux-designer'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    layout: 'minimal',
    description: 'Compact, dense single column with small-caps headings. Fits more on one page without clutter.',
    companyTypes: ['Finance', 'Product-based'],
    industries: ['Banking & Financial Services', 'Technology (SaaS)'],
    roles: ['data-analyst', 'software-engineer', 'backend-developer'],
  },
]

export default templates

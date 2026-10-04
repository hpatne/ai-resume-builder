# ER Diagram

> **Status: To be completed in Phase 2** (alongside the MongoDB schema design).

Planned entities, based on the shapes already used by the Phase 1 mock data (`client/src/data/`):

- **User** (id, name, email, passwordHash, role, createdAt)
- **Resume** (id, userId → User, title, companyId → Company, roleId → Role, templateId → Template, sectionOrder, personal, summary, skills, experience[], education[], projects[], certifications[], atsScore, timestamps)
- **Company** (id, name, type, industry, preferredTemplate → Template, emphasis, sectionOrder, keywords, focus, summaryLine)
- **Role** (id, title, category, requiredSkills, keywords, sampleSummary, experienceBullets, projects, certifications)
- **Template** (id, name, layout, description, companyTypes, industries, roles → Role[])

Relationships: User 1–N Resume; Resume N–1 Company; Resume N–1 Role; Resume N–1 Template; Company N–1 Template (preferred); Template N–M Role (recommended for).

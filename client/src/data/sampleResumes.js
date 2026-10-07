// Sample resumes so the demo account has data. "Reset demo data" (admin) brings these back.
// ATS scores are worked out by the real scoring function, not typed in.
import sampleJobDescriptions from './sampleJobDescriptions'
import { findSkillsInText } from '../utils/jobDescription'
import { calculateAtsScore } from '../utils/atsScore'

const demoPersonal = {
  fullName: 'Aarav Sharma',
  email: 'demo@resumeai.dev',
  phone: '+91 98200 12345',
  location: 'Mumbai, Maharashtra',
  linkedin: 'linkedin.com/in/aarav-sharma-demo',
  portfolio: 'github.com/aarav-demo',
}

const demoEducation = [
  {
    id: 'edu-1',
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Vidyanagar Institute of Technology (sample)',
    location: 'Mumbai',
    startYear: '2023',
    endYear: '2027',
    score: 'CGPA 8.6 / 10',
  },
]

const demoExperience = [
  {
    id: 'exp-1',
    jobTitle: 'Web Developer Intern',
    company: 'Brightpath Software (sample)',
    location: 'Remote',
    startDate: 'May 2026',
    endDate: 'Jul 2026',
    bullets:
      'Built 12 reusable React components for an internal dashboard, cutting new-page development time by 30%\nImproved the Lighthouse performance score from 62 to 91 by lazy-loading images and splitting bundles\nFixed 40+ cross-browser and accessibility issues reported during testing',
  },
]

const demoProjects = [
  {
    id: 'proj-1',
    name: 'Campus Events Portal',
    techStack: 'React, Node.js, Express, MongoDB',
    link: 'github.com/aarav-demo/campus-events',
    bullets:
      'Built a portal used by 800+ students to find and register for college events\nDeveloped REST APIs for events, sign-ups and admin approval with JWT login\nAdded search and filters that return results in under 100 ms',
  },
  {
    id: 'proj-2',
    name: 'Expense Tracker',
    techStack: 'React, Firebase, Chart.js',
    link: 'github.com/aarav-demo/expense-tracker',
    bullets: 'Built a responsive app to log daily spending, used by 50 friends and classmates\nCreated monthly charts that show spending by category',
  },
  {
    id: 'proj-3',
    name: 'Railway Reservation Simulator',
    techStack: 'Java, OOP',
    link: '',
    bullets: 'Modelled trains, coaches and bookings with classes and interfaces\nImplemented waitlist confirmation for 3 coach types using a priority queue',
  },
]

const demoCertifications = [
  { id: 'cert-1', name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2025' },
  { id: 'cert-2', name: 'Programming in Java', issuer: 'NPTEL', year: '2025' },
]

const frontendJob = sampleJobDescriptions['frontend-developer']

const sampleResumes = [
  // 1. Complete fresher resume (made with the create form, no job description yet)
  {
    id: 'r-aarav-main',
    userId: 'u-demo',
    title: 'Software Engineer – Main resume',
    companyId: '',
    companyName: '',
    roleId: 'software-engineer',
    roleTitle: 'Software Engineer',
    templateId: 'classic',
    sectionOrder: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
    personal: demoPersonal,
    summary:
      'B.Tech in Computer Science and Engineering student graduating in 2027, applying for Software Engineer roles. Skilled in JavaScript, React, Node.js, Java and SQL. Key project: Campus Events Portal, a web app used by 800+ students. Worked as Web Developer Intern at Brightpath Software. Looking to apply these skills to real problems and keep learning.',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Java', 'Python', 'SQL', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'Data Structures', 'REST APIs'],
    experience: demoExperience,
    education: demoEducation,
    projects: demoProjects,
    certifications: demoCertifications,
    jobDescription: '',
    jobSkills: [],
    createdVia: 'form',
    atsScore: 'calculate',
    createdAt: '2026-09-25T09:00:00.000Z',
    updatedAt: '2026-10-02T18:20:00.000Z',
  },
  // 2. Copy of resume 1, tailored for a Frontend Developer job ("Tailor for a new job")
  {
    id: 'r-aarav-frontend',
    userId: 'u-demo',
    title: 'Nimbus Labs – Frontend Developer',
    companyId: 'nimbus-labs',
    companyName: 'Nimbus Labs',
    roleId: 'frontend-developer',
    roleTitle: 'Frontend Developer',
    templateId: 'modern',
    sectionOrder: ['summary', 'skills', 'projects', 'experience', 'education', 'certifications'],
    personal: demoPersonal,
    summary:
      'B.Tech in Computer Science and Engineering student graduating in 2027, applying for the Frontend Developer role at Nimbus Labs. Skilled in JavaScript, React, HTML, CSS and Tailwind CSS. Key project: Campus Events Portal (React, Node.js, Express, MongoDB). Built a portal used by 800+ students to find and register for college events. Worked as Web Developer Intern at Brightpath Software.',
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind CSS', 'REST APIs', 'Git', 'Data Structures', 'Node.js', 'Express', 'MongoDB', 'Java', 'Python', 'SQL'],
    experience: demoExperience,
    education: demoEducation,
    projects: demoProjects,
    certifications: demoCertifications,
    jobDescription: frontendJob,
    jobSkills: findSkillsInText(frontendJob),
    createdVia: 'form',
    tailoredFrom: 'r-aarav-main',
    atsScore: 'calculate',
    createdAt: '2026-10-03T10:00:00.000Z',
    updatedAt: '2026-10-03T10:05:00.000Z',
  },
  {
    id: 'r-priya-sprintly',
    userId: 'u-priya',
    title: 'Sprintly – Full Stack Developer',
    companyId: 'sprintly',
    companyName: 'Sprintly',
    roleId: 'full-stack-developer',
    roleTitle: 'Full Stack Developer',
    templateId: 'modern',
    sectionOrder: ['summary', 'projects', 'skills', 'experience', 'education', 'certifications'],
    personal: { fullName: 'Priya Nair', email: 'priya@example.com', phone: '+91 90000 11111', location: 'Kochi, Kerala', linkedin: '', portfolio: '' },
    summary: 'Full stack developer who ships end-to-end MERN applications.',
    skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    experience: [],
    education: [{ id: 'edu-1', degree: 'B.Tech in Information Technology', institution: 'Coastal College of Engineering (sample)', location: 'Kochi', startYear: '2022', endYear: '2026', score: 'CGPA 8.9 / 10' }],
    projects: [],
    certifications: [],
    atsScore: 'calculate',
    createdAt: '2026-09-05T10:00:00.000Z',
    updatedAt: '2026-09-30T10:00:00.000Z',
  },
  {
    id: 'r-rohan-meridian',
    userId: 'u-rohan',
    title: 'Meridian Advisory – Data Analyst',
    companyId: 'meridian-advisory',
    companyName: 'Meridian Advisory',
    roleId: 'data-analyst',
    roleTitle: 'Data Analyst',
    templateId: 'classic',
    sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills', 'certifications'],
    personal: { fullName: 'Rohan Mehta', email: 'rohan@example.com', phone: '+91 90000 22222', location: 'Ahmedabad, Gujarat', linkedin: '', portfolio: '' },
    summary: 'Analytical graduate with SQL and Excel skills.',
    skills: ['SQL', 'Excel', 'Statistics'],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    atsScore: null,
    createdAt: '2026-09-22T10:00:00.000Z',
    updatedAt: '2026-09-22T10:00:00.000Z',
  },
]

// Work out each 'calculate' score with the real ATS function
export default sampleResumes.map((resume) =>
  resume.atsScore === 'calculate' ? { ...resume, atsScore: calculateAtsScore(resume, resume.jobDescription).score, atsCheckedAt: resume.updatedAt } : resume
)

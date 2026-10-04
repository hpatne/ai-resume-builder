/*
 * LoginPage.jsx  (route: /login)
 * Log in form with validation, password show/hide and demo-account shortcuts.
 * Deliverable D4 (authentication). After login, users go back to the page they
 * tried to open, or to their dashboard (admins go to the admin dashboard).
 */
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateLoginForm, hasErrors } from '../utils/validation'
import Input from '../components/Input'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'
import FormAlert from '../components/FormAlert'
import AuthAside from '../components/AuthAside'

// Mock accounts from data/users.js, offered as one-click fill buttons for the demo
const DEMO_ACCOUNTS = [
  { label: 'Fill demo user', email: 'demo@resumeai.dev', password: 'demo1234' },
  { label: 'Fill admin', email: 'admin@resumeai.dev', password: 'admin1234' },
]

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // ---- Form state ----
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update one field and clear its error message
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  // Validate, then call the (mock) login; on success go to the right page
  const handleLogin = async (event) => {
    event.preventDefault()
    const validationErrors = validateLoginForm(formValues)
    setErrors(validationErrors)
    setFormError('')
    if (hasErrors(validationErrors)) return

    setIsSubmitting(true)
    try {
      const loggedInUser = await login(formValues.email, formValues.password)
      const defaultPage = loggedInUser.role === 'admin' ? '/admin' : '/dashboard'
      navigate(location.state?.from || defaultPage, { replace: true })
    } catch (error) {
      setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[1fr_minmax(0,520px)]">
      <section className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-board text-4xl font-bold">Log in</h1>
          <p className="mt-1.5 mb-7 text-[15px] text-ink-soft">Welcome back. Your resumes are where you left them.</p>

          <FormAlert message={formError} />

          <form noValidate onSubmit={handleLogin} className="space-y-4">
            <Input id="email" name="email" type="email" label="Email" autoComplete="email" value={formValues.email} onChange={handleChange} error={errors.email} required />
            <PasswordInput id="password" name="password" label="Password" autoComplete="current-password" value={formValues.password} onChange={handleChange} error={errors.password} required />
            <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
              Log in
            </Button>
          </form>

          {/* Demo accounts (mock data) to make the review demo quick */}
          <div className="mt-6 rounded-md border border-dashed border-line-strong bg-paper p-4">
            <p className="text-sm font-semibold">Demo accounts</p>
            <p className="mt-0.5 text-sm text-ink-faint">demo@resumeai.dev / demo1234 · admin@resumeai.dev / admin1234</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <Button key={account.email} variant="secondary" size="sm" onClick={() => setFormValues({ email: account.email, password: account.password })}>
                  {account.label}
                </Button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[15px] text-ink-soft">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-navy underline">
              Create an account
            </Link>
          </p>
        </div>
      </section>
      <AuthAside />
    </div>
  )
}

export default LoginPage

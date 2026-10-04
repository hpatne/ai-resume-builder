/*
 * validation.js
 * Form validation rules. Each function returns an `errors` object such as
 * { email: 'Enter a valid email address' }; an empty string means "no error".
 * Used by: Login, Signup, Profile (edit profile + change password), create wizard.
 * The Phase 2 backend will repeat these checks on the server.
 */
export const PASSWORD_MIN_LENGTH = 8

// something@something.something
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(email) {
  if (!email.trim()) return 'Enter your email address.'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Enter a valid email address, like name@example.com.'
  return ''
}

export function validateNewPassword(password) {
  if (!password) return 'Enter a password.'
  if (password.length < PASSWORD_MIN_LENGTH) return `Use at least ${PASSWORD_MIN_LENGTH} characters.`
  return ''
}

export function validateLoginForm({ email, password }) {
  return {
    email: validateEmail(email),
    password: password ? '' : 'Enter your password.',
  }
}

export function validateSignupForm({ name, email, password, confirmPassword }) {
  return {
    name: name.trim().length >= 2 ? '' : 'Enter your full name.',
    email: validateEmail(email),
    password: validateNewPassword(password),
    confirmPassword: !confirmPassword
      ? 'Type your password again.'
      : confirmPassword !== password
        ? 'Passwords do not match.'
        : '',
  }
}

export function validateProfileForm({ name, email }) {
  return {
    name: name.trim().length >= 2 ? '' : 'Enter your full name.',
    email: validateEmail(email),
  }
}

export function validatePasswordChange({ currentPassword, newPassword, confirmPassword }) {
  return {
    currentPassword: currentPassword ? '' : 'Enter your current password.',
    newPassword: validateNewPassword(newPassword),
    confirmPassword: confirmPassword === newPassword ? '' : 'Passwords do not match.',
  }
}

// Fields every target (wizard step 1) and basics form (step 3) must have
export function validateRequiredFields(values, requiredFieldLabels) {
  const errors = {}
  Object.entries(requiredFieldLabels).forEach(([field, label]) => {
    errors[field] = String(values[field] || '').trim() ? '' : `Enter ${label}.`
  })
  return errors
}

// True if any field has an error message
export function hasErrors(errors) {
  return Object.values(errors).some(Boolean)
}

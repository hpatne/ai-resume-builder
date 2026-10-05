// Password field with a show/hide button.
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Input from './Input'

function PasswordInput(props) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleButton = (
    <button
      type="button"
      onClick={() => setIsVisible(!isVisible)}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      aria-pressed={isVisible}
      className="grid size-9 place-items-center rounded text-ink-soft hover:bg-ink/5 hover:text-ink"
    >
      {isVisible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
    </button>
  )

  return <Input {...props} type={isVisible ? 'text' : 'password'} endAdornment={toggleButton} />
}

export default PasswordInput

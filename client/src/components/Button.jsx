/*
 * Button.jsx
 * The one button component used across the app, so every button looks and
 * behaves the same. Pass `to` to render a router link styled as a button.
 * Variants: primary (navy), board (station-board yellow, main call to action),
 * secondary (outlined), ghost (text only), danger (maroon, destructive actions).
 */
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

const VARIANT_CLASSES = {
  primary: 'bg-navy text-white border-navy hover:bg-navy-soft',
  board: 'bg-board text-ink border-ink hover:bg-[#ffd13d]',
  secondary: 'bg-paper text-ink border-line-strong hover:border-ink',
  ghost: 'bg-transparent text-ink-soft border-transparent hover:bg-ink/5 hover:text-ink',
  danger: 'bg-maroon text-white border-maroon hover:bg-[#721f16]',
}

const SIZE_CLASSES = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-[15px]',
  lg: 'h-12 gap-2 px-6 text-base',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'inline-flex shrink-0 items-center justify-center rounded-md border font-semibold whitespace-nowrap',
    'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(' ')

  // Router link that looks like a button
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  // Normal button; while loading it is disabled and shows a spinner
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Spinner size={16} label="Working" />}
      {children}
    </button>
  )
}

export default Button

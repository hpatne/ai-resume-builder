/*
 * ToastContext.jsx
 * Global toast notifications. Any component can call:
 *   const { showToast } = useToast()
 *   showToast('Resume saved')                       // green success
 *   showToast('Something failed', 'error')          // red error
 *   showToast('Summary improved', 'success', { actionLabel: 'Undo', onAction: undoFn })
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Remove one toast from the list
  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  // Add a toast and remove it automatically after a few seconds
  // (longer when it has an action button, so the user has time to click it)
  const showToast = useCallback(
    (message, type = 'success', options = {}) => {
      const id = `${Date.now()}-${Math.random()}`
      setToasts((currentToasts) => [...currentToasts, { id, message, type, ...options }])
      setTimeout(() => dismissToast(id), options.actionLabel ? 8000 : 4000)
    },
    [dismissToast]
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

// Pop-up notifications. Use it with useToast().
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  // Toasts disappear after a few seconds (longer if they have a button)
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

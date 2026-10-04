/*
 * AuthContext.jsx
 * Keeps track of WHO is logged in and shares it with the whole app.
 * Any component can call:
 *   const { user, isAdmin, login, signup, logout, updateUser } = useAuth()
 * ProtectedRoute and AdminRoute read `user` to decide if a page may open.
 * The actual checks happen in services/authService.js (mock for now).
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // true until we know whether someone is already logged in (from a previous visit)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // On app start: restore the saved session, if any
  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser)
      setIsAuthLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthLoading,
      isAdmin: user?.role === 'admin',
      // Each action calls the service, then stores the returned user in state
      login: async (email, password) => {
        const loggedInUser = await authService.login(email, password)
        setUser(loggedInUser)
        return loggedInUser
      },
      signup: async (formValues) => {
        const newUser = await authService.signup(formValues)
        setUser(newUser)
        return newUser
      },
      logout: async () => {
        await authService.logout()
        setUser(null)
      },
      updateUser: (updatedUser) => setUser(updatedUser),
    }),
    [user, isAuthLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

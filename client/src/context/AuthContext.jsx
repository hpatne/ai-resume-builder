// Keeps track of the logged-in user. Use it with useAuth().
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // true until we know if someone is already logged in
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  // Restore a saved login when the app starts
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

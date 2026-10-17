import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"

import * as auth from "@/lib/auth"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => auth.getSession())

  const login = useCallback(async (credentials) => setUser(await auth.login(credentials)), [])
  const signup = useCallback(async (data) => setUser(await auth.signup(data)), [])
  const updateProfile = useCallback(async (changes) => setUser(await auth.updateProfile(user.email, changes)), [user])
  const logout = useCallback(() => {
    auth.logout()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, signup, updateProfile, logout }), [user, login, signup, updateProfile, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

/** Sends logged-out visitors to /login, then back to where they were going. */
export function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

/** Sends logged-in users straight to the dashboard (used on /login and /signup). */
export function GuestOnly({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { UserProfile } from '../types'
import { ApiError, fetchMe, fetchUsers, loginRequest, signupRequest, type SignUpPayload } from '../lib/api'

type SignUpInput = Omit<UserProfile, 'id' | 'createdAt' | 'avatar'> & { password: string }

interface AuthContextValue {
  currentUser: UserProfile | null
  users: UserProfile[]
  loading: boolean
  signUp: (data: SignUpInput) => Promise<{ ok: boolean; error?: string }>
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
  refreshUsers: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const TOKEN_KEY = 'skillnetwork_token'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUsers = async () => {
    try {
      const list = await fetchUsers()
      setUsers(list)
    } catch {
      // Backend may be unreachable — leave whatever list we already have.
    }
  }

  useEffect(() => {
    async function bootstrap() {
      await refreshUsers()

      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        try {
          const user = await fetchMe(token)
          setCurrentUser(user)
        } catch {
          // Token expired/invalid — clear it and fall back to logged-out state.
          localStorage.removeItem(TOKEN_KEY)
        }
      }
      setLoading(false)
    }
    bootstrap()
  }, [])

  const signUp: AuthContextValue['signUp'] = async (data) => {
    const payload: SignUpPayload = {
      name: data.name,
      email: data.email,
      password: data.password,
      bio: data.bio,
      skills: data.skills,
      lookingFor: data.lookingFor,
      github: data.github,
      linkedin: data.linkedin,
      college: data.college,
    }
    try {
      const { token, user } = await signupRequest(payload)
      localStorage.setItem(TOKEN_KEY, token)
      setCurrentUser(user)
      await refreshUsers()
      return { ok: true }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong.'
      return { ok: false, error: message }
    }
  }

  const login: AuthContextValue['login'] = async (email, password) => {
    try {
      const { token, user } = await loginRequest(email, password)
      localStorage.setItem(TOKEN_KEY, token)
      setCurrentUser(user)
      await refreshUsers()
      return { ok: true }
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Something went wrong.'
      return { ok: false, error: message }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ currentUser, users, loading, signUp, login, logout, refreshUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

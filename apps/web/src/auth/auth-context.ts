import { createContext, useContext } from 'react'
import type { SessionUser } from '../lib/api'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export interface AuthContextValue {
  user: SessionUser | null
  status: AuthStatus
  login: (email: string, password: string) => Promise<SessionUser>
  logout: () => Promise<void>
}

// Contexto donde vive la sesión. El componente <AuthProvider> lo rellena.
export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

// Hook para leer la sesión desde cualquier componente: const { user } = useAuth().
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return ctx
}

import { type ReactNode, useEffect, useState } from 'react'
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  type SessionUser,
} from '../lib/api'
import { clearTokens, getRefreshToken, setTokens } from '../lib/tokens'
import { AuthContext, type AuthStatus } from './auth-context'

// Proveedor de sesión: mantiene el usuario actual y expone login/logout.
// Al montar, intenta recuperar la sesión a partir de los tokens guardados.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => {
    async function bootstrap() {
      if (!getRefreshToken()) {
        setStatus('unauthenticated')
        return
      }
      try {
        setUser(await getMe())
        setStatus('authenticated')
      } catch {
        clearTokens()
        setStatus('unauthenticated')
      }
    }
    void bootstrap()
  }, [])

  async function login(email: string, password: string): Promise<SessionUser> {
    const data = await apiLogin(email, password)
    setTokens(data.accessToken, data.refreshToken)
    const sessionUser: SessionUser = {
      sub: data.user.id,
      email: data.user.email,
      role: data.user.role,
      schoolId: data.user.schoolId,
    }
    setUser(sessionUser)
    setStatus('authenticated')
    return sessionUser
  }

  async function logout(): Promise<void> {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      try {
        await apiLogout(refreshToken)
      } catch {
        // Aunque falle la revocación en el servidor, cerramos sesión localmente.
      }
    }
    clearTokens()
    setUser(null)
    setStatus('unauthenticated')
  }

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

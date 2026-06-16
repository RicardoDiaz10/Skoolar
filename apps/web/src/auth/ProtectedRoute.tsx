import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './auth-context'
import { homeForRole } from './roles'

interface Props {
  children: ReactNode
  role?: string // si se indica, exige ese rol concreto
}

// Envuelve rutas privadas:
//  - mientras se comprueba la sesión → pantalla de carga
//  - sin sesión → redirige al login
//  - con sesión pero rol equivocado → redirige a la zona de su rol
export function ProtectedRoute({ children, role }: Props) {
  const { user, status } = useAuth()

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Cargando…
      </div>
    )
  }

  if (status === 'unauthenticated' || !user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  return <>{children}</>
}

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'

// Página provisional para roles cuya vista aún no se ha construido (profesor, alumno).
// Confirma que el login y la protección por rol funcionan, e incluye cerrar sesión.
export default function RolePlaceholder({ area }: { area: string }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Vista de {area}</h1>
      <p className="text-gray-500">
        Sesión iniciada como {user?.email}. Esta vista se construirá más adelante.
      </p>
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

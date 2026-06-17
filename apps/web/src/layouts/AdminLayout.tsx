import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/auth-context'

// Opciones del menú lateral del admin. Por ahora solo el panel; las secciones
// (año escolar, grados, cursos…) se irán añadiendo en los siguientes módulos.
const navItems = [
  { to: '/admin', label: 'Panel', end: true },
  { to: '/admin/anios-escolares', label: 'Años escolares', end: false },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* --- Menú lateral --- */}
      <aside className="flex w-60 flex-col bg-indigo-700 text-indigo-100">
        <div className="px-6 py-5 text-2xl font-bold text-white">Skoolar</div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-indigo-700'
                    : 'text-indigo-100 hover:bg-indigo-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4 text-xs text-indigo-300">Panel de administración</div>
      </aside>

      {/* --- Zona principal --- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Barra superior */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <h1 className="text-lg font-semibold text-gray-800">Administración</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Contenido de cada página (lo inyecta el router) */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

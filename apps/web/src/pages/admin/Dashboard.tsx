import { useAuth } from '../../auth/auth-context'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
      <p className="mt-1 text-gray-500">
        Sesión iniciada como {user?.email}.
      </p>

      <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
        Aquí irá el panel de administración del colegio.
        <br />
        El primer módulo será la gestión del <strong>año escolar</strong>.
      </div>
    </div>
  )
}

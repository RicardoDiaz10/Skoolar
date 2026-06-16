import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import institucionImg from '../assets/institucion.svg'
import { useAuth } from '../auth/auth-context'
import { homeForRole } from '../auth/roles'
import { ApiError } from '../lib/api'

/**
 * Pantalla de inicio de sesión de Skoolar.
 *
 * Layout: rejilla de 6 columnas (formulario 2/6, imagen 4/6).
 * Al iniciar sesión, redirige a la zona correspondiente al rol del usuario.
 */
export default function Login() {
  const { user, status, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Si ya hay sesión, no mostramos el login: vamos directos a su zona.
  if (status === 'authenticated' && user) {
    return <Navigate to={homeForRole(user.role)} replace />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      const sessionUser = await login(email, contrasena)
      navigate(homeForRole(sessionUser.role), { replace: true })
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'No se pudo conectar con el servidor.',
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="grid h-screen grid-cols-6 overflow-hidden">
      {/* --- Columna izquierda (2/6): formulario --- */}
      <div className="col-span-2 flex flex-col justify-center overflow-y-auto bg-white px-10 py-12">
        {/* Marca */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-indigo-700">
            Skoolar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Correo electrónico */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              autoComplete="username"
              required
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contrasena"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Botón ingresar */}
          <button
            type="submit"
            disabled={cargando}
            className="mt-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cargando ? 'Ingresando…' : 'Ingresar'}
          </button>

          {/* Olvidó su contraseña (debajo del botón) */}
          <a
            href="#"
            className="text-center text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
          >
            ¿Olvidó su contraseña?
          </a>
        </form>
      </div>

      {/* --- Columna derecha (4/6): imagen de la institución --- */}
      <div className="relative col-span-4 min-h-0">
        <img
          src={institucionImg}
          alt="Institución"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

import { useState } from 'react'
import institucionImg from '../assets/institucion.svg'

/**
 * Pantalla de inicio de sesión de Skoolar.
 *
 * Layout: rejilla de 6 columnas.
 *   - Izquierda (2/6): formulario de acceso.
 *   - Derecha  (4/6): imagen de la institución.
 *
 * Por ahora el formulario es solo visual: aún no se conecta al backend.
 */
export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: conectar con la API de autenticación (apps/api) en la fase de auth.
    console.log('Intento de ingreso:', { usuario, contrasena })
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
          {/* Usuario */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="usuario"
              className="text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="tu.usuario"
              autoComplete="username"
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
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Botón ingresar */}
          <button
            type="submit"
            className="mt-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300"
          >
            Ingresar
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
      {/* La imagen se posiciona absoluta dentro de la columna: así su tamaño
          natural nunca afecta la altura del layout y siempre llena su 4/6. */}
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

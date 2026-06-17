import { useEffect, useState } from 'react'
import {
  type AcademicYear,
  ApiError,
  activateAcademicYear,
  createAcademicYear,
  deleteAcademicYear,
  listAcademicYears,
} from '../../lib/api'

// Formatea una fecha ISO ("2026-03-01T...") a formato local corto.
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function AcademicYears() {
  const [years, setYears] = useState<AcademicYear[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estado del formulario de creación.
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [saving, setSaving] = useState(false)

  async function load() {
    try {
      setYears(await listAcademicYears())
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo cargar.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Carga inicial al montar la pantalla. El setState ocurre tras el await
    // (de forma asíncrona), que es el patrón correcto para traer datos aquí.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      await createAcademicYear({ name, startDate, endDate, isActive })
      setName('')
      setStartDate('')
      setEndDate('')
      setIsActive(false)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo crear.')
    } finally {
      setSaving(false)
    }
  }

  async function handleActivate(id: string) {
    setError(null)
    try {
      await activateAcademicYear(id)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo activar.')
    }
  }

  async function handleDelete(id: string, yearName: string) {
    if (!confirm(`¿Eliminar el año escolar "${yearName}"?`)) return
    setError(null)
    try {
      await deleteAcademicYear(id)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo eliminar.')
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-800">Años escolares</h2>
      <p className="mt-1 text-gray-500">
        Define los ciclos lectivos de tu colegio. Solo uno puede estar activo.
      </p>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Formulario de creación */}
      <form
        onSubmit={handleCreate}
        className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border border-gray-200 bg-white p-5"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="2026"
            required
            className="w-28 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="start" className="text-sm font-medium text-gray-700">
            Inicio
          </label>
          <input
            id="start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="end" className="text-sm font-medium text-gray-700">
            Fin
          </label>
          <input
            id="end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          Marcar como activo
        </label>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? 'Guardando…' : 'Agregar'}
        </button>
      </form>

      {/* Lista */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Cargando…</p>
        ) : years.length === 0 ? (
          <p className="p-6 text-center text-gray-500">
            Aún no hay años escolares. Crea el primero arriba.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-3 font-medium">Nombre</th>
                <th className="px-5 py-3 font-medium">Inicio</th>
                <th className="px-5 py-3 font-medium">Fin</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {years.map((y) => (
                <tr key={y.id} className="text-gray-800">
                  <td className="px-5 py-3 font-medium">{y.name}</td>
                  <td className="px-5 py-3">{formatDate(y.startDate)}</td>
                  <td className="px-5 py-3">{formatDate(y.endDate)}</td>
                  <td className="px-5 py-3">
                    {y.isActive ? (
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Activo
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-3">
                      {!y.isActive && (
                        <button
                          type="button"
                          onClick={() => handleActivate(y.id)}
                          className="text-sm font-medium text-indigo-600 hover:underline"
                        >
                          Activar
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(y.id, y.name)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

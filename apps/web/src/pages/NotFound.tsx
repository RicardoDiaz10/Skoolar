import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gray-50 text-center">
      <p className="text-5xl font-bold text-indigo-700">404</p>
      <p className="text-gray-600">La página que buscas no existe.</p>
      <Link to="/" className="text-indigo-600 hover:underline">
        Volver al inicio
      </Link>
    </div>
  )
}

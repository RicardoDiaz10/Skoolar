import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './auth/ProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import AcademicYears from './pages/admin/AcademicYears'
import AdminDashboard from './pages/admin/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import RolePlaceholder from './pages/RolePlaceholder'

function App() {
  return (
    <Routes>
      {/* Público */}
      <Route path="/login" element={<Login />} />

      {/* Zona del administrador (layout con menú + rutas hijas) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="anios-escolares" element={<AcademicYears />} />
      </Route>

      {/* Zonas de profesor y alumno (provisionales) */}
      <Route
        path="/profesor"
        element={
          <ProtectedRoute role="TEACHER">
            <RolePlaceholder area="Profesor" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumno"
        element={
          <ProtectedRoute role="STUDENT">
            <RolePlaceholder area="Alumno" />
          </ProtectedRoute>
        }
      />

      {/* Raíz → al login (que a su vez redirige según la sesión) */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Cualquier otra ruta */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

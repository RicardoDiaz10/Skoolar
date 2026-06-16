// Mapa de rol → ruta de inicio. Define a qué zona va cada usuario según su rol.
export function homeForRole(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin'
    case 'TEACHER':
      return '/profesor'
    case 'STUDENT':
      return '/alumno'
    default:
      return '/login'
  }
}

// Cliente mínimo para hablar con la API de Skoolar (apps/api).
// La URL base se puede sobreescribir con la variable de entorno VITE_API_URL.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

// Datos del usuario que devuelve el login (eco de lo que envía el backend).
export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  schoolId: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse extends AuthTokens {
  user: AuthUser
}

// Error con el código HTTP, para que la UI pueda distinguir 401 de otros fallos.
export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Inicia sesión contra POST /auth/login.
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    // El backend manda 401 si las credenciales fallan, 400 si la validación falla.
    const message =
      res.status === 401
        ? 'Correo o contraseña incorrectos.'
        : 'No se pudo iniciar sesión. Inténtalo de nuevo.'
    throw new ApiError(message, res.status)
  }

  return res.json() as Promise<LoginResponse>
}

// Renueva la sesión con el refresh token. Devuelve un par de tokens nuevo.
export async function refresh(refreshToken: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
  if (!res.ok) {
    throw new ApiError('La sesión expiró. Vuelve a iniciar sesión.', res.status)
  }
  return res.json() as Promise<LoginResponse>
}

// Cierra la sesión: revoca el refresh token en el servidor.
export async function logout(refreshToken: string): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  })
}

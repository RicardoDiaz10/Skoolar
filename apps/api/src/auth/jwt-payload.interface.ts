import { UserRole } from '@prisma/client';

// Datos que viajan dentro del JWT (lo que firmamos al iniciar sesión).
// `sub` (subject) es la convención estándar de JWT para el id del usuario.
export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  schoolId: string | null;
}

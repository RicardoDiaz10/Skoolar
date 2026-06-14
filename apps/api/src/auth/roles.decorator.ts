import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

// Clave con la que se guardan/leen los roles permitidos en los metadatos de la ruta.
export const ROLES_KEY = 'roles';

// Decorador para marcar qué roles pueden acceder a una ruta.
// Uso:  @Roles(UserRole.ADMIN)  o  @Roles(UserRole.ADMIN, UserRole.TEACHER)
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

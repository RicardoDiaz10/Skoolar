import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import type { JwtPayload } from './jwt-payload.interface';
import { ROLES_KEY } from './roles.decorator';

// Portero por rol. Se usa DESPUÉS de JwtAuthGuard (que ya dejó el usuario en req.user).
// Lee los roles exigidos por @Roles(...) y los compara con el rol del usuario.
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Roles exigidos por la ruta (método) o, si no, por el controlador.
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Sin @Roles → la ruta no restringe por rol (basta con estar autenticado).
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context
      .switchToHttp()
      .getRequest<{ user?: JwtPayload }>();

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permiso para esta acción.');
    }

    return true;
  }
}

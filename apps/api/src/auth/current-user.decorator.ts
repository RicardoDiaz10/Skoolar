import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { JwtPayload } from './jwt-payload.interface';

// Atajo para leer el usuario autenticado (el contenido del JWT) en una ruta.
// Uso:  metodo(@CurrentUser() user: JwtPayload) { ... }
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    return request.user;
  },
);

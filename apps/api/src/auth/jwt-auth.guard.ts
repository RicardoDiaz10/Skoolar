import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Guard reutilizable: se coloca sobre una ruta (@UseGuards(JwtAuthGuard))
// para exigir un JWT válido. Se apoya en la estrategia "jwt" de Passport.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

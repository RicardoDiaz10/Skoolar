import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';

// Estrategia "jwt" de Passport: se ejecuta en cada ruta protegida.
// Lee el token del header "Authorization: Bearer <token>", verifica la firma
// con JWT_SECRET y, si es válido, devuelve el payload (que NestJS adjunta a req.user).
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // un token caducado se rechaza
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  // El valor devuelto aquí es lo que queda disponible como req.user.
  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}

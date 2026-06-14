import { randomUUID } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { JwtPayload } from './jwt-payload.interface';

// Contenido del refresh token: el usuario (sub) y un id único de token (jti),
// que es la pieza que guardamos en Redis para poder rotarlo y revocarlo.
interface RefreshPayload {
  sub: string;
  jti: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}

  // Prefijo de las claves de refresh tokens en Redis: refresh:<jti>
  private refreshKey(jti: string): string {
    return `refresh:${jti}`;
  }

  // Valida email + contraseña. Devuelve el usuario si todo cuadra, o lanza 401.
  // Mensaje genérico a propósito: no revelamos si falló el email o la contraseña.
  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    return user;
  }

  // Emite el par de tokens y registra el refresh token en Redis.
  private async issueTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
    };

    // Access token: usa el secreto/expiración por defecto del JwtModule (15 min).
    const accessToken = await this.jwt.signAsync(payload);

    // Refresh token: secreto y expiración propios, con un id único (jti).
    const jti = randomUUID();
    const refreshToken = await this.jwt.signAsync(
      { sub: user.id, jti },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        // El tipo exacto de expiresIn se deriva de @nestjs/jwt (formato "7d", "1h"…).
        expiresIn: this.config.getOrThrow<string>(
          'JWT_REFRESH_EXPIRES_IN',
        ) as JwtSignOptions['expiresIn'],
      },
    );

    // Guardamos el jti en Redis con el mismo tiempo de vida que el token.
    // Si el jti no está en Redis, el refresh token se considera inválido.
    const { exp } = this.jwt.decode<{ exp: number }>(refreshToken);
    const ttlSeconds = exp - Math.floor(Date.now() / 1000);
    await this.redis.set(this.refreshKey(jti), user.id, ttlSeconds);

    return { accessToken, refreshToken };
  }

  // Datos públicos del usuario que devolvemos al cliente (sin el hash).
  private publicUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      schoolId: user.schoolId,
    };
  }

  // Inicia sesión: valida credenciales y devuelve el par de tokens + el usuario.
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const tokens = await this.issueTokens(user);
    return { ...tokens, user: this.publicUser(user) };
  }

  // Renueva la sesión a partir de un refresh token válido (con rotación):
  // se invalida el token usado y se emite uno nuevo.
  async refresh(refreshToken: string) {
    let payload: RefreshPayload;
    try {
      payload = await this.jwt.verifyAsync<RefreshPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Sesión inválida o expirada.');
    }

    // El jti debe seguir presente en Redis; si no, fue revocado o ya usado.
    const storedUserId = await this.redis.get(this.refreshKey(payload.jti));
    if (!storedUserId || storedUserId !== payload.sub) {
      throw new UnauthorizedException('Sesión inválida o expirada.');
    }

    // Rotación: invalidamos el refresh token actual antes de emitir el nuevo.
    await this.redis.del(this.refreshKey(payload.jti));

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Sesión inválida o expirada.');
    }

    const tokens = await this.issueTokens(user);
    return { ...tokens, user: this.publicUser(user) };
  }

  // Cierra la sesión: elimina el refresh token de Redis para que no pueda renovarse.
  async logout(refreshToken: string): Promise<void> {
    try {
      const payload = await this.jwt.verifyAsync<RefreshPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
      await this.redis.del(this.refreshKey(payload.jti));
    } catch {
      // Token ya inválido: no hay nada que revocar, el logout es igualmente exitoso.
    }
  }
}

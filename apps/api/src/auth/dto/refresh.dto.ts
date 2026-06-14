import { IsJWT } from 'class-validator';

// Cuerpo de POST /auth/refresh y /auth/logout: el refresh token a renovar/revocar.
export class RefreshDto {
  @IsJWT({ message: 'El refresh token no es válido.' })
  refreshToken: string;
}

import { IsEmail, IsString, MinLength } from 'class-validator';

// Forma y reglas de validación del cuerpo de POST /auth/login.
// El ValidationPipe global rechaza la petición si no se cumplen.
export class LoginDto {
  @IsEmail({}, { message: 'El correo no es válido.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  password: string;
}

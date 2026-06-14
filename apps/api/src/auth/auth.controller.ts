import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { JwtPayload } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login → valida credenciales y devuelve el access token.
  // 200 (no 201) porque no se crea un recurso, solo se autentica.
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // GET /auth/me → ruta protegida de ejemplo: solo accesible con un JWT válido.
  // Devuelve el contenido del token (lo que Passport dejó en req.user).
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: { user: JwtPayload }): JwtPayload {
    return req.user;
  }
}

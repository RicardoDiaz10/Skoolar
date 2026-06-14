import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtPayload } from '../auth/jwt-payload.interface';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users → lista los usuarios DEL COLEGIO del que pide (multi-tenant).
  // El schoolId sale del token (@CurrentUser), nunca del cliente: así no se
  // puede pedir datos de otro colegio. Solo accesible para ADMIN.
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.usersService.findAllBySchool(user.schoolId);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Patrón multi-tenant: TODA consulta recibe el schoolId del usuario que pide
  // y filtra por él. Así un colegio nunca puede ver datos de otro.
  // Nunca se devuelve passwordHash (se eligen campos con `select`).
  findAllBySchool(schoolId: string) {
    return this.prisma.user.findMany({
      where: { schoolId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}

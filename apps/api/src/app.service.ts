import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  // Comprobación de salud: confirma que la API puede hablar con la base de datos.
  // Hace una consulta trivial (SELECT 1) y cuenta los colegios registrados.
  async healthCheck(): Promise<{
    status: string;
    database: string;
    schools: number;
  }> {
    await this.prisma.$queryRaw`SELECT 1`;
    const schools = await this.prisma.school.count();
    return { status: 'ok', database: 'connected', schools };
  }
}

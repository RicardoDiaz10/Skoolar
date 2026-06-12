import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Servicio que expone el cliente de Prisma al resto de la aplicación.
// Hereda de PrismaClient, así que cualquier servicio que lo inyecte puede hacer
// `this.prisma.user.findMany()`, etc.
//
// En Prisma 7 el cliente necesita un "driver adapter": aquí usamos PrismaPg, que
// se conecta a PostgreSQL mediante la cadena DATABASE_URL.
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const connectionString = config.getOrThrow<string>('DATABASE_URL');
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  // Abre la conexión cuando NestJS arranca el módulo.
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  // Cierra la conexión limpiamente cuando la aplicación se apaga.
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}

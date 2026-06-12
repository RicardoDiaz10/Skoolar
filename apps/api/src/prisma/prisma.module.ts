import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Módulo global: al marcarlo @Global, PrismaService queda disponible para inyectar
// en cualquier otro módulo sin tener que importarlo en cada uno.
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

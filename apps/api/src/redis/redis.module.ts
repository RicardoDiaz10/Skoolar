import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

// Módulo global: RedisService queda disponible para inyectar en cualquier módulo.
@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}

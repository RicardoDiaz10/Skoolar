import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcademicYearsModule } from './academic-years/academic-years.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Carga las variables de entorno (.env) y las hace globales en toda la app.
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    AcademicYearsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación automática de los DTO en todas las rutas.
  // whitelist: descarta propiedades no declaradas en el DTO.
  // forbidNonWhitelisted: rechaza la petición si llegan propiedades de más.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Permite que el frontend llame a esta API durante el desarrollo.
  // Se aceptan los orígenes locales habituales (Vite en :5173 y el proxy de preview).
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
// `void` indica explícitamente que ignoramos la promesa (arranque de la app).
void bootstrap();

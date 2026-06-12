import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET /health → verifica que la API y la base de datos están operativas.
  @Get('health')
  healthCheck() {
    return this.appService.healthCheck();
  }
}

import { Module } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { AcademicYearsController } from './academic-years.controller';
import { AcademicYearsService } from './academic-years.service';

@Module({
  controllers: [AcademicYearsController],
  providers: [AcademicYearsService, RolesGuard],
})
export class AcademicYearsModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtPayload } from '../auth/jwt-payload.interface';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';

// Gestión de años escolares. Todo aquí es solo para ADMIN y queda acotado
// al colegio del usuario (el schoolId sale del token, nunca del cliente).
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('academic-years')
export class AcademicYearsController {
  constructor(private readonly academicYears: AcademicYearsService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateAcademicYearDto) {
    return this.academicYears.create(user.schoolId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.academicYears.findAll(user.schoolId);
  }

  @Get(':id')
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.academicYears.findOne(user.schoolId, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateAcademicYearDto,
  ) {
    return this.academicYears.update(user.schoolId, id, dto);
  }

  @Patch(':id/activate')
  activate(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.academicYears.activate(user.schoolId, id);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.academicYears.remove(user.schoolId, id);
  }
}

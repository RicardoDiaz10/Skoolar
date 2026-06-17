import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';

@Injectable()
export class AcademicYearsService {
  constructor(private readonly prisma: PrismaService) {}

  // Valida que la fecha de fin sea posterior a la de inicio.
  private assertDateRange(startDate: string, endDate: string): void {
    if (new Date(endDate) <= new Date(startDate)) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la de inicio.',
      );
    }
  }

  // Crea un año escolar dentro del colegio del usuario.
  async create(schoolId: string, dto: CreateAcademicYearDto) {
    this.assertDateRange(dto.startDate, dto.endDate);

    try {
      return await this.prisma.$transaction(async (tx) => {
        // Si este año será el activo, desactivamos cualquier otro del colegio.
        if (dto.isActive) {
          await tx.academicYear.updateMany({
            where: { schoolId, isActive: true },
            data: { isActive: false },
          });
        }
        return tx.academicYear.create({
          data: {
            schoolId,
            name: dto.name,
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
            isActive: dto.isActive ?? false,
          },
        });
      });
    } catch (error) {
      throw this.translateError(error);
    }
  }

  // Lista los años escolares del colegio (más reciente primero).
  findAll(schoolId: string) {
    return this.prisma.academicYear.findMany({
      where: { schoolId },
      orderBy: { startDate: 'desc' },
    });
  }

  // Devuelve un año del colegio o lanza 404 si no existe o es de otro colegio.
  async findOne(schoolId: string, id: string) {
    const year = await this.prisma.academicYear.findFirst({
      where: { id, schoolId },
    });
    if (!year) {
      throw new NotFoundException('Año escolar no encontrado.');
    }
    return year;
  }

  async update(schoolId: string, id: string, dto: UpdateAcademicYearDto) {
    const current = await this.findOne(schoolId, id);

    const startDate = dto.startDate ?? current.startDate.toISOString();
    const endDate = dto.endDate ?? current.endDate.toISOString();
    this.assertDateRange(startDate, endDate);

    try {
      return await this.prisma.$transaction(async (tx) => {
        if (dto.isActive) {
          await tx.academicYear.updateMany({
            where: { schoolId, isActive: true, id: { not: id } },
            data: { isActive: false },
          });
        }
        return tx.academicYear.update({
          where: { id },
          data: {
            name: dto.name,
            startDate: dto.startDate ? new Date(dto.startDate) : undefined,
            endDate: dto.endDate ? new Date(dto.endDate) : undefined,
            isActive: dto.isActive,
          },
        });
      });
    } catch (error) {
      throw this.translateError(error);
    }
  }

  async remove(schoolId: string, id: string) {
    await this.findOne(schoolId, id); // garantiza que es del colegio
    await this.prisma.academicYear.delete({ where: { id } });
    return { success: true };
  }

  // Marca un año como activo y desactiva los demás del colegio.
  async activate(schoolId: string, id: string) {
    await this.findOne(schoolId, id);
    return this.prisma.$transaction(async (tx) => {
      await tx.academicYear.updateMany({
        where: { schoolId, isActive: true, id: { not: id } },
        data: { isActive: false },
      });
      return tx.academicYear.update({
        where: { id },
        data: { isActive: true },
      });
    });
  }

  // Traduce errores conocidos de Prisma a excepciones HTTP claras.
  private translateError(error: unknown): Error {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return new ConflictException(
        'Ya existe un año escolar con ese nombre en el colegio.',
      );
    }
    return error instanceof Error ? error : new Error('Error desconocido.');
  }
}

import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// Cuerpo de POST /academic-years. El ValidationPipe global aplica estas reglas.
export class CreateAcademicYearDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del año escolar es obligatorio.' })
  name: string;

  @IsDateString({}, { message: 'La fecha de inicio no es válida.' })
  startDate: string;

  @IsDateString({}, { message: 'La fecha de fin no es válida.' })
  endDate: string;

  // Opcional: si es true, este año pasa a ser el activo del colegio.
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

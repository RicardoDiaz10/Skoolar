import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

// Cuerpo de PATCH /academic-years/:id. Todos los campos son opcionales:
// solo se actualiza lo que llegue.
export class UpdateAcademicYearDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El nombre del año escolar no puede estar vacío.' })
  name?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio no es válida.' })
  startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin no es válida.' })
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './create-proveedore.dto';
import { IsOptional, IsString, IsEmail, Length } from 'class-validator';

export class UpdateProveedoreDto extends PartialType(CreateProveedorDto) {
    @IsOptional()
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    correoElectronico?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
    nombre?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 50, { message: 'Los apellidos deben tener entre 1 y 50 caracteres' })
    apellidos?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 30, { message: 'El contacto debe tener entre 1 y 30 caracteres' })
    contacto?: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 100, { message: 'El teléfono debe tener entre 1 y 100 caracteres' })
    telefono?: string;
}

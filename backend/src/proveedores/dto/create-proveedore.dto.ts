import { IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateProveedorDto {
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  correoElectronico: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'Los apellidos no pueden estar vacíos' })
  @Length(1, 50, { message: 'Los apellidos deben tener entre 1 y 50 caracteres' })
  apellidos: string;

  @IsOptional()
  @Length(1, 30, { message: 'El contacto debe tener entre 1 y 30 caracteres' })
  contacto: string;

  @IsOptional()
  @Length(1, 100, { message: 'El teléfono debe tener entre 1 y 100 caracteres' })
  telefono: string;
}

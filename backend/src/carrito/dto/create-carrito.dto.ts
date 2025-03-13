import { IsNotEmpty, IsPositive, IsOptional } from 'class-validator';

export class CreateCarritoDto {
  @IsNotEmpty({ message: 'El usuario es obligatorio' })
  @IsPositive({ message: 'El ID del usuario debe ser positivo' })
  usuarioId: number;

  @IsOptional() 
  fechaCreacion?: Date;
}

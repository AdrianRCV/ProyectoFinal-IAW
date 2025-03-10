import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritoDto } from './create-carrito.dto';
import { IsOptional, IsPositive } from 'class-validator';

export class UpdateCarritoDto extends PartialType(CreateCarritoDto) {
    @IsOptional()
    @IsPositive({ message: 'El ID del carrito debe ser positivo' })
    usuarioId?: number;
}

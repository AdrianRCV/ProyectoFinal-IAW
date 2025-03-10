import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritoProductoDto } from './create-carrito_producto.dto';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class UpdateCarritoProductoDto extends PartialType(CreateCarritoProductoDto) {
    @IsOptional()
    @IsPositive({ message: 'El ID del carrito producto debe ser positivo' })
    idCarritoProducto?: number;
  
    @IsOptional()
    @IsPositive({ message: 'El ID del carrito debe ser positivo' })
    carritoId?: number;
  
    @IsOptional()
    @IsPositive({ message: 'El ID del producto debe ser positivo' })
    productoId?: number;
  
    @IsOptional()
    @IsPositive({ message: 'La cantidad debe ser positiva' })
    cantidad?: number;
  
    @IsOptional()
    @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
    precio?: number;
}

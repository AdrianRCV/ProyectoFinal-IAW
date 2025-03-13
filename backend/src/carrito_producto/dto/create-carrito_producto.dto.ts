import { IsNotEmpty, IsPositive, Min, IsOptional } from 'class-validator';

export class CreateCarritoProductoDto {
  @IsNotEmpty({ message: 'El ID del carrito es obligatorio' })
  @IsPositive({ message: 'El ID del carrito debe ser positivo' })
  carritoId: number;

  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  @IsPositive({ message: 'El ID del producto debe ser positivo' })
  productoId: number;

  @IsNotEmpty({ message: 'La cantidad no puede estar vacía' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  cantidad: number;

  @IsNotEmpty({ message: 'El precio no puede estar vacío' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;

  @IsOptional()
  fechaAgregado?: Date; // Opcional, ya que TypeORM lo genera automáticamente
}

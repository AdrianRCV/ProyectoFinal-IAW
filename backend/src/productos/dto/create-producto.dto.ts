import { IsNotEmpty, Length, IsDecimal, Min, IsInt } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
  imagen: string;

  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @Length(1, 50, { message: 'El nombre del producto debe tener entre 1 y 50 caracteres' })
  nombre_producto: string;

  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @Length(1, 50, { message: 'La categoría debe tener entre 1 y 50 caracteres' })
  categoria: string;

  @IsNotEmpty({ message: 'El detalle no puede estar vacío' })
  @Length(1, 50, { message: 'El detalle debe tener entre 1 y 50 caracteres' })
  detalle: string;

  @IsDecimal({}, { message: 'El precio debe ser un número decimal válido' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;

  @IsInt({ message: 'El ID del proveedor debe ser un número entero' })
  @Min(1, { message: 'El ID del proveedor debe ser mayor o igual a 1' })
  proveedorId: number;
}

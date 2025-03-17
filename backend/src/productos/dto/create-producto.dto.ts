import { IsNotEmpty, Length, Min } from 'class-validator';
import { Column } from 'typeorm';

export class CreateProductoDto {
  @Column({ type: 'varchar', length: 5000 })
  @IsNotEmpty({ message: 'La imagen no puede estar vacía' })
  imagen: string;

  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  @Length(1, 50, {
    message: 'El nombre del producto debe tener entre 1 y 50 caracteres',
  })
  nombre_producto: string;

  @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
  @Length(1, 50, { message: 'La categoría debe tener entre 1 y 50 caracteres' })
  categoria: string;

  @IsNotEmpty({ message: 'El detalle no puede estar vacío' })
  @Length(1, 1000, {
    message: 'El detalle debe tener entre 1 y 300 caracteres',
  })
  detalle: string;

  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsOptional, IsString, IsDecimal, Min, Length } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
 @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'El nombre del producto debe tener entre 1 y 50 caracteres' })
  nombre_producto?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'La categoría debe tener entre 1 y 50 caracteres' })
  categoria?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, { message: 'El detalle debe tener entre 1 y 50 caracteres' })
  detalle?: string;

  @IsOptional()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio?: number;

  @IsOptional()
  @IsString()
  proveedor?: string;
}

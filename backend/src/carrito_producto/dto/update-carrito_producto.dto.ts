import { PartialType } from '@nestjs/mapped-types';
import { CreateCarritoProductoDto } from './create-carrito_producto.dto';

export class UpdateCarritoProductoDto extends PartialType(CreateCarritoProductoDto) {}

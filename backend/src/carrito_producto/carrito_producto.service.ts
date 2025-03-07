import { Injectable } from '@nestjs/common';
import { CreateCarritoProductoDto } from './dto/create-carrito_producto.dto';
import { UpdateCarritoProductoDto } from './dto/update-carrito_producto.dto';

@Injectable()
export class CarritoProductoService {
  create(createCarritoProductoDto: CreateCarritoProductoDto) {
    return 'This action adds a new carritoProducto';
  }

  findAll() {
    return `This action returns all carritoProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carritoProducto`;
  }

  update(id: number, updateCarritoProductoDto: UpdateCarritoProductoDto) {
    return `This action updates a #${id} carritoProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} carritoProducto`;
  }
}

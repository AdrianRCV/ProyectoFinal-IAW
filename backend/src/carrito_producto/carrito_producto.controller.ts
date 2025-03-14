import { Controller, Post, Delete, Get, Patch, Param, Body } from '@nestjs/common';
import { CarritoProductoService } from './carrito_producto.service';

@Controller('carrito-producto')
export class CarritoProductoController {
  constructor(private readonly carritoProductoService: CarritoProductoService) {}

  @Post(':carritoId/producto/:productoId')
  addProduct(@Param('carritoId') carritoId: number, @Param('productoId') productoId: number, @Body('cantidad') cantidad: number) {
    return this.carritoProductoService.addProductToCarrito(+carritoId, +productoId, cantidad);
  }
}

import { Controller, Post, Delete, Get, Patch, Param, Body } from '@nestjs/common';
import { CarritoProductoService } from './carrito_producto.service';

@Controller('carrito-producto')
export class CarritoProductoController {
  constructor(private readonly carritoProductoService: CarritoProductoService) {}

  @Post(':carritoId/producto/:productoId')
  addProduct(@Param('carritoId') carritoId: number, @Param('productoId') productoId: number, @Body('cantidad') cantidad: number) {
    return this.carritoProductoService.addProduct(+carritoId, +productoId, cantidad);
  }

  @Delete(':carritoId/producto/:productoId')
  removeProduct(@Param('carritoId') carritoId: number, @Param('productoId') productoId: number) {
    return this.carritoProductoService.removeProduct(+carritoId, +productoId);
  }

  @Get(':carritoId')
  findByCarrito(@Param('carritoId') carritoId: number) {
    return this.carritoProductoService.findByCarrito(+carritoId);
  }

  @Patch(':carritoId/producto/:productoId')
  updateQuantity(@Param('carritoId') carritoId: number, @Param('productoId') productoId: number, @Body('cantidad') cantidad: number) {
    return this.carritoProductoService.updateQuantity(+carritoId, +productoId, cantidad);
  }
}

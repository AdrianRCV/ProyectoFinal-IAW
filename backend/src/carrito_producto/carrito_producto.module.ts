import { Module } from '@nestjs/common';
import { CarritoProductoService } from './carrito_producto.service';
import { CarritoProductoController } from './carrito_producto.controller';

@Module({
  controllers: [CarritoProductoController],
  providers: [CarritoProductoService],
})
export class CarritoProductoModule {}

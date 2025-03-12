import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoProductoService } from './carrito_producto.service';
import { CarritoProductoController } from './carrito_producto.controller';
import { CarritoProducto } from './entities/carrito_producto.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarritoProducto, Carrito, Producto], 'base1')],
  controllers: [CarritoProductoController],
  providers: [CarritoProductoService],
})
export class CarritoProductoModule {}

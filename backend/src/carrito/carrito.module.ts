import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CarritoProducto } from 'src/carrito_producto/entities/carrito_producto.entity';
import { ProductosModule } from 'src/productos/productos.module';
import { CarritoProductoService } from 'src/carrito_producto/carrito_producto.service';

@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature(
      [Carrito, User, Producto, CarritoProducto],
      'base1',
    ),
  ],
  controllers: [CarritoController],
  providers: [CarritoService, CarritoProductoService],
})
export class CarritoModule {}

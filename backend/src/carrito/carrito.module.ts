import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CarritoProducto } from 'src/carrito_producto/entities/carrito_producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, User, Producto, CarritoProducto], 'base1')],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}

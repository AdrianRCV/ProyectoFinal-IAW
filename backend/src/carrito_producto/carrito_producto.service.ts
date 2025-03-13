import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarritoProducto } from './entities/carrito_producto.entity';
import { Carrito } from 'src/carrito/entities/carrito.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Injectable()
export class CarritoProductoService {
  constructor(
    @InjectRepository(Carrito, 'base1') private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(Producto, 'base1') private readonly productoRepository: Repository<Producto>,
    @InjectRepository(CarritoProducto, 'base1') private readonly carritoProductoRepository: Repository<CarritoProducto>,
  ) {}

  async addProductToCarrito(carritoId: number, productoId: number, cantidad: number): Promise<CarritoProducto> {
    const carrito = await this.carritoRepository.findOne({ where: { idCarrito: carritoId } });
    if (!carrito) throw new Error('Carrito no encontrado');

    const producto = await this.productoRepository.findOne({ where: { idProducto: productoId } });
    if (!producto) throw new Error('Producto no encontrado');

    const carritoProducto = this.carritoProductoRepository.create({
      carrito, producto, cantidad, precio: producto.precio * cantidad,
    });

    return this.carritoProductoRepository.save(carritoProducto);
  }

  async findProductoById(productoId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { idProducto: productoId } });
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  }
}

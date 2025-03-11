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

  async addProduct(carritoId: number, productoId: number, cantidad: number): Promise<CarritoProducto> {
    const carrito = await this.carritoRepository.findOne({ where: { idCarrito: carritoId } });
    if (!carrito) throw new Error('Carrito no encontrado');

    const producto = await this.productoRepository.findOne({ where: { idProducto: productoId } });
    if (!producto) throw new Error('Producto no encontrado');

    const carritoProducto = this.carritoProductoRepository.create({
      carrito, producto, cantidad, precio: producto.precio * cantidad,
    });

    return this.carritoProductoRepository.save(carritoProducto);
  }

  async removeProduct(carritoId: number, productoId: number): Promise<void> {
    await this.carritoProductoRepository.delete({ carrito: { idCarrito: carritoId }, producto: { idProducto: productoId } });
  }

  async findByCarrito(carritoId: number): Promise<CarritoProducto[]> {
    return this.carritoProductoRepository.find({ where: { carrito: { idCarrito: carritoId } }, relations: ['producto'] });
  }

  async updateQuantity(carritoId: number, productoId: number, cantidad: number): Promise<CarritoProducto> {
    const carritoProducto = await this.carritoProductoRepository.findOne({ 
      where: { carrito: { idCarrito: carritoId }, producto: { idProducto: productoId } },
    });

    if (!carritoProducto) throw new Error('Producto no encontrado en el carrito');

    carritoProducto.cantidad = cantidad;
    carritoProducto.precio = carritoProducto.producto.precio * cantidad;
    return this.carritoProductoRepository.save(carritoProducto);
  }
}

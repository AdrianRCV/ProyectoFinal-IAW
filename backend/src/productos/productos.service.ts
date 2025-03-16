import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto, 'base1')
    private productoRepository: Repository<Producto>,
  ) {}

  async createProducto(
    createProductoDto: CreateProductoDto,
  ): Promise<Producto> {
    const { nombre_producto, imagen, categoria, detalle, precio } =createProductoDto;
    const producto = new Producto();
    producto.nombre_producto = nombre_producto;
    producto.imagen = imagen;
    producto.categoria = categoria;
    producto.detalle = detalle;
    producto.precio = precio;
    return this.productoRepository.save(producto);
  }

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
    });
    if (!producto) {
      throw new Error(`Producto ${id} no encontrado`);
    }
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
    });
    if (!producto) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    Object.assign(producto, updateProductoDto);
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
    });
    if (!producto) {
      throw new Error(`Producto ${id} no encontrado`);
    }
    await this.productoRepository.remove(producto);
  }
}

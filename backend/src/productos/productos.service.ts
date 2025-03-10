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
  
  async createProducto(createProductoDto: CreateProductoDto): Promise<Producto> {
    const { nombre_producto, imagen, categoria, detalle, precio } = createProductoDto;
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

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { CarritoProducto } from 'src/carrito_producto/entities/carrito_producto.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito, 'base1')
    private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(User, 'base1')
    private readonly userRepository: Repository<User>,
    @InjectRepository(CarritoProducto, 'base1')
    private readonly carritoProductoRepository: Repository<CarritoProducto>,
    @InjectRepository(Producto, 'base1')
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(createCarritoDto: CreateCarritoDto): Promise<Carrito> {const usuario = await this.userRepository.findOne({where: { id_cliente: createCarritoDto.usuarioId },});
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    const carrito = this.carritoRepository.create({usuario, productos: [], });

    return this.carritoRepository.save(carrito);
  }

  async findAll(): Promise<Carrito[]> {
    return this.carritoRepository.find({ relations: ['usuario', 'productos'] });
  }

  async findOne(id: number): Promise<Carrito> {const carrito = await this.carritoRepository.findOne({where: { idCarrito: id },relations: ['usuario', 'productos'],});
    if (!carrito) {
      throw new NotFoundException(`Carrito con ID ${id} no encontrado`);
    }

    return carrito;
  }

  async update(id: number, updateCarritoDto: Partial<CreateCarritoDto>): Promise<Carrito> {
    const carrito = await this.findOne(id);

    if (updateCarritoDto.usuarioId) {
      const usuario = await this.userRepository.findOne({
        where: { id_cliente: updateCarritoDto.usuarioId },
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      
      carrito.usuario = usuario;
    }

    return this.carritoRepository.save(carrito);
  }

  async remove(id: number): Promise<void> {
    const carrito = await this.findOne(id);
    await this.carritoRepository.remove(carrito);
  }

  async addProduct(carritoId: number, productoId: number, cantidad: number): Promise<CarritoProducto> {
    const carrito = await this.findOne(carritoId);
    const producto = await this.productoRepository.findOne({
      where: { idProducto: productoId },
    });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    const carritoProducto = this.carritoProductoRepository.create({carrito,producto,cantidad,precio: producto.precio,
    });

    return this.carritoProductoRepository.save(carritoProducto);
  }

  async removeProduct(carritoId: number, productoId: number): Promise<void> {
    const carritoProducto = await this.carritoProductoRepository.findOne({
      where: { carrito: { idCarrito: carritoId }, producto: { idProducto: productoId } },
    });

    if (!carritoProducto) {
      throw new NotFoundException('Producto no encontrado en el carrito');
    }

    await this.carritoProductoRepository.remove(carritoProducto);
  }

}

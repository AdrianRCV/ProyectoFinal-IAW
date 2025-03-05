import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido, 'base1')
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}
  // Método para crear un nuevo cliente
  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    // Creamos una instancia de cliente a partir del DTO
    const pedido = this.pedidoRepository.create(createPedidoDto);
    // Guardamos el cliente en la base de datos
    return await this.pedidoRepository.save(pedido);
  }

  // Método para obtener todos los pedidos, incluyendo las relaciones
  async findAll(): Promise<Pedido[]> {
    // Obtenemos todos los pedido junto con las relaciones especificadas
    return await this.pedidoRepository.find({
      relations: ['cliente'],
    });
  }

  // Método para obtener un pedido por su ID, incluyendo las relaciones
  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['cliente'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }

    return pedido;
  }

  // Método para actualizar un pedido teórico existente
  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['cliente'],
    });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
    }

    await this.pedidoRepository.update(id, updatePedidoDto);

    return this.pedidoRepository.findOne({
      where: { idPedido: id },
      relations: ['cliente'],
    }) as Promise<Pedido>; // Aseguramos el tipo como Pedido
  }

  // Eliminar un pedido
  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id); // Verificar existencia con findOne
    await this.pedidoRepository.delete(pedido.idPedido); // Eliminar cliente
  }
}

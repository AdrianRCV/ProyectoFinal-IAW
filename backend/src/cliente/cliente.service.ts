import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente, 'base1')
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  // Método para crear un nuevo cliente
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    // Creamos una instancia de cliente a partir del DTO
    const cliente = this.clienteRepository.create(createClienteDto);
    // Guardamos el cliente en la base de datos
    return await this.clienteRepository.save(cliente);
  }

  // Método para obtener todos los clientes, incluyendo las relaciones
  async findAll(): Promise<Cliente[]> {
    // Obtenemos todos los clientes junto con las relaciones especificadas
    return await this.clienteRepository.find({
      relations: ['pedido'],
    });
  }

  // Método para obtener un cleinte por su ID, incluyendo las relaciones
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: id },
      relations: ['pedido'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    return cliente;
  }

  // Actualizar un cliente existente
  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    await this.findOne(id); // Verificar existencia con findOne
    await this.clienteRepository.update(id, updateClienteDto);
    return this.findOne(id); // Retornar cliente actualizado
  }

  // Eliminar un cliente
  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id); // Verificar existencia con findOne
    await this.clienteRepository.delete(cliente.idCliente); // Eliminar cliente
  }
}

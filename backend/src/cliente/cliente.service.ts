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
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
      relations: ['pedido'],
    });
  }

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

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    await this.findOne(id); 
    await this.clienteRepository.update(id, updateClienteDto);
    return this.findOne(id); 
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id); 
    await this.clienteRepository.delete(cliente.idCliente); 
  }
}

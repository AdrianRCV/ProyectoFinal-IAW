import { Injectable } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
  @InjectRepository(Proveedor, 'base1')
  private proveedoreRepository: Repository<Proveedor>,
  ) {}

  async create(createProveedorDto: CreateProveedorDto): Promise<Proveedor> {
    const { correoElectronico, nombre, apellidos, contacto, telefono } = createProveedorDto;
    const proveedor = new Proveedor();
    proveedor.correoElectronico = correoElectronico;
    proveedor.nombre = nombre;
    proveedor.apellidos = apellidos;
    proveedor.contacto = contacto;
    proveedor.telefono = telefono;
    return this.proveedoreRepository.save(proveedor);
  }

  async findAll(): Promise<Proveedor[]> {
    return this.proveedoreRepository.find();
  }

  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedoreRepository.findOne({ where: { idProveedor: id } });
    if (!proveedor) {
      throw new Error(`Proveedor ${id} no encontrado`);
    }
    return proveedor;
  }

  async update(id: number, updateProveedoreDto: UpdateProveedoreDto): Promise<Proveedor> {
    const proveedor = await this.proveedoreRepository.findOne({ where: { idProveedor: id } });
    if (!proveedor) {
      throw new Error(`Proveedor con ID ${id} no encontrado`);
    }
    Object.assign(proveedor, updateProveedoreDto);
    return this.proveedoreRepository.save(proveedor);
  }

  async remove(id: number): Promise<void> {
    const proveedor = await this.proveedoreRepository.findOne({ where: { idProveedor: id } });
    if (!proveedor) {
      throw new Error(`Proveedor ${id} no encontrado`);
    }
    await this.proveedoreRepository.remove(proveedor);
  }
}

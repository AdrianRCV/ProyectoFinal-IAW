import { Injectable } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';

@Injectable()
export class ProveedoresService {
  create(createProveedoreDto: CreateProveedorDto) {
    return 'This action adds a new proveedore';
  }

  findAll() {
    return `This action returns all proveedores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proveedore`;
  }

  update(id: number, updateProveedoreDto: UpdateProveedoreDto) {
    return `This action updates a #${id} proveedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} proveedore`;
  }
}

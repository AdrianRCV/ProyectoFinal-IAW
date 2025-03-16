import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(User, 'base1')
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<User> {
    const { username, email, password } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id_cliente: string): Promise<User> {
    const id = Number(id_cliente); // Convierte a número
    if (isNaN(id)) {
      throw new NotFoundException(`El id_cliente proporcionado no es válido`);
    }

    const user = await this.userRepository.findOne({
      where: { id_cliente: id },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id_cliente ${id} no encontrado`);
    }
    return user;
  }

  async remove(id_cliente: string): Promise<void> {
    const id = Number(id_cliente);
    if (isNaN(id)) {
      throw new NotFoundException(`El id_cliente proporcionado no es válido`);
    }

    const user = await this.findOneById(id_cliente);
    await this.userRepository.remove(user);
  }
}

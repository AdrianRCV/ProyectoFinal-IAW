import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { User } from './entities/usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usuariosService.findAll();
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<User> {
    const { username, email, password } = createUsuarioDto;
    return this.usuariosService.createUser({ username, email, password });
  }
}

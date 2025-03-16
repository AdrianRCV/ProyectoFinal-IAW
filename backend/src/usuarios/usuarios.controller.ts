import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
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

  @Get(':id_cliente')
  async findOne(@Param('id_cliente') id_cliente: string): Promise<User> {
    return this.usuariosService.findOneById(id_cliente);
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<User> {
    const { username, email, password } = createUsuarioDto;
    return this.usuariosService.createUser({ username, email, password });
  }

  @Delete(':id_cliente')
  async remove(@Param('id_cliente') id_cliente: string): Promise<void> {
    return this.usuariosService.remove(id_cliente);
  }
}

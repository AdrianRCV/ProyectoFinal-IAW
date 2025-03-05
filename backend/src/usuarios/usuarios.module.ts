import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/usuarios.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], 'base1')],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}

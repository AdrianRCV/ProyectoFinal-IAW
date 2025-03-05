import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { User } from './usuarios/entities/usuarios.entity';
import { ClienteModule } from './cliente/cliente.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProyectoModule } from './proyecto/proyecto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
<<<<<<< HEAD
      name: 'base1',
      type: 'mysql',
      host: process.env.URL,
      port: 3306,
      username: 'luis',
      password: process.env.PASSWORD,
=======
      name:'base1',
      type:'mysql',
      host:process.env.URL,
      port:3306,
      username: 'root',
      password:process.env.PASSWORD,
>>>>>>> 3b30fcd20d09600c399ffcf54c253ed07c6b7a60
      database: process.env.DBNAME,
      entities: [User],
      synchronize: true /*Solo en desarrollo*/,
    }),
    AuthModule,
    UsuariosModule,
    ClienteModule,
    PedidoModule,
    ProyectoModule,
    ProveedoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ProductosModule } from './productos/productos.module';
import { CarritoModule } from './carrito/carrito.module';
import { CarritoProductoModule } from './carrito_producto/carrito_producto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
<<<<<<< HEAD
      name: 'base1',
      type: 'mysql',
      host: process.env.URL,
      port: 3306,
      username: 'raul',
      password: process.env.PASSWORD,
=======
      name:'base1',
      type:'mysql',
      host:process.env.URL,
      port:3306,
      username: 'root',
      password:process.env.PASSWORD,
>>>>>>> 7d336d340b2767d7f3d6f07744e9c85d5c3b4783
      database: process.env.DBNAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true /*Solo en desarrollo*/,
    }),
    AuthModule,
    UsuariosModule,
    ProveedoresModule,
    ProductosModule,
    CarritoModule,
    CarritoProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

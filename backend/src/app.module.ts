import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { User } from './usuarios/entities/usuarios.entity';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { Producto } from './productos/entities/producto.entity';
import { Proveedor } from './proveedores/entities/proveedore.entity';
import { ProductosModule } from './productos/productos.module';
import { CarritoModule } from './carrito/carrito.module';
import { CarritoProductoModule } from './carrito_producto/carrito_producto.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name:'base1',
      type:'mysql',
      host:process.env.URL,
      port:3306,
      username: 'raul',
      password:process.env.PASSWORD,
      database: process.env.DBNAME,
      entities: [User,Producto,Proveedor],
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

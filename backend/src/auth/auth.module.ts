import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // Configura TypeOrm para usar la entidad User en la conexión 'base1'
    TypeOrmModule.forFeature([User], 'base1'),

    // Configura PassportModule con la estrategia por defecto 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // Configura JwtModule de manera asíncrona usando ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Inyecta ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your_secret_key', // Usa JWT_SECRET del entorno
        signOptions: { expiresIn: '15m' }, // Configura la expiración del token
      }),
    }),

    // Configura ConfigModule para cargar variables de entorno
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController], // Registra el controlador de autenticación
  providers: [AuthService, JwtStrategy], // Registra los servicios y estrategias
  exports: [AuthService], // Exporta AuthService para su uso en otros módulos
})
export class AuthModule {}
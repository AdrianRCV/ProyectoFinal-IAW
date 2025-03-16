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
    TypeOrmModule.forFeature([User], 'base1'),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({imports: [ConfigModule], inject: [ConfigService], useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your_secret_key', 
        signOptions: { expiresIn: '15m' }, 
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy], 
  exports: [AuthService], 
})
export class AuthModule {}
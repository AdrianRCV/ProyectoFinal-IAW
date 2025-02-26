import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';  
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config'; 
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/usuarios/entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User],"base1"),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key',  
      signOptions: { expiresIn: '15m' },  
    }),
    ConfigModule,  
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

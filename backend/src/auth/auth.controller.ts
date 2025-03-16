import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/usuarios/dto/login.dto';
import { RegisterDto } from 'src/usuarios/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        body.username,
        body.password,
      );

      if (!user) {
        throw new HttpException(
          'Usuario o contraseña incorrectas',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const payload = {
        username: user.username,
        sub: user.id,
        id_cliente: user.id_cliente,
      };
      const token = this.jwtService.sign(payload);

      return { access_token: token };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error iniciando sesion',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    try {
      return await this.authService.register(
        body.username,
        body.email,
        body.password,
      );
    } catch (error) {
      throw new HttpException(
        'Error creando la cuenta',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

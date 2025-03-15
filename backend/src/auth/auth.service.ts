import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'base1')
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new HttpException(
        'El correo electrónico ya está en uso',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'Usuario registrado correctamente',
      user: {
        id_cliente: newUser.id_cliente, // Asegúrate de devolver id_cliente
        username: newUser.username,
        email: newUser.email,
      },
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }

    // Devuelve el id_cliente (o id) en la respuesta
    return {
      id_cliente: user.id_cliente, // Asegúrate de devolver id_cliente
      username: user.username,
    };
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);

    // Incluye id_cliente en el payload del token
    const payload = { username: user.username, sub: user.id_cliente };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
    };
  }
}
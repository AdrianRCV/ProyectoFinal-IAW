import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header
      secretOrKey: configService.get('JWT_SECRET'), // Usa la clave secreta del entorno
      ignoreExpiration: false, // No ignorar la expiración del token
    });
  }

  async validate(payload: any) {
    // Devuelve el id_cliente (sub) y el username
    return {
      id_cliente: payload.sub, // sub es id_cliente en el payload
      username: payload.username,
    };
  }
}
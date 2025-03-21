import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: configService.get('JWT_SECRET'), 
      ignoreExpiration: false, 
    });
  }

  async validate(payload: any) {
    return {
      id_cliente: payload.sub, 
      username: payload.username,
    };
  }
}
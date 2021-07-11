import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (function () {
        const key = process.env.JWT_SECRET;
        if (!key) {
          throw new Error('JWT private Key가 없습니다.');
        }
        return key;
      })(),
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, adress: payload.adress };
  }
}

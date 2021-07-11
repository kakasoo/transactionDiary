import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secretOrPrivateKey: (function () {
        const key = process.env.JWT_SECRET;
        if (!key) {
          throw new Error('JWT private Key가 없습니다.');
        }
        return key;
      })(),
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}

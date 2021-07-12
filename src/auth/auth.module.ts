import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

// NOTE : ConfigModule.forRoot()가 호출되는 시점이 더 늦을지도 모른다.
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: (function () {
        const key = process.env.JWT_SECRET;
        if (!key) {
          throw new Error('JWT private Key가 없습니다.');
        }
        return key;
      })(),
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

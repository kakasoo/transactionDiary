import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalStrategy } from '../../guards/strategies/local.strategy';
import { JwtStrategy } from 'src/guards/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

import { Users } from '../user/entities/user.entity';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

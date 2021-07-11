import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}

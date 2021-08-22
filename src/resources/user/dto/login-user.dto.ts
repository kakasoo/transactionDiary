import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/user.entity';

export class LoginUserDto extends PickType(Users, [
  'adress',
  'password',
] as const) {}

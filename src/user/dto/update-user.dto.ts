import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { Users } from '../entities/user.entity';

export class UpdateUserDto extends PickType(Users, [
  'adress',
  'password',
  'nickname',
  'userPic',
] as const) {}

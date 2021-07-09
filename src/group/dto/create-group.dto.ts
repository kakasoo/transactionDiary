import { PickType } from '@nestjs/swagger';
import { Groups } from '../entities/group.entity';

export class CreateGroupDto extends PickType(Groups, [
  'name',
  'password',
  'visible',
] as const) {}

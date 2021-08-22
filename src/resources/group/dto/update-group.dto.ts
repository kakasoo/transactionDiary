import { PickType } from '@nestjs/swagger';
import { Groups } from '../entities/group.entity';

export class UpdateGroupDto extends PickType(Groups, [
  'name',
  'password',
  'visible',
  'groupPic',
] as const) {}

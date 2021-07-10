import { PickType } from '@nestjs/swagger';
import { Dairies } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Dairies, [
  'userId',
  'title',
  'content',
  'hashtag',
] as const) {}

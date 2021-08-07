import { PickType } from '@nestjs/swagger';
import { Diaries } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diaries, [
  'title',
  'content',
  'hashtag',
  'createAt',
] as const) {
  groupIds?: number[];
  userId?: number;
}

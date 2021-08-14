import { PickType } from '@nestjs/swagger';
import { Diaries } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diaries, [
  'title',
  'content',
  'hashtag',
  'createdAt',
] as const) {
  groupIds?: number[];
}

import { PickType } from '@nestjs/swagger';
import { Diaries } from '../entities/diary.entity';

export class UpdateDiaryDto extends PickType(Diaries, [
  'userId',
  'title',
  'content',
  'hashtag',
] as const) {}

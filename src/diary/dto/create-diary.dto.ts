import { PickType } from '@nestjs/swagger';
import { Diaries } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diaries, [
  'userId',
  'title',
  'content',
  'hashtag',
] as const) {}

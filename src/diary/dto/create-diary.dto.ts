import { PickType } from '@nestjs/swagger';
import { Diaries } from '../entities/diary.entity';

export class CreateDiaryDto extends PickType(Diaries, [
  // NOTE : 쿠키를 통해서 알아내도록 강제한다.
  // 'userId',
  'title',
  'content',
  'hashtag',
  'createAt',
] as const) {
  groupIds?: number[];
  userId?: number;
}

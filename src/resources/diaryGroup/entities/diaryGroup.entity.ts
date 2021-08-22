import { Groups } from '../../group/entities/group.entity';
import {
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Diaries } from '../../diary/entities/diary.entity';

@Entity('DIARY_GROUPS', { schema: 'mydb' })
export class DiaryGroups extends BaseEntity {
  @PrimaryColumn({ type: 'int', name: 'DIARY_ID' })
  diaryId: number;

  @PrimaryColumn({ type: 'int', name: 'GROUP_ID' })
  groupId: number;

  @ManyToOne(() => Diaries, (diary) => diary.id)
  @JoinColumn([{ name: 'DIARY_ID' }])
  diary: Diaries;

  @ManyToOne(() => Groups, (group) => group.id)
  @JoinColumn([{ name: 'GROUP_ID' }])
  group: Groups;
}

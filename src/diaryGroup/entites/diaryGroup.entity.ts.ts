import { Groups } from '../../group/entities/group.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Diaries } from 'src/diary/entities/diary.entity';

@Entity('DIARY_GROUPS', { schema: 'mydb' })
export class UserGroups extends BaseEntity {
  @PrimaryColumn({ type: 'int', name: 'DIARY_ID' })
  diaryId: number;

  @PrimaryColumn({ type: 'int', name: 'GROUP_ID' })
  groupId: number;

  @ManyToOne(() => Diaries, (user) => user.id)
  diary: Diaries;

  @ManyToOne(() => Groups, (group) => group.id)
  group: Groups;
}

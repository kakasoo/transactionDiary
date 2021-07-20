import { Groups } from '../../group/entities/group.entity';
import { Users } from '../../user/entities/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('USER_GROUPS', { schema: 'mydb' })
export class UserGroups extends BaseEntity {
  @PrimaryColumn({ type: 'int', name: 'USER_ID' })
  userId: number;

  @PrimaryColumn({ type: 'int', name: 'GROUP_ID' })
  groupId: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  @ManyToOne(() => Groups, (group) => group.id)
  group: Groups;
}

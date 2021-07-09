import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { Dairies } from '../../diary/entities/diary.entity';

@Index('ID_UNIQUE', ['id'], { unique: true })
@Entity('GROUPS', { schema: 'mydb' })
export class Groups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('varchar', { name: 'NAME', length: 45 })
  name: string;

  @Column('varchar', { name: 'PASSWORD', nullable: true, length: 45 })
  password: string | null;

  @Column('longtext', { name: 'GROUP_PIC', nullable: true })
  groupPic: string | null;

  @Column('tinyint', { name: 'VISIBLE', default: () => "'1'" })
  visible: number;

  @Column('datetime', {
    name: 'CREATED_AT',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'UPDATED_AT',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column('datetime', { name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @ManyToMany(() => Users, (users) => users.groups)
  users: Users[];

  @ManyToMany(() => Dairies, (dairies) => dairies.groups)
  dairies: Dairies[];
}

import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { Dairies } from '../../diary/entities/diary.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('ID_UNIQUE', ['id'], { unique: true })
@Entity('GROUPS', { schema: 'mydb' })
export class Groups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @ApiProperty({
    example: 'development_group',
    description: '그룹 명',
    required: true,
  })
  @Column('varchar', { name: 'NAME', length: 45 })
  name: string;

  @ApiProperty({
    example: '1234567890@',
    description: '그룹 비밀번호',
    required: false,
  })
  @Column('varchar', { name: 'PASSWORD', nullable: true, length: 45 })
  password: string | null;

  @ApiProperty({
    example: 'https://kscodebase.tistory.com/*.jpeg',
    description: '그룹 프로필 이미지',
    required: false,
  })
  @Column('longtext', { name: 'GROUP_PIC', nullable: true })
  groupPic: string | null;

  @ApiProperty({
    example: 'true',
    description: '그룹 공개 여부',
    required: false,
  })
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

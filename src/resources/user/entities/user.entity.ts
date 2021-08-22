import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

import { Diaries } from '../../diary/entities/diary.entity';
import { Groups } from '../../group/entities/group.entity';
import { UserGroups } from '../../userGroup/entities/userGroup.entity';

@Index('USER_ID_UNIQUE', ['adress'], { unique: true })
@Entity('USERS', { schema: 'mydb' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Length(0, 45)
  @IsString()
  @ApiProperty({
    name: 'adress',
    description: '이메일 형식이 아니어도 되며, 공백을 제외한 모든 문자 허용',
    example: 'kscodebase@gmail.com',
    required: true,
  })
  @Column('varchar', { name: 'ADRESS', unique: true, length: 45 })
  adress: string;

  @Length(0, 100)
  @IsString()
  @ApiProperty({
    name: 'password',
    description: '유저의 비밀번호',
    example: '1234567890@',
    required: true,
  })
  @Column('varchar', { name: 'PASSWORD', length: 100 })
  password: string;

  @Length(0, 45)
  @IsString()
  @ApiProperty({
    name: 'nickname',
    description: '유저의 프로필에 띄울 이름, 닉네임을 지칭',
    example: 'kakasoo',
    required: true,
  })
  @Column('varchar', { name: 'NICKNAME', length: 45 })
  nickname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'userPic',
    description: '프로필 사진 경로를 저장',
    example: 'url 경로',
    required: false,
  })
  @Column('longtext', { name: 'USER_PIC', nullable: true })
  userPic: string | null;

  @CreateDateColumn({
    name: 'CREATED_AT',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @Column('datetime', { name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Diaries, (diaries) => diaries.user)
  diaries: Diaries[];

  @ManyToMany(() => Groups, (groups) => groups.users)
  @JoinTable({
    name: 'USER_GROUPS',
    joinColumn: { name: 'USER_ID' },
    inverseJoinColumn: { name: 'GROUP_ID' },
    schema: 'mydb',
  })
  groups: Groups[];

  @OneToMany(() => UserGroups, (userGroup) => userGroup.userId)
  userGroup: UserGroups[];
}

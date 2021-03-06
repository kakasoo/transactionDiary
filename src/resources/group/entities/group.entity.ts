import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Users } from '../../user/entities/user.entity';
import { Diaries } from '../../diary/entities/diary.entity';
import { DiaryGroups } from '../../diaryGroup/entities/diaryGroup.entity';
import { UserGroups } from '../../userGroup/entities/userGroup.entity';
import { ApiProperty } from '@nestjs/swagger';

@Index('ID_UNIQUE', ['id'], { unique: true })
@Entity('GROUPS', { schema: 'mydb' })
export class Groups {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(0, 45)
  @ApiProperty({
    example: 'development_group',
    description: '그룹 명',
    required: true,
  })
  @Column('varchar', { name: 'NAME', length: 45 })
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  @ApiProperty({
    example: '1234567890@',
    description: '그룹 비밀번호',
    required: false,
  })
  @Column('varchar', { name: 'PASSWORD', nullable: true, length: 100 })
  password: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'url 경로',
    description: '그룹 프로필 이미지',
    required: false,
  })
  @Column('longtext', { name: 'GROUP_PIC', nullable: true })
  groupPic: string | null;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    example: '1',
    description: '그룹 공개 여부',
    required: false,
  })
  @Column('tinyint', { name: 'VISIBLE', default: () => "'1'" })
  visible: number;

  @IsOptional()
  @IsInt()
  @Column('tinyint', { name: 'READONLY', default: () => "'0'" })
  readonly: number;

  @CreateDateColumn({
    name: 'CREATED_AT',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'DELETED_AT', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => UserGroups, (userGroup) => userGroup.groupId)
  userGroup: UserGroups[];

  @ManyToMany(() => Users, (users) => users.groups)
  users: Users[];

  @OneToMany(() => DiaryGroups, (diaryGroup) => diaryGroup.groupId)
  diaryGroup: DiaryGroups[];

  diaries: Diaries[];
}

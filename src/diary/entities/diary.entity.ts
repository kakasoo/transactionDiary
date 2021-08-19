import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { Comments } from '../../comment/entities/comment.entity';
import { Groups } from '../../group/entities/group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { DiaryGroups } from '../../diaryGroup/entites/diaryGroup.entity.ts';

@Index('fk_diaries_users_idx', ['userId'], {})
@Entity('DIARIES', { schema: 'mydb' })
export class Diaries extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @IsInt()
  @ApiProperty({
    name: 'userId',
    description: '작성자',
    example: '1',
    required: true,
  })
  @Column('int', { name: 'USER_ID' })
  userId: number;

  @Length(0, 45)
  @IsString()
  @ApiProperty({
    name: 'title',
    description: '일기 제목',
    example: '오늘 내가 한 일',
    required: true,
  })
  @Column('varchar', { name: 'TITLE', length: 45 })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'content',
    description: '일기 내용, 글자 수 제한 없음',
    example: '오늘 나는 밥을 먹었다.',
    required: false,
  })
  @Column('longtext', { name: 'CONTENT', nullable: true })
  content: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'hashtag',
    description: '일기 해시 태그',
    example: '#내가 #오늘 한 일 #밥',
    required: false,
  })
  @Column('longtext', { name: 'HASHTAG', nullable: true })
  hashtag: string | null;

  @IsOptional()
  @CreateDateColumn({
    name: 'CREATED_AT',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'DELETED_AT', nullable: true })
  deletedAt?: Date | null;

  @ManyToOne(() => Users, (users) => users.diaries, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'USER_ID' }])
  user: Users;

  @OneToMany(() => Comments, (comments) => comments.diary)
  comments: Comments[];

  @OneToMany(() => DiaryGroups, (diaryGroup) => diaryGroup.groupId)
  diaryGroup: DiaryGroups[];

  @ManyToMany(() => Groups, (groups) => groups.diaries)
  @JoinTable({
    name: 'DIARY_GROUPS',
    joinColumns: [{ name: 'DIARY_ID' }],
    inverseJoinColumns: [{ name: 'GROUP_ID' }],
    schema: 'mydb',
  })
  groups: Groups[];
}

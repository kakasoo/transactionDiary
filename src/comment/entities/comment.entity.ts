import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diaries } from '../../diary/entities/diary.entity';

@Index('PARENT_UNIQUE', ['parent'], { unique: true })
@Index('fk_COMMENTS_DIARIES1_idx', ['diaryId'], {})
@Index('fk_COMMENTS_COMMENTS1_idx', ['parent'], {})
@Entity('COMMENTS', { schema: 'mydb' })
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'USER_ID' })
  userId: number;

  @Column('int', { name: 'DIARY_ID' })
  diaryId: number;

  @Column('int', { name: 'PARENT', nullable: true, unique: true })
  parent: number | null;

  @Column('datetime', {
    name: 'CREATED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'UPDATED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @Column('datetime', {
    name: 'DELETED_AT',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  deletedAt: Date | null;

  @OneToOne(() => Comments, (comments) => comments.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'PARENT' }])
  parent2: Comments;

  @OneToOne(() => Comments, (comments) => comments.parent2)
  comments: Comments;

  @ManyToOne(() => Diaries, (diaries) => diaries.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'DIARY_ID' }])
  diary: Diaries;
}

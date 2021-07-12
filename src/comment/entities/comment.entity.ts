import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dairies } from '../../diary/entities/diary.entity';

@Index('PARENT_UNIQUE', ['parent'], { unique: true })
@Index('fk_COMMENTS_DAIRIES1_idx', ['dairyId'], {})
@Index('fk_COMMENTS_COMMENTS1_idx', ['parent'], {})
@Entity('COMMENTS', { schema: 'mydb' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column('int', { name: 'USER_ID' })
  userId: number;

  @Column('int', { name: 'DAIRY_ID' })
  dairyId: number;

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
  @JoinColumn([{ name: 'PARENT', referencedColumnName: 'id' }])
  parent2: Comments;

  @OneToOne(() => Comments, (comments) => comments.parent2)
  comments: Comments;

  @ManyToOne(() => Dairies, (dairies) => dairies.comments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'DAIRY_ID', referencedColumnName: 'id' }])
  dairy: Dairies;
}

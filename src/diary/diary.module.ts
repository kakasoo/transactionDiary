import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diaries } from './entities/diary.entity';
import { UserGroups } from 'src/userGroup/entites/userGroup.entity';
import { DiaryGroups } from 'src/diaryGroup/entites/diaryGroup.entity.ts';

@Module({
  imports: [TypeOrmModule.forFeature([Diaries, UserGroups, DiaryGroups])],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryService],
})
export class DiaryModule {}

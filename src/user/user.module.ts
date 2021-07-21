import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Groups } from 'src/group/entities/group.entity';
import { UserGroups } from 'src/userGroup/entites/userGroup.entity';
import { DiaryGroups } from 'src/diaryGroup/entites/diaryGroup.entity.ts';
import { Diaries } from 'src/diary/entities/diary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Groups, UserGroups, Diaries, DiaryGroups]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

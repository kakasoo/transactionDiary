import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { AuthModule } from 'src/resources/auth/auth.module';
import { Groups } from '../group/entities/group.entity';
import { Diaries } from '../diary/entities/diary.entity';
import { DiaryGroups } from '../diaryGroup/entities/diaryGroup.entity';
import { UserGroups } from '../userGroup/entities/userGroup.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Groups, UserGroups, Diaries, DiaryGroups]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

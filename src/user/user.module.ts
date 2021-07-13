import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GroupService } from 'src/group/group.service';
import { DiaryService } from 'src/diary/diary.service';
import { Groups } from 'src/group/entities/group.entity';
import { Dairies } from 'src/diary/entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Groups, Dairies]), AuthModule],
  controllers: [UserController],
  providers: [UserService, GroupService, DiaryService],
})
export class UserModule {}

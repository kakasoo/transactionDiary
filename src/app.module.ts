import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { GroupModule } from './group/group.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, DiaryModule, GroupModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

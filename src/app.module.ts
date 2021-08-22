import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DiaryModule } from './resources/diary/diary.module';
import { CommentModule } from './resources/comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/user/user.module';
import { GroupModule } from './resources/group/group.module';

import { Users } from './resources/user/entities/user.entity';
import { DiaryGroups } from './resources/diaryGroup/entities/diaryGroup.entity';
import { Groups } from './resources/group/entities/group.entity';
import { Comments } from './resources/comment/entities/comment.entity';
import { Diaries } from './resources/diary/entities/diary.entity';
import { UserGroups } from './resources/userGroup/entities/userGroup.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DiaryModule,
    GroupModule,
    CommentModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Comments, Diaries, Groups, UserGroups, DiaryGroups],
      synchronize: false, // NOTE : 개발 환경에서만 사용합니다.
      charset: 'utf8mb4',
      logging: true, // NOTE : 개발 시에는 logging을 켜놓는 것이 좋다. ( hot-reloading 으로 인한 지연 방지 )
      keepConnectionAlive: true,
    }),
    MorganModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}

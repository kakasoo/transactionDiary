import { Module } from '@nestjs/common';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DiaryModule } from './resources/diary/diary.module';
import { CommentModule } from './resources/comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resources/user/user.module';
import { GroupModule } from './resources/group/group.module';
import { ORMConfig } from './database/ormConfig';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
  imports: [
    UserModule,
    DiaryModule,
    GroupModule,
    CommentModule,
    MorganModule,
    TypeOrmModule.forRoot(ORMConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class ApiModule {}

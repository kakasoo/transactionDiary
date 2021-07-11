import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiaryModule } from './diary/diary.module';
import { GroupModule } from './group/group.module';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Users } from './user/entities/user.entity';
import { Comments } from './comment/entities/comment.entity';
import { Dairies } from './diary/entities/diary.entity';
import { Groups } from './group/entities/group.entity';
import { AuthModule } from './auth/auth.module';

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
      entities: [Users, Comments, Dairies, Groups],
      synchronize: false, // NOTE : 개발 환경에서만 사용합니다.
      charset: 'utf8mb4',
      logging: true, // NOTE : 개발 시에는 logging을 켜놓는 것이 좋다. ( hot-reloading 으로 인한 지연 방지 )
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ConnectionOptions } from 'typeorm';
import { Diaries } from './src/resources/diary/entities/diary.entity';
import { Comments } from './src/resources/comment/entities/comment.entity';
import { Users } from 'src/resources/user/entities/user.entity';
import { Groups } from 'src/resources/group/entities/group.entity';
import { DiaryGroups } from 'src/resources/diaryGroup/entities/diaryGroup.entity';
import { UserGroups } from 'src/resources/userGroup/entities/userGroup.entity';

import * as dotenv from 'dotenv';
dotenv.config();

const ORMConfig: any & ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Comments, Diaries, Groups, UserGroups, DiaryGroups],
  // entities: [__dirname + '/src/**/entities/*.entity.ts'],
  // entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  synchronize: false, // NOTE : 개발 환경에서만 사용합니다.
  charset: 'utf8mb4',
  logging: true, // NOTE : 개발 시에는 logging을 켜놓는 것이 좋다. ( hot-reloading 으로 인한 지연 방지 )
  keepConnectionAlive: true,
};

export = ORMConfig;

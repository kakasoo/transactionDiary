import { ConnectionOptions } from 'typeorm';

import { Comments } from '../resources/comment/entities/comment.entity';
import { Diaries } from '../resources/diary/entities/diary.entity';
import { DiaryGroups } from '../resources/diaryGroup/entities/diaryGroup.entity';
import { Groups } from '../resources/group/entities/group.entity';
import { Users } from '../resources/user/entities/user.entity';
import { UserGroups } from '../resources/userGroup/entities/userGroup.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export const ORMConfig: any & ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Comments, Diaries, Groups, UserGroups, DiaryGroups],
  synchronize: false,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

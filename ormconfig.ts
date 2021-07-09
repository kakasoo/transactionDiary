import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { Users } from './src/user/entities/user.entity';
import { Comments } from './src/comment/entities/comment.entity';
import { Dairies } from './src/diary/entities/diary.entity';
import { Groups } from './src/group/entities/group.entity';

dotenv.config();

const ORMConfig: any & ConnectionOptions = {
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
};

export = ORMConfig;

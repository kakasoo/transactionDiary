import * as bcrypt from 'bcrypt';

import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Groups } from 'src/resources/group/entities/group.entity';
import { Users } from 'src/resources/user/entities/user.entity';
import { Diaries } from 'src/resources/diary/entities/diary.entity';
import { DiaryGroups } from 'src/resources/diaryGroup/entities/diaryGroup.entity';
import { UserGroups } from 'src/resources/userGroup/entities/userGroup.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();

    const groupRepository = connection.getRepository(Groups);
    const userRepository = connection.getRepository(Users);
    const diaryRepository = connection.getRepository(Diaries);
    const diaryGroupRepository = connection.getRepository(DiaryGroups);

    try {
      const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD, 12);

      const groups = await groupRepository.save([
        {
          name: '영어일기',
          password: hashedPassword,
          readonly: 0,
        },
        {
          name: '개발일기',
          password: hashedPassword,
          readonly: 0,
        },
        {
          name: '가천대 일기',
          password: hashedPassword,
          readonly: 0,
        },
      ]);

      const writeToMySelfGroup = await groupRepository.save({
        name: '내게쓰기',
        password: hashedPassword,
        readonly: 1,
      });

      const user = await userRepository.save({
        adress: 'admin',
        password: hashedPassword,
        nickname: 'kakasoo',
      });

      const diary = await diaryRepository.save({
        title: '오신 것을 환영합니다.',
        content: '좋은 문화를 만들어요',
        userId: user.id,
      });

      await diaryGroupRepository.save({
        diaryId: diary.id,
        groupId: writeToMySelfGroup.id,
      });

      const values = [...groups.map((el) => el.id), writeToMySelfGroup.id].map(
        (id) => {
          return {
            groupId: id,
            userId: user.id,
          };
        },
      );

      const manager = connection.manager;
      await manager.insert(UserGroups, values);
    } catch (error) {
      console.error(error);
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}

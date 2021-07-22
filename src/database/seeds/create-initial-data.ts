import { Groups } from '../../group/entities/group.entity';
import { Users } from '../../user/entities/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';
import { UserGroups } from '../../userGroup/entites/userGroup.entity';
import { DiaryGroups } from '../../diaryGroup/entites/diaryGroup.entity.ts';
import { Diaries } from '../../diary/entities/diary.entity';

export class CreateInitialData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();

    const groupRepository = connection.getRepository(Groups);
    const userRepository = connection.getRepository(Users);
    const diaryRepository = connection.getRepository(Diaries);
    // const userGroupRepository = connection.getRepository(UserGroups);
    const diaryGroupRepository = connection.getRepository(DiaryGroups);

    try {
      const hashedPassword = await bcrypt.hash('1234567890@', 12);

      const group1 = await groupRepository.save({
        name: '영어일기',
        password: hashedPassword,
        readonly: 0,
      });

      const group2 = await groupRepository.save({
        name: '개발일기',
        password: hashedPassword,
        readonly: 0,
      });

      const group3 = await groupRepository.save({
        name: '노원구 일기 모임',
        password: hashedPassword,
        readonly: 0,
      });

      const group4 = await groupRepository.save({
        name: '내게쓰기',
        password: hashedPassword,
        readonly: 1,
      });

      const user = await userRepository.save({
        adress: 'kscodebase@gmail.com',
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
        groupId: group4.id,
      });

      const values = [group1.id, group2.id, group3.id, group4.id].map((id) => {
        return {
          groupId: id,
          userId: user.id,
        };
      });

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

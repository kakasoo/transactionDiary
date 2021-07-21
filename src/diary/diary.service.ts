import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaryGroups } from 'src/diaryGroup/entites/diaryGroup.entity.ts';
import { UserGroups } from 'src/userGroup/entites/userGroup.entity';
import { Connection, getConnection, Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diaries } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diaries)
    private diaryRepository: Repository<Diaries>,
    @InjectRepository(UserGroups)
    private userGroupRepository: Repository<UserGroups>,
    @InjectRepository(DiaryGroups)
    private diaryGroupRepository: Repository<DiaryGroups>,
    private connection: Connection,
  ) {}

  async create(createDiaryDto: CreateDiaryDto, userId: number) {
    console.log('here?');
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { groupIds } = createDiaryDto;
      delete createDiaryDto.groupIds;
      createDiaryDto.userId = userId;

      // const diary = await this.diaryRepository.save(createDiaryDto);

      // NOTE : createQueryBuilder 사용, columnName as otherName 형식이 가능하다.
      const { groupId: myselfGroupId } = await this.userGroupRepository
        .createQueryBuilder('userGroup')
        .select(['GROUP_ID as groupId'])
        .leftJoin('userGroup.group', 'group')
        .where('group.READONLY = 1')
        .andWhere(`userGroup.USER_ID = ${userId}`)
        .getRawOne();

      // NOTE : find문과 option을 이용한 방식, join 또는 relations를 사용한다.
      //      : 더 간단하게 사용가능하지만 as 문에 대응할만한 게 없다.
      // const userGroup = await this.userGroupRepository.find({
      //   // relations: ['group'],
      //   join: {
      //     alias: 'userGroups',
      //     innerJoinAndSelect: {
      //       group: 'userGroups.group',
      //     },
      //   },
      //   select: ['userId', 'groupId', 'group'],
      //   where: `group.readonly = 1 and userGroups.USER_ID = ${userId}`,
      // });

      console.log('userGroup : ', myselfGroupId);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    // NOTE : 기존의 코드
    // TODO : 자동으로 내게 쓰기 그룹에 가입되게 해야 한다.
    // const { groupIds } = createDiaryDto;
    // delete createDiaryDto.groupIds;
    // createDiaryDto.userId = userId;

    // const diary = await this.diaryRepository.save(createDiaryDto);
    // const diaryId = diary.id;

    // if (diary) {
    //   const connection = getConnection();

    //   // NOTE : 유저가 속한 내게 쓰기 그룹을 찾아서, groupIds에 추가한다.
    //   const [myselfGroup] = await connection.manager.query(`
    //     SELECT \`UG\`.\`GROUP_ID\` FROM \`USER_GROUPS\` AS \`UG\` LEFT OUTER JOIN \`GROUPS\` AS \`G\`
    //     ON \`UG\`.\`GROUP_ID\` = \`G\`.\`ID\`
    //     WHERE \`G\`.\`READONLY\` = 0 AND \`UG\`.\`USER_ID\` = ${userId}
    //     LIMIT 1;
    //     `);

    //   groupIds.push(myselfGroup.GROUP_ID);

    //   for (const groupId of groupIds) {
    //     await connection.manager.query(`
    //       INSERT INTO DIARY_GROUPS(DIARY_ID, GROUP_ID) VALUES (${diaryId}, ${groupId});
    //     `);
    //   }

    //   return diary;
    // }
  }

  async findAll(userId) {
    // NOTE : 유저가 가입한 그룹을 보고, 그 그룹의 다이어리를 불러온다.
    const connection = getConnection();

    const diary = await connection.manager.query(`
    SELECT \`D\`.\`ID\` as \`DIARY_ID\`, \`G\`.\`ID\` AS \`GROUP_ID\`, \`UG\`.\`USER_ID\`, \`D\`.\`TITLE\`, \`D\`.\`CONTENT\`, \`D\`.\`UPDATED_AT\`, \`D\`.\`HASHTAG\`, \`G\`.\`NAME\`
      FROM \`DIARY_GROUPS\` AS \`DG\` LEFT OUTER JOIN \`USER_GROUPS\` AS \`UG\` ON \`DG\`.\`GROUP_ID\` = \`UG\`.\`GROUP_ID\`
      LEFT OUTER JOIN \`DIARIES\` AS \`D\` ON \`D\`.\`ID\`= \`DG\`.\`DIARY_ID\` 
      LEFT OUTER JOIN \`GROUPS\` AS \`G\` ON \`G\`.\`ID\` = \`DG\`.\`GROUP_ID\`
      WHERE \`UG\`.\`USER_ID\` = ${userId};
    `);

    return diary;
  }

  async findOne(id: number) {
    const diary = await this.diaryRepository.findOne({ where: { id } });
    return diary;
  }

  async update(id: number, updateDiaryDto: UpdateDiaryDto) {
    const updatedDiary = await this.diaryRepository.update(id, updateDiaryDto);
    return updatedDiary;
  }

  async remove(id: number) {
    const deletedDiary = await this.diaryRepository.softDelete(id);
    return deletedDiary;
  }
}

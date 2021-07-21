import { Get, Injectable } from '@nestjs/common';
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
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const { groupIds } = createDiaryDto;
      delete createDiaryDto.groupIds;
      createDiaryDto.userId = userId;

      const diary = await this.diaryRepository.save(createDiaryDto);

      const { groupId: myselfGroupId } = await this.userGroupRepository
        .createQueryBuilder('userGroup')
        .select(['GROUP_ID as groupId'])
        .leftJoin('userGroup.group', 'group')
        .where('group.READONLY = 1')
        .andWhere(`userGroup.USER_ID = ${userId}`)
        .getRawOne();

      groupIds.push(myselfGroupId);

      const values = groupIds.map((id) => {
        return {
          groupId: id,
          diaryId: diary.id,
        };
      });

      const manager = this.connection.manager;
      await manager.insert(DiaryGroups, values);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(userId) {
    // NOTE : 유저가 가입한 그룹을 보고, 그 그룹의 다이어리를 불러온다.
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const diaryGroups = await this.diaryGroupRepository
        .createQueryBuilder('DG')
        .select([
          'D.ID as diaryId',
          'G.ID as groupId',
          'UG.USER_ID as userId',
          'D.TITLE as title',
          'D.CONTENT as content',
          'D.UPDATED_AT as updatedAt',
          'D.HASHTAG as hashtag',
          'G.NAME as name',
        ])
        .innerJoin('DG.group', 'G')
        .innerJoin('DG.diary', 'D')
        .innerJoin(UserGroups, 'UG', 'DG.GROUP_ID = UG.GROUP_ID')
        .where(`UG.USER_ID = ${userId}`)
        .getRawMany();

      console.log(diaryGroups);
    } catch (error) {
      console.error(error);
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }

    // const diary = await connection.manager.query(`
    // SELECT \`D\`.\`ID\` as \`DIARY_ID\`, \`G\`.\`ID\` AS \`GROUP_ID\`, \`UG\`.\`USER_ID\`, \`D\`.\`TITLE\`, \`D\`.\`CONTENT\`, \`D\`.\`UPDATED_AT\`, \`D\`.\`HASHTAG\`, \`G\`.\`NAME\`
    //   FROM \`DIARY_GROUPS\` AS \`DG\` LEFT OUTER JOIN \`USER_GROUPS\` AS \`UG\` ON \`DG\`.\`GROUP_ID\` = \`UG\`.\`GROUP_ID\`
    //   LEFT OUTER JOIN \`DIARIES\` AS \`D\` ON \`D\`.\`ID\`= \`DG\`.\`DIARY_ID\`
    //   LEFT OUTER JOIN \`GROUPS\` AS \`G\` ON \`G\`.\`ID\` = \`DG\`.\`GROUP_ID\`
    //   WHERE \`UG\`.\`USER_ID\` = ${userId};
    // `);

    // return diary;
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

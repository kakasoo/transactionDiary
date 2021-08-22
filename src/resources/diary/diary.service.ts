import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diaries } from './entities/diary.entity';

import { DiaryGroups } from '../diaryGroup/entities/diaryGroup.entity';
import { UserGroups } from '../userGroup/entities/userGroup.entity';

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

      const diary = await this.diaryRepository.save({
        ...createDiaryDto,
        userId,
      });

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
    const diaryGroups = await this.diaryGroupRepository
      .createQueryBuilder('DG')
      .select([
        'D.ID as diaryId',
        'G.ID as groupId',
        'UG.USER_ID as userId',
        'D.TITLE as title',
        'D.CONTENT as content',
        'D.UPDATED_AT as updatedAt',
        'D.CREATED_AT as createdAt',
        'D.HASHTAG as hashtag',
        'G.NAME as name',
      ])
      .innerJoin('DG.group', 'G')
      .innerJoin('DG.diary', 'D')
      .innerJoin(UserGroups, 'UG', 'DG.GROUP_ID = UG.GROUP_ID')
      .where(`UG.USER_ID = ${userId}`)
      .getRawMany();

    return diaryGroups;
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

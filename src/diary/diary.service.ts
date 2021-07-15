import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Diaries } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diaries) private diaryRepository: Repository<Diaries>,
  ) {}

  async create(createDiaryDto: CreateDiaryDto, userId: number) {
    // TODO : 자동으로 내게 쓰기 그룹에 가입되게 해야 한다.
    // return diary;
    const { groupIds } = createDiaryDto;
    createDiaryDto.userId = userId;

    const diary = await this.diaryRepository.save(createDiaryDto);
    const diaryId = diary.id;

    if (diary) {
      const connection = getConnection();

      // NOTE : 유저가 속한 내게 쓰기 그룹을 찾아서, groupIds에 추가한다.
      const [myselfGroup] = await connection.manager.query(`
        SELECT \`UG\`.\`GROUP_ID\` FROM \`USER_GROUPS\` AS \`UG\` LEFT OUTER JOIN \`GROUPS\` AS \`G\`
        ON \`UG\`.\`GROUP_ID\` = \`G\`.\`ID\`
        WHERE \`G\`.\`READONLY\` = 0 AND \`UG\`.\`USER_ID\` = ${userId}
        LIMIT 1;
        `);

      groupIds.push(myselfGroup.GROUP_ID);

      for (const groupId of groupIds) {
        await connection.manager.query(`
          INSERT INTO DIARY_GROUPS(DIARY_ID, GROUP_ID) VALUES (${diaryId}, ${groupId});
        `);
      }

      return diary;
    }
  }

  async findAll(userId) {
    // NOTE : 유저가 가입한 그룹을 보고, 그 그룹의 다이어리를 불러온다.
    const connection = getConnection();

    const diary = await connection.manager.query(`
    SELECT \`DG\`.\`DIARY_ID\`, \`DG\`.\`GROUP_ID\`, \`UG\`.\`USER_ID\`, \`D\`.\`TITLE\`, \`D\`.\`CONTENT\`, \`D\`.\`UPDATED_AT\`, \`D\`.\`HASHTAG\`, \`G\`.\`NAME\`
      FROM \`DIARY_GROUPS\` AS \`DG\`
      LEFT OUTER JOIN \`USER_GROUPS\` AS \`UG\` ON \`DG\`.\`GROUP_ID\` = \`UG\`.\`GROUP_ID\` 
      JOIN \`DIARIES\` AS \`D\` JOIN \`GROUPS\` AS \`G\`
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

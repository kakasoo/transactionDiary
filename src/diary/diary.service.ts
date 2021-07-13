import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Dairies } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Dairies) private diaryRepository: Repository<Dairies>,
  ) {}

  async create(createDiaryDto: CreateDiaryDto) {
    // TODO : 자동으로 내게 쓰기 그룹에 가입되게 해야 한다.
    const diary = await this.diaryRepository.create(createDiaryDto);
    return diary;
  }

  async findAll(userId) {
    // NOTE : 유저가 가입한 그룹을 보고, 그 그룹의 다이어리를 불러온다.
    const connection = getConnection();

    const diary = await connection.manager.query(`
    SELECT \`DG\`.\`DAIRY_ID\`, \`DG\`.\`GROUP_ID\`, \`UG\`.\`USER_ID\`, \`D\`.\`TITLE\`, \`D\`.\`CONTENT\`, \`D\`.\`UPDATED_AT\`, \`D\`.\`HASHTAG\`
      FROM \`DIARY_GROUPS\` AS \`DG\` LEFT OUTER JOIN \`USER_GROUPS\` AS \`UG\` ON \`DG\`.\`GROUP_ID\` = \`UG\`.\`GROUP_ID\`
      JOIN DAIRIES AS \`D\` WHERE \`UG\`.USER_ID = ${userId};`);

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

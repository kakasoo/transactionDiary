import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { Dairies } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Dairies) private diaryRepository: Repository<Dairies>,
  ) {}

  async create(createDiaryDto: CreateDiaryDto) {
    const diary = await this.diaryRepository.create(createDiaryDto);
    return diary;
  }

  async findAll() {
    const diaries = await this.diaryRepository.find();
    return diaries;
  }

  async findOne(id: number) {
    const diary = await this.diaryRepository.findOne({ where: { id } });
    return diary;
  }

  async update(id: number, updateDiaryDto: UpdateDiaryDto) {
    const updatedDiary = await this.diaryRepository.update(id, updateDiaryDto);
    return updatedDiary;
  }

  remove(id: number) {
    return `This action removes a #${id} diary`;
  }
}

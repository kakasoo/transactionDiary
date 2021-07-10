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

  create(createDiaryDto: CreateDiaryDto) {
    const diary = this.diaryRepository.create(createDiaryDto);
    return diary;
  }

  findAll() {
    return `This action returns all diary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diary`;
  }

  update(id: number, updateDiaryDto: UpdateDiaryDto) {
    return `This action updates a #${id} diary`;
  }

  remove(id: number) {
    return `This action removes a #${id} diary`;
  }
}

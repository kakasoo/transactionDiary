import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/entities/user.entity';
import { Connection, getConnection, Repository, Transaction } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Groups } from 'src/group/entities/group.entity';
import { Diaries } from 'src/diary/entities/diary.entity';
import { UserGroups } from 'src/userGroup/entites/userGroup.entity';
import { DiaryGroups } from 'src/diaryGroup/entites/diaryGroup.entity.ts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(UserGroups)
    private userGroupRepository: Repository<UserGroups>,
    @InjectRepository(Groups)
    private groupRepository: Repository<Groups>,
    @InjectRepository(Diaries)
    private diaryRepository: Repository<Diaries>,
    @InjectRepository(DiaryGroups)
    private diaryGroupRepository: Repository<DiaryGroups>,
    private connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { adress, password, nickname, userPic } = createUserDto;
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const group = await this.groupRepository.save({
        name: '내게쓰기',
        password: hashedPassword,
        readonly: 1,
      });

      const user = await this.userRepository.save({
        adress,
        password: hashedPassword,
        nickname,
        userPic,
      });

      const diary = await this.diaryRepository.save({
        title: '오신 것을 환영합니다.',
        content: '좋은 문화를 만들어요',
        userId: user.id,
      });

      await this.userGroupRepository.save({
        userId: user.id,
        groupId: group.id,
      });

      await this.diaryGroupRepository.save({
        diaryId: diary.id,
        groupId: group.id,
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const users = await this.userRepository.findOne({
      where: { id },
    });
    return users;
  }

  async findGroupsOfUser(id: number) {
    // NOTE : 특정 데이터를 받아올 때에는 getMany 대신 getRawMany로 한다.
    return await this.userGroupRepository
      .createQueryBuilder('userGroups')
      .select(['GROUP_ID as groupId'])
      .where({ userId: id })
      .getRawMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }
    const updatedUser = this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: number) {
    const softDeleted = await this.userRepository.softDelete(id);
    return softDeleted;
  }
}

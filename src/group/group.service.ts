import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Groups } from './entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Groups) private userRepository: Repository<Groups>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    // const group = await this.userRepository.findOne({ where: { id } });
    // if (!group) {
    //   throw new Error('이미 존재하는 그룹입니다.');
    // }

    // NOTE : 그룹의 비밀번호가 유저의 비밀번호와 유사할 경우를 대비하여 hash한다.
    // hashedPassword = await bcrypt.hash(password, 12);
    // this.userRepository.save({
    //   name,
    //   password,
    // })

    return '유저 생성 성공.';
  }

  async findAll() {
    const groups = await this.userRepository.find();
    return groups;
  }

  async findOne(id: number) {
    const group = await this.userRepository.findOne({ where: { id } });
    return group;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}

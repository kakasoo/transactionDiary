import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Groups } from './entities/group.entity';
import * as bcrypt from 'bcrypt';
import { UserGroups } from 'src/userGroup/entites/userGroup.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Groups)
    private groupRepository: Repository<Groups>,
    @InjectRepository(UserGroups)
    private userGroupRepository: Repository<UserGroups>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const { name, password, groupPic, visible } = createGroupDto;
    // NOTE : 그룹의 비밀번호가 유저의 비밀번호와 유사할 경우를 대비하여 hash한다.
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdGroup = await this.groupRepository.save({
      name,
      password: hashedPassword,
      groupPic,
      visible,
      readonly: 0,
    });

    return createdGroup;
  }

  async join(userId: number, groupId: number) {
    const joined = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .select()
      .where({
        userId,
        groupId,
      })
      .getOne();

    if (joined) {
      return;
    }

    await this.userGroupRepository.save({
      userId,
      groupId,
    });
  }

  async findAll(userId) {
    const userGroup = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .select(['GROUP_ID as groupId', 'NAME as name'])
      .innerJoin('userGroup.group', 'group')
      .andWhere(`userGroup.USER_ID = ${userId}`)
      .getRawMany();

    return userGroup;
  }

  async findAllVisibleGroups() {
    const visible = 1;
    const readonly = 0;
    const groups = await this.groupRepository.find({
      where: { visible, readonly },
    });
    return groups;
  }

  async findOne(id: number) {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new Error('id에 해당하는 group이 없습니다.');
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    if (updateGroupDto.password) {
      updateGroupDto.password = await bcrypt.hash(updateGroupDto.password, 12);
    }
    const updatedGroup = this.groupRepository.update(id, updateGroupDto);
    return updatedGroup;
  }

  async remove(id: number) {
    const softDeleted = await this.groupRepository.softDelete(id);
    return softDeleted;
  }
}

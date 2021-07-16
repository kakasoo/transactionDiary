import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Groups } from './entities/group.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Groups) private groupRepository: Repository<Groups>,
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
    const connection = getConnection();

    connection.manager.query(`
      INSERT INTO USER_GROUPS(USER_ID, GROUP_ID) VALUES (${userId}, ${groupId});
    `);
  }

  async createMyselfGroup(
    createGroupDto: CreateGroupDto & { userId: number },
  ): Promise<Groups> {
    const { name, groupPic, visible, userId } = createGroupDto;
    // NOTE : 유저 생성 시 내게 쓰기 그룹이 1개 생성됨.
    const hashedPassword = await bcrypt.hash(String(userId), 12);

    return this.groupRepository.save({
      name,
      groupPic,
      visible: 0,
      readonly: 1,
      password: hashedPassword,
    });
  }

  async findAll() {
    const groups = await this.groupRepository.find();
    return groups;
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

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Groups } from './entities/group.entity';
import { GroupService } from './group.service';

import * as bcrypt from 'bcrypt';

class MockGroupRepository {
  save({ name, password, groupPic, visible }) {
    return { name, password, groupPic, visible };
  }
}

describe('GroupService', () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(Groups),
          useClass: MockGroupRepository,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it('그룹 서비스가 정의되어 있습니다.', () => {
    expect(service).toBeDefined();
  });

  it('그룹이 추가되었습니다.', async () => {
    const groupData: CreateGroupDto = {
      name: 'kakasoo',
      password: 'password',
      groupPic: null,
      visible: 1,
    };

    const { name, groupPic, visible, password } = await service.create(
      groupData,
    );

    // 생성된 Group의 name, groupPic, visible, pasword가 잘 반영된 경우.
    expect(name).toBe(groupData.name);
    expect(groupPic).toBe(groupData.groupPic);
    expect(visible).toBe(groupData.visible);
    expect(bcrypt.compare(groupData.password, password)).resolves.toBe(true);
  });

  it.todo('그룹이 조회되었습니다.');
  it.todo('그룹이 수정되었습니다.');
  it.todo('그룹이 삭제되었습니다.');
});

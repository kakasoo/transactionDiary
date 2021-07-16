import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('GROUPS')
@Controller('api/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({ summary: '그룹 추가' })
  @ApiBody({
    type: CreateGroupDto,
  })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  // NOTE : 실제 사용은, 다른 controller에서 service를 호출하는 것으로 하지 controller를 통하지 않는다.
  @ApiOperation({ summary: '각 유저에 대한 내게 쓰기 그룹 추가' })
  @ApiBody({
    type: CreateGroupDto,
  })
  @Post('/myself')
  createMyselfGroup(
    @Body() CreateGroupDto: CreateGroupDto & { userId: number },
  ) {
    return this.groupService.createMyselfGroup(CreateGroupDto);
  }

  @ApiOperation({ summary: '모든 그룹 조회' })
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: '공개로 되어 있는 모든 그룹 조회' })
  @Get('visible')
  findAllVisibleGroups() {
    return this.groupService.findAllVisibleGroups();
  }

  @ApiOperation({ summary: '단일 그룹 조회' })
  @ApiParam({
    name: 'id',
    description: '그룹의 index ( ID )',
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @ApiOperation({ summary: '그룹 정보 수정' })
  @ApiBody({
    type: UpdateGroupDto,
  })
  @ApiParam({
    name: 'id',
    description: '그룹의 index ( ID )',
    example: 1,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @ApiOperation({ summary: '그룹 정보 삭제' })
  @ApiParam({
    name: 'id',
    description: '그룹의 index ( ID )',
    example: 1,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}

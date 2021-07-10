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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('GROUPS')
@Controller('api/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiBody({
    type: CreateGroupDto,
  })
  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiBody({
    type: CreateGroupDto,
  })
  @Post()
  createMyselfGroup(
    @Body() CreateGroupDto: CreateGroupDto & { userId: number },
  ) {
    return this.groupService.createMyselfGroup(CreateGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: '그룹의 index ( ID )',
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @ApiOperation({ summary: '그룹 가입' })
  @UseGuards(JwtAuthGuard)
  @Post('join')
  join(@Body() joinGroupDto, @Req() req) {
    const { groupId } = joinGroupDto;
    const userId = req.user.id;
    return this.groupService.join(userId, groupId);
  }

  @ApiOperation({ summary: '유저가 가입한 모든 그룹 조회' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.groupService.findAll(userId);
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

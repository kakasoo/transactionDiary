import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';

@ApiTags('DIARIES')
@Controller('api/diaries')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @ApiOperation({ summary: '일기 작성' })
  @ApiProperty({
    type: CreateDiaryDto,
  })
  @Post()
  create(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(createDiaryDto);
  }

  // TODO : 각 유저가 조회할 수 있는 목록만을 가져오게 수정해야 한다.
  @ApiOperation({ summary: '모든 일기 조회' })
  @Get()
  findAll() {
    return this.diaryService.findAll();
  }

  @ApiOperation({ summary: '단일 일기 조회' })
  @ApiParam({
    name: 'id',
    description: '일기의 index ( ID )',
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diaryService.findOne(+id);
  }

  @ApiOperation({ summary: '일기 내용 수정' })
  @ApiProperty({
    type: UpdateDiaryDto,
  })
  @ApiParam({
    name: 'id',
    description: '일기의 index ( ID )',
    example: 1,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.update(+id, updateDiaryDto);
  }

  @ApiOperation({ summary: '일기 내용 삭제' })
  @ApiParam({
    name: 'id',
    description: '일기의 index ( ID )',
    example: 1,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diaryService.remove(+id);
  }
}

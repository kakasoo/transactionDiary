import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    type: LoginUserDto,
  })
  @Render('index')
  @Post('login')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.signIn(loginUserDto);
    return { message: user.nickname };
  }

  @ApiOperation({ summary: '모든 유저 조회' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: '단일 유저 조회' })
  @ApiParam({
    name: 'id',
    description: '유저의 index ( ID )',
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiParam({
    name: 'id',
    description: '유저의 index ( ID )',
    example: 1,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '유저 정보 삭제' })
  @ApiParam({
    name: 'id',
    description: '유저의 index ( ID )',
    example: 1,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBody({
    type: LoginUserDto,
  })
  @Post()
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.userService.signIn(loginUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: '유저의 index ( ID )',
    example: 1,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

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

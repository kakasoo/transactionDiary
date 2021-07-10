import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { adress, password, nickname, userPic } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 12);

    this.userRepository.save({
      adress,
      password: hashedPassword,
      nickname,
      userPic,
    });
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { adress, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { adress },
    });

    if (!user) {
      throw new Error('adress에 해당하는 user가 없습니다.');
    }

    const isRightPassword = await bcrypt.compare(password, user.password);
    if (!isRightPassword) {
      throw new Error('password가 일치하지 않습니다.');
    }

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const users = await this.userRepository.findOne({
      where: { id },
    });
    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }
    const updatedUser = this.userRepository.update(id, updateUserDto);
    return updatedUser;
  }

  async remove(id: number) {
    const softDeleted = await this.userRepository.softDelete(id);
    return softDeleted;
  }
}

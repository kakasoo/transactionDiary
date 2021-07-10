import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

  async signIn(loginUserDto: { adress: string; password: string }) {
    return 'OK';
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const users = await this.userRepository.find({
      where: { id },
    });
    return users;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
